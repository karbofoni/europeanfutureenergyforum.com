import { supabase } from './supabase';

export const AI_COSTS = {
  'gpt-4o-mini': {
    input: 0.150 / 1_000_000,
    output: 0.600 / 1_000_000,
  },
  'text-embedding-3-small': {
    input: 0.020 / 1_000_000,
    output: 0,
  },
};

export interface AIUsageLogData {
  feature: 'policy_copilot' | 'matchmaker' | 'grid_estimator' | 'event_scheduler';
  inputTokens: number;
  outputTokens: number;
  responseTimeMs: number;
  success: boolean;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export async function logAIUsage(data: AIUsageLogData) {
  try {
    const totalTokens = data.inputTokens + data.outputTokens;

    let costUsd = 0;
    if (data.feature === 'policy_copilot') {
      costUsd =
        data.inputTokens * AI_COSTS['gpt-4o-mini'].input +
        data.outputTokens * AI_COSTS['gpt-4o-mini'].output;
    } else if (data.feature === 'matchmaker') {
      costUsd = data.inputTokens * AI_COSTS['text-embedding-3-small'].input;
    }

    const userSessionId = typeof window !== 'undefined'
      ? sessionStorage.getItem('session_id') || generateSessionId()
      : 'server';

    if (typeof window !== 'undefined' && !sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', userSessionId);
    }

    await supabase.from('ai_usage_logs').insert({
      feature: data.feature,
      user_session_id: userSessionId,
      input_tokens: data.inputTokens,
      output_tokens: data.outputTokens,
      total_tokens: totalTokens,
      cost_usd: costUsd,
      response_time_ms: data.responseTimeMs,
      success: data.success,
      error_message: data.errorMessage,
      metadata: data.metadata || {},
    });
  } catch (error) {
    console.error('Failed to log AI usage:', error);
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export async function getAIUsageStats(days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from('ai_usage_logs')
    .select('*')
    .gte('created_at', since.toISOString());

  if (error || !data) {
    console.error('Error fetching AI usage stats:', error);
    return null;
  }

  const stats = {
    totalRequests: data.length,
    successfulRequests: data.filter(log => log.success).length,
    failedRequests: data.filter(log => !log.success).length,
    totalCost: data.reduce((sum, log) => sum + (parseFloat(log.cost_usd) || 0), 0),
    avgResponseTime: data.reduce((sum, log) => sum + (log.response_time_ms || 0), 0) / data.length,
    byFeature: {} as Record<string, {
      requests: number;
      cost: number;
      avgResponseTime: number;
    }>,
  };

  ['policy_copilot', 'matchmaker', 'grid_estimator', 'event_scheduler'].forEach(feature => {
    const featureLogs = data.filter(log => log.feature === feature);
    if (featureLogs.length > 0) {
      stats.byFeature[feature] = {
        requests: featureLogs.length,
        cost: featureLogs.reduce((sum, log) => sum + (parseFloat(log.cost_usd) || 0), 0),
        avgResponseTime: featureLogs.reduce((sum, log) => sum + (log.response_time_ms || 0), 0) / featureLogs.length,
      };
    }
  });

  return stats;
}

export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}
