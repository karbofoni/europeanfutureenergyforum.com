import { NextRequest, NextResponse } from 'next/server';
import { PolicyCopilotRequest, PolicyCopilotResponse } from '@/types/ai';
import { chatCompletion } from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { logAIUsage, estimateTokenCount } from '@/lib/ai-analytics';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let inputTokens = 0;
  let outputTokens = 0;

  try {
    const body: PolicyCopilotRequest = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI features are not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const { data: policyBriefs } = await supabase
      .from('policy_briefs')
      .select('*')
      .eq('country', body.country)
      .maybeSingle();

    let contextData = '';
    if (policyBriefs) {
      contextData = `
Country: ${policyBriefs.country_name}
Incentives: ${JSON.stringify(policyBriefs.incentives)}
Permitting Steps: ${JSON.stringify(policyBriefs.permitting_steps)}
Average Lead Times: ${JSON.stringify(policyBriefs.avg_lead_times)}
Key Agencies: ${JSON.stringify(policyBriefs.agencies)}
`;
    }

    const systemPrompt = `You are an expert EU renewable energy policy advisor. Your role is to provide clear, accurate, plain-English answers about renewable energy regulations, permitting, and incentives.

Context about ${body.country}:
${contextData}

Guidelines:
- Provide practical, actionable answers
- Break down complex regulations into simple steps
- Always mention if requirements vary by region or project size
- Include typical timelines when relevant
- Cite the general legal framework (but use placeholder URLs)
- Be honest about uncertainties
- Format responses in clear paragraphs
- End with 3-5 actionable next steps as a checklist

IMPORTANT: Always include this disclaimer at the end: "This is informational guidance only. Verify with official sources and consult legal/regulatory experts for your specific project."`;

    const userPrompt = `Project details:
- Technology: ${body.technology}
- Size: ${body.size_mw} MW
- Country: ${body.country}
${body.status ? `- Current status: ${body.status}` : ''}

Question: ${body.question}`;

    const completion = await chatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], {
      temperature: 0.3,
      maxTokens: 1200,
    });

    inputTokens += estimateTokenCount(systemPrompt + userPrompt);
    const answer = completion.choices[0].message.content || 'No response generated.';
    outputTokens += estimateTokenCount(answer);

    const checklistPrompt = `Based on this policy answer, extract 4-6 specific action items as a checklist. Format as JSON array with fields: task, deadline (relative like "Month 1-2"), agency, priority (1-3 where 1 is highest).

Answer: ${answer}`;

    const checklistCompletion = await chatCompletion([
      { role: 'system', content: 'You extract action items from policy guidance. Output ONLY valid JSON array.' },
      { role: 'user', content: checklistPrompt },
    ], {
      temperature: 0.2,
      maxTokens: 500,
    });

    inputTokens += estimateTokenCount(checklistPrompt + 'You extract action items from policy guidance. Output ONLY valid JSON array.');

    let checklist = [];
    try {
      const checklistText = checklistCompletion.choices[0].message.content || '[]';
      outputTokens += estimateTokenCount(checklistText);
      const parsed = JSON.parse(checklistText);
      checklist = parsed.map((item: any, index: number) => ({
        step: index + 1,
        task: item.task || item.name || 'Action item',
        deadline: item.deadline || item.timeline || 'TBD',
        agency: item.agency || item.responsible || 'Relevant authority',
        status: 'pending' as const,
      }));
    } catch (error) {
      console.error('Error parsing checklist:', error);
      checklist = [
        {
          step: 1,
          task: 'Review detailed policy documentation',
          deadline: 'Week 1',
          agency: 'N/A',
          status: 'pending' as const,
        },
      ];
    }

    const citations = policyBriefs?.sources || [
      {
        title: `${body.country} Renewable Energy Framework`,
        url: '#',
        relevance: 'Primary regulatory framework',
      },
    ];

    const response: PolicyCopilotResponse = {
      answer,
      checklist,
      citations,
    };

    await logAIUsage({
      feature: 'policy_copilot',
      inputTokens,
      outputTokens,
      responseTimeMs: Date.now() - startTime,
      success: true,
      metadata: {
        country: body.country,
        technology: body.technology,
        size_mw: body.size_mw,
      },
    });

    return NextResponse.json({
      ...response,
      disclaimer: 'Informational only. Not legal advice. Verify with official sources and legal counsel.',
      powered_by: 'GPT-4o-mini',
    });
  } catch (error: any) {
    console.error('Policy API error:', error);

    await logAIUsage({
      feature: 'policy_copilot',
      inputTokens,
      outputTokens,
      responseTimeMs: Date.now() - startTime,
      success: false,
      errorMessage: error.message,
    });

    return NextResponse.json(
      {
        error: 'Failed to process policy request',
        details: error.message
      },
      { status: 500 }
    );
  }
}
