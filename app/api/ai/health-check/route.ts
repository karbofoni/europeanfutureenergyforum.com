import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import type {
  ProjectHealthCheckInput,
  HealthCheckResult,
  CategoryScore,
  RedFlag,
  BenchmarkData,
  InvestorReadiness,
} from '@/types/health-check';

export async function POST(request: NextRequest) {
  try {

    // Rate limiting: 10 requests per minute per IP
    const clientId = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(clientId, 10);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: rateLimitResult.headers }
      );
    }

    const input: ProjectHealthCheckInput = await request.json();

    // Validate required fields
    if (!input.technology || !input.country || !input.capacity_mw || !input.stage ||
        !input.capex_eur || !input.revenue_model || !input.ppa_status ||
        !input.grid_status || !input.permit_status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch comparable projects for benchmarking
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('technology', input.technology)
      .gte('capacity_mw', input.capacity_mw * 0.5)
      .lte('capacity_mw', input.capacity_mw * 2);

    const comparableProjects = projects || [];

    // Calculate benchmarks
    const benchmarks = calculateBenchmarks(input, comparableProjects);

    // Generate AI analysis using GPT-4
    const aiAnalysis = await generateAIAnalysis(input, comparableProjects.length);

    // Build final result
    const result: HealthCheckResult = {
      report_id: `HC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      overall_score: aiAnalysis.overall_score,
      score_category: getScoreCategory(aiAnalysis.overall_score),
      quick_summary: aiAnalysis.quick_summary,
      category_scores: aiAnalysis.category_scores,
      red_flags: aiAnalysis.red_flags,
      recommendations: aiAnalysis.recommendations,
      benchmarks,
      comparable_projects_count: comparableProjects.length,
      percentile_rank: calculatePercentileRank(input, comparableProjects),
      investor_readiness: aiAnalysis.investor_readiness,
      project_data: input,
    };

    return NextResponse.json(result, {
      headers: rateLimitResult.headers,
    });

  } catch (error) {
    console.error('Health check error:', error);

    // Log environment check
    console.error('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
    console.error('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0);

    // Provide more specific error messages
    if (error instanceof Error) {
      // Log the full error for debugging
      console.error('Full error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });

      // Check for OpenAI-specific errors
      if (error.message.includes('API key') || error.message.includes('Incorrect API key')) {
        return NextResponse.json(
          { error: 'AI service authentication failed. Please contact support.' },
          { status: 503 }
        );
      }

      if (error.message.includes('rate limit') || error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'AI service is temporarily at capacity. Please try again in a few minutes.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to analyze project. Please try again or contact support if the issue persists.' },
      { status: 500 }
    );
  }
}

function getScoreCategory(score: number): 'Excellent' | 'Good' | 'Needs Work' | 'High Risk' {
  if (score >= 75) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs Work';
  return 'High Risk';
}

function calculateBenchmarks(
  input: ProjectHealthCheckInput,
  comparables: any[]
): BenchmarkData[] {
  const benchmarks: BenchmarkData[] = [];

  // CAPEX per MW benchmark
  const capexPerMW = input.capex_eur / input.capacity_mw;
  const comparableCapexPerMW = comparables
    .filter(p => p.capex_eur && p.capacity_mw)
    .map(p => p.capex_eur / p.capacity_mw)
    .sort((a, b) => a - b);

  if (comparableCapexPerMW.length >= 4) {
    benchmarks.push({
      metric: 'CAPEX per MW',
      your_value: Math.round(capexPerMW / 1000),
      p25: Math.round(comparableCapexPerMW[Math.floor(comparableCapexPerMW.length * 0.25)] / 1000),
      p50: Math.round(comparableCapexPerMW[Math.floor(comparableCapexPerMW.length * 0.5)] / 1000),
      p75: Math.round(comparableCapexPerMW[Math.floor(comparableCapexPerMW.length * 0.75)] / 1000),
      percentile: calculatePercentile(capexPerMW, comparableCapexPerMW),
      unit: 'k EUR',
    });
  }

  // IRR benchmark (if provided)
  if (input.expected_irr) {
    const comparableIRRs = comparables
      .filter(p => p.expected_irr)
      .map(p => p.expected_irr)
      .sort((a, b) => a - b);

    if (comparableIRRs.length >= 4) {
      benchmarks.push({
        metric: 'Expected IRR',
        your_value: input.expected_irr,
        p25: comparableIRRs[Math.floor(comparableIRRs.length * 0.25)],
        p50: comparableIRRs[Math.floor(comparableIRRs.length * 0.5)],
        p75: comparableIRRs[Math.floor(comparableIRRs.length * 0.75)],
        percentile: calculatePercentile(input.expected_irr, comparableIRRs),
        unit: '%',
      });
    }
  }

  return benchmarks;
}

function calculatePercentile(value: number, sortedArray: number[]): number {
  if (sortedArray.length === 0) return 50;

  const index = sortedArray.findIndex(v => v >= value);
  if (index === -1) return 100;
  if (index === 0) return 0;

  return Math.round((index / sortedArray.length) * 100);
}

function calculatePercentileRank(input: ProjectHealthCheckInput, comparables: any[]): number {
  // Simple scoring based on key milestones
  let score = 0;
  const weights = {
    ppa: 25,
    grid: 25,
    permits: 20,
    financing: 15,
    land: 15,
  };

  // PPA score
  if (input.ppa_status === 'Signed') score += weights.ppa;
  else if (input.ppa_status === 'Negotiation') score += weights.ppa * 0.6;
  else if (input.ppa_status === 'Not Applicable') score += weights.ppa * 0.5;

  // Grid score
  if (input.grid_status === 'Connected') score += weights.grid;
  else if (input.grid_status === 'Secured') score += weights.grid * 0.8;
  else if (input.grid_status === 'Application Submitted') score += weights.grid * 0.4;

  // Permits score
  if (input.permit_status === 'All Obtained') score += weights.permits;
  else if (input.permit_status === 'In Progress') score += weights.permits * 0.5;

  // Financing score (optional field)
  if (input.financing_status === 'Closed') score += weights.financing;
  else if (input.financing_status === 'Term Sheet') score += weights.financing * 0.7;
  else if (input.financing_status === 'Self-Funded') score += weights.financing * 0.8;

  // Land score (optional field)
  if (input.land_status === 'Owned') score += weights.land;
  else if (input.land_status === 'Leased') score += weights.land * 0.9;
  else if (input.land_status === 'Option') score += weights.land * 0.5;

  return Math.round(score);
}

async function generateAIAnalysis(
  input: ProjectHealthCheckInput,
  comparableCount: number
): Promise<{
  overall_score: number;
  quick_summary: string[];
  category_scores: {
    technical: CategoryScore;
    financial: CategoryScore;
    legal: CategoryScore;
    market: CategoryScore;
    development: CategoryScore;
  };
  red_flags: RedFlag[];
  recommendations: string[];
  investor_readiness: InvestorReadiness;
}> {
  const prompt = `You are an expert renewable energy project analyst conducting due diligence on a ${input.technology} project in ${input.country}.

Project Details:
- Technology: ${input.technology}
- Country: ${input.country}
- Capacity: ${input.capacity_mw} MW
- Stage: ${input.stage}
- CAPEX: €${input.capex_eur.toLocaleString()}
- Expected IRR: ${input.expected_irr ? input.expected_irr + '%' : 'Not provided'}
- Revenue Model: ${input.revenue_model}
- PPA Status: ${input.ppa_status}
- Grid Status: ${input.grid_status}
- Permit Status: ${input.permit_status}
- Expected COD: ${input.expected_cod || 'Not specified'}
- Team Experience: ${input.team_experience || 'Not provided'}
- Land Status: ${input.land_status || 'Not provided'}
- Financing Status: ${input.financing_status || 'Not provided'}
- Offtaker: ${input.offtaker_name || 'Not provided'}

Context: We have ${comparableCount} comparable ${input.technology} projects in our database for benchmarking.

Your task is to provide a comprehensive project health check analysis. Respond with a JSON object containing:

1. overall_score (0-100): Weighted average of category scores
2. quick_summary: Array of 3-4 brief bullet points highlighting the most critical findings
3. category_scores: Object with 5 categories (technical, financial, legal, market, development), each containing:
   - score (0-100)
   - summary (1-2 sentences)
   - key_findings (array of 2-3 positive observations)
   - concerns (array of 1-3 concerns, can be empty if none)
   - grade ('Excellent' | 'Good' | 'Fair' | 'Poor')

4. red_flags: Array of critical issues (0-5 items), each with:
   - severity ('critical' | 'warning' | 'advisory')
   - title (brief)
   - description (1-2 sentences)
   - impact (potential consequence)
   - recommendations (array of 2-3 actionable items)

5. recommendations: Array of 4-6 prioritized next steps for the project developer

6. investor_readiness: Object with:
   - score (0-100)
   - completed_milestones (array of achieved milestones)
   - pending_milestones (array of in-progress items)
   - critical_gaps (array of missing critical items)

Scoring Guidelines:
- Technical (25%): Technology maturity, capacity sizing, location suitability
- Financial (25%): CAPEX reasonableness, IRR expectations, revenue model strength
- Legal (20%): Permitting progress, land rights, regulatory compliance
- Market (15%): PPA status, offtaker credit quality, market conditions
- Development (15%): Team experience, project timeline, COD feasibility

Be specific to ${input.country}'s renewable energy landscape, permitting timelines, and grid connection realities. Consider typical ${input.technology} project risks.

Respond ONLY with valid JSON, no markdown formatting.`;

  const completion = await chatCompletion([
    {
      role: 'system',
      content: 'You are an expert renewable energy project analyst. Provide thorough, realistic due diligence assessments. Always respond with valid JSON only.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ], {
    temperature: 0.7,
    maxTokens: 3000,
  });

  const responseText = completion.choices[0].message.content || '{}';

  try {
    const analysis = JSON.parse(responseText);
    return analysis;
  } catch (error) {
    console.error('Failed to parse AI response:', responseText);
    throw new Error('Invalid AI response format');
  }
}
