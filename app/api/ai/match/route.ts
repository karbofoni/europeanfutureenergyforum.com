import { NextRequest, NextResponse } from 'next/server';
import { MatchRequest, MatchResult } from '@/types/ai';
import { generateEmbedding, chatCompletion } from '@/lib/openai';
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

  try {
    const body: MatchRequest = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI features are not configured. Please contact support.' },
        { status: 503 }
      );
    }

    let sourceEntity: any;
    let targetTable: string;
    let sourceDescription: string;

    if (body.entityType === 'project') {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', body.entityId)
        .maybeSingle();
      sourceEntity = data;
      targetTable = 'investors';
      sourceDescription = `${data?.technology} project, ${data?.size_mw} MW, ${data?.stage} stage in ${data?.country}. ${data?.summary}`;
    } else if (body.entityType === 'investor') {
      const { data } = await supabase
        .from('investors')
        .select('*')
        .eq('id', body.entityId)
        .maybeSingle();
      sourceEntity = data;
      targetTable = 'projects';
      sourceDescription = `Investor: ${data?.name}. ${data?.summary}. Focus: ${data?.tech_focus.join(', ')}. Ticket: €${data?.ticket_min_eur / 1000000}-${data?.ticket_max_eur / 1000000}M`;
    } else {
      const { data } = await supabase
        .from('suppliers')
        .select('*')
        .eq('id', body.entityId)
        .maybeSingle();
      sourceEntity = data;
      targetTable = 'projects';
      sourceDescription = `Supplier: ${data?.name}. ${data?.role}. ${data?.summary}. Technologies: ${data?.technologies.join(', ')}`;
    }

    if (!sourceEntity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    const sourceEmbedding = await generateEmbedding(sourceDescription);
    inputTokens += estimateTokenCount(sourceDescription);

    let query = supabase
      .from(targetTable)
      .select('*');

    if (body.filters) {
      if (body.filters.countries && body.filters.countries.length > 0) {
        query = query.in('country', body.filters.countries);
      }
      if (body.filters.technologies && body.filters.technologies.length > 0 && targetTable === 'projects') {
        query = query.in('technology', body.filters.technologies);
      }
    }

    const { data: candidates } = await query.limit(20);

    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ matches: [], message: 'No candidates found' });
    }

    const scoredMatches = await Promise.all(
      candidates.map(async (candidate) => {
        let candidateDescription: string;
        if (targetTable === 'investors') {
          candidateDescription = `${candidate.name}. ${candidate.summary}. Focus: ${candidate.tech_focus.join(', ')}. Geographies: ${candidate.geographies.join(', ')}`;
        } else {
          candidateDescription = `${candidate.technology} project, ${candidate.size_mw} MW, ${candidate.stage} in ${candidate.country}. ${candidate.summary}`;
        }

        const candidateEmbedding = await generateEmbedding(candidateDescription);
        inputTokens += estimateTokenCount(candidateDescription);

        const similarity = cosineSimilarity(sourceEmbedding, candidateEmbedding);

        let geoMatch = 0;
        let techMatch = 0;
        let sizeMatch = 0;

        if (body.entityType === 'project' && targetTable === 'investors') {
          geoMatch = candidate.geographies.includes(sourceEntity.country) ? 100 : 50;
          techMatch = candidate.tech_focus.includes(sourceEntity.technology) ? 100 : 60;
          const projectCapex = sourceEntity.capex_eur || sourceEntity.size_mw * 1000000;
          if (projectCapex >= candidate.ticket_min_eur && projectCapex <= candidate.ticket_max_eur) {
            sizeMatch = 100;
          } else if (projectCapex < candidate.ticket_min_eur) {
            sizeMatch = Math.max(0, 100 - ((candidate.ticket_min_eur - projectCapex) / candidate.ticket_min_eur) * 100);
          } else {
            sizeMatch = 70;
          }
        }

        const semanticScore = similarity * 100;
        const finalScore = Math.round(
          semanticScore * 0.4 +
          geoMatch * 0.25 +
          techMatch * 0.25 +
          sizeMatch * 0.1
        );

        return {
          candidate,
          score: finalScore,
          semanticScore: Math.round(semanticScore),
          geoMatch,
          techMatch,
          sizeMatch,
        };
      })
    );

    scoredMatches.sort((a, b) => b.score - a.score);
    const topMatches = scoredMatches.slice(0, 5);

    const matches: MatchResult[] = topMatches.map((match) => ({
      id: match.candidate.id,
      name: match.candidate.name || match.candidate.title,
      score: match.score,
      reasons: [
        {
          factor: 'Semantic Similarity',
          score: match.semanticScore,
          explanation: 'AI-powered text similarity based on descriptions and focus areas',
        },
        ...(match.geoMatch > 0 ? [{
          factor: 'Geography',
          score: match.geoMatch,
          explanation: match.geoMatch === 100 ? 'Direct geographic match' : 'Partial geographic overlap',
        }] : []),
        ...(match.techMatch > 0 ? [{
          factor: 'Technology',
          score: match.techMatch,
          explanation: match.techMatch === 100 ? 'Direct technology match' : 'Related technology focus',
        }] : []),
        ...(match.sizeMatch > 0 ? [{
          factor: 'Size/Ticket',
          score: match.sizeMatch,
          explanation: match.sizeMatch === 100 ? 'Perfect size alignment' : 'Reasonable size fit',
        }] : []),
      ],
      entity: match.candidate,
    }));

    await logAIUsage({
      feature: 'matchmaker',
      inputTokens,
      outputTokens: 0,
      responseTimeMs: Date.now() - startTime,
      success: true,
      metadata: {
        entityType: body.entityType,
        matchCount: matches.length,
      },
    });

    return NextResponse.json({
      matches,
      disclaimer: 'AI-powered matching is informational only. Verify details and conduct due diligence.',
      powered_by: 'GPT-4o-mini + text-embedding-3-small',
    });
  } catch (error: any) {
    console.error('Match API error:', error);

    await logAIUsage({
      feature: 'matchmaker',
      inputTokens,
      outputTokens: 0,
      responseTimeMs: Date.now() - startTime,
      success: false,
      errorMessage: error.message,
    });

    return NextResponse.json(
      {
        error: 'Failed to process match request',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
