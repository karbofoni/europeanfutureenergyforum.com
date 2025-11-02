import { NextRequest, NextResponse } from 'next/server';
import { GridEstimatorRequest, GridEstimatorResponse } from '@/types/ai';
import { chatCompletion } from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { logAIUsage, estimateTokenCount } from '@/lib/ai-analytics';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per minute per IP
  const clientId = getClientIdentifier(request);
  const rateLimitResult = checkRateLimit(clientId, 10);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: rateLimitResult.headers,
      }
    );
  }

  const startTime = Date.now();
  let inputTokens = 0;
  let outputTokens = 0;

  try {
    const body: GridEstimatorRequest = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI features are not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const { data: gridBrief } = await supabase
      .from('grid_briefs')
      .select('*')
      .eq('country', body.country)
      .maybeSingle();

    const contextInfo = gridBrief
      ? `Reference data for ${gridBrief.country_name}: Typical lead time is ${gridBrief.lead_time_min_months}-${gridBrief.lead_time_max_months} months. ${gridBrief.queue_notes || ''}`
      : `No specific data available for ${body.country}.`;

    const systemPrompt = `You are a grid interconnection expert specializing in European electricity networks.
Provide realistic, detailed timeline estimates for renewable energy projects connecting to the grid.
Consider country-specific regulations, grid congestion, and typical approval processes.
Be specific and practical in your estimates.`;

    const userPrompt = `Estimate the grid connection timeline for:
- Country: ${body.country}
- Technology: ${body.technology}
- Capacity: ${body.size_mw} MW
- Interconnection Type: ${body.interconnection_type}
${body.has_ppa ? '- Has PPA: Yes' : ''}

Context: ${contextInfo}

Provide:
1. Timeline range in months (min-max)
2. 4-5 key process steps with durations
3. Required documents
4. Critical factors that could impact timeline

Format your response as JSON with this structure:
{
  "range_months": [min, max],
  "steps": [{"name": "", "duration_months": 0, "description": ""}],
  "documents": ["doc1", "doc2"],
  "notes": "key factors and considerations"
}`;

    const completion = await chatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], {
      temperature: 0.4,
      maxTokens: 1000,
    });

    inputTokens += estimateTokenCount(systemPrompt + userPrompt);
    const aiResponse = completion.choices[0].message.content || '{}';
    outputTokens += estimateTokenCount(aiResponse);

    let parsedResponse: GridEstimatorResponse;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      parsedResponse = JSON.parse(jsonMatch ? jsonMatch[0] : aiResponse);
    } catch (parseError) {
      const baseTime = body.interconnection_type === 'Distribution' ? 12 : 18;
      const sizeMultiplier = body.size_mw > 100 ? 1.3 : 1.0;
      parsedResponse = {
        range_months: [
          Math.round(baseTime * sizeMultiplier),
          Math.round((baseTime + 8) * sizeMultiplier),
        ],
        steps: [
          {
            name: 'Pre-application Consultation',
            duration_months: 1,
            description: 'Initial discussion with grid operator',
          },
          {
            name: 'Formal Application',
            duration_months: body.interconnection_type === 'Distribution' ? 3 : 5,
            description: 'Submit application and feasibility study',
          },
          {
            name: 'Connection Agreement',
            duration_months: 2,
            description: 'Negotiate and sign connection terms',
          },
          {
            name: 'Construction',
            duration_months: body.interconnection_type === 'Distribution' ? 6 : 10,
            description: 'Build infrastructure and testing',
          },
        ],
        documents: [
          'Technical Project Description',
          'Single-line Diagram',
          'Land Rights',
          'Environmental Clearance',
        ],
        notes: `AI-generated estimate for ${body.size_mw} MW ${body.technology} project.`,
      };
    }

    await logAIUsage({
      feature: 'grid_estimator',
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
      ...parsedResponse,
      disclaimer: 'AI-generated estimates. Verify with local grid operator.',
      powered_by: 'GPT-4o-mini',
    });
  } catch (error: any) {
    console.error('Grid API error:', error);

    await logAIUsage({
      feature: 'grid_estimator',
      inputTokens,
      outputTokens,
      responseTimeMs: Date.now() - startTime,
      success: false,
      errorMessage: error.message,
    });

    return NextResponse.json(
      { error: 'Failed to process grid estimation', details: error.message },
      { status: 500 }
    );
  }
}
