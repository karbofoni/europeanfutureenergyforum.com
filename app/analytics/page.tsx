import Image from 'next/image';
import { getShimmerDataURL } from '@/lib/image-blur';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Clock, DollarSign, Activity, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Analytics Dashboard | Transition Nexus Europe',
  description: 'Monitor AI feature usage, performance, and costs',
};

export const revalidate = 30;

interface AILog {
  id: string;
  feature: string;
  input_tokens: number;
  output_tokens: number;
  cost_usd: number;
  response_time_ms: number;
  success: boolean;
  created_at: string;
}

async function getAIAnalytics() {
  const { data: logs } = await supabase
    .from('ai_usage_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const logsTyped = (logs || []) as AILog[];

  const totalCalls = logsTyped.length;
  const successfulCalls = logsTyped.filter(l => l.success).length;
  const totalCost = logsTyped.reduce((sum, l) => sum + (l.cost_usd || 0), 0);
  const avgResponseTime = logsTyped.length > 0
    ? logsTyped.reduce((sum, l) => sum + l.response_time_ms, 0) / logsTyped.length
    : 0;

  const featureBreakdown = logsTyped.reduce((acc, log) => {
    const feature = log.feature || 'unknown';
    if (!acc[feature]) {
      acc[feature] = { calls: 0, cost: 0, avgTime: 0, success: 0 };
    }
    acc[feature].calls += 1;
    acc[feature].cost += log.cost_usd || 0;
    acc[feature].avgTime += log.response_time_ms;
    if (log.success) acc[feature].success += 1;
    return acc;
  }, {} as Record<string, { calls: number; cost: number; avgTime: number; success: number }>);

  Object.keys(featureBreakdown).forEach(feature => {
    featureBreakdown[feature].avgTime /= featureBreakdown[feature].calls;
  });

  const recentLogs = logsTyped.slice(0, 20);

  return {
    totalCalls,
    successfulCalls,
    totalCost,
    avgResponseTime,
    successRate: totalCalls > 0 ? (successfulCalls / totalCalls) * 100 : 0,
    featureBreakdown,
    recentLogs,
  };
}

export default async function AnalyticsPage() {
  const analytics = await getAIAnalytics();

  const featureNames: Record<string, string> = {
    policy_copilot: 'Policy Copilot',
    matchmaker: 'Smart Matchmaker',
    grid_estimator: 'Grid Timeline Estimator',
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Data analytics dashboard"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={getShimmerDataURL()}
          />
        </div>
        <div className="container relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Sparkles className="h-8 w-8 text-emerald-600" />
              <h1 className="text-4xl font-bold">AI Analytics Dashboard</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Monitor AI feature usage, performance metrics, and operational costs across the platform.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total AI Calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{analytics.totalCalls}</div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{analytics.successRate.toFixed(1)}%</div>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.successfulCalls} of {analytics.totalCalls} successful
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">${analytics.totalCost.toFixed(3)}</div>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg: ${analytics.totalCalls > 0 ? (analytics.totalCost / analytics.totalCalls).toFixed(4) : '0.0000'} per call
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Response Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{Math.round(analytics.avgResponseTime)}</div>
              <span className="text-sm text-muted-foreground">ms</span>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        </div>

        <Card className="mb-8">
        <CardHeader>
          <CardTitle>Feature Breakdown</CardTitle>
          <CardDescription>Performance metrics by AI feature</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(analytics.featureBreakdown).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No AI usage data yet. Use AI features to see analytics.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(analytics.featureBreakdown).map(([feature, stats]) => (
                <div key={feature} className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">
                      {featureNames[feature] || feature}
                    </h3>
                    <Badge variant="secondary">
                      {stats.calls} calls
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cost</p>
                      <p className="font-medium">${stats.cost.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Time</p>
                      <p className="font-medium">{Math.round(stats.avgTime)}ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success</p>
                      <p className="font-medium">
                        {((stats.success / stats.calls) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        </Card>

        <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest AI feature usage logs</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.recentLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-slate-50 rounded border text-sm">
                  <div className="flex items-center gap-3">
                    <Badge variant={log.success ? 'default' : 'destructive'} className="text-xs">
                      {log.success ? 'Success' : 'Failed'}
                    </Badge>
                    <span className="font-medium">
                      {featureNames[log.feature] || log.feature}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{log.response_time_ms}ms</span>
                    <span>${(log.cost_usd || 0).toFixed(4)}</span>
                    <span className="text-xs">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-slate-50 rounded-lg border">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium mb-1">About AI Analytics</p>
              <p className="text-sm text-muted-foreground">
                This dashboard tracks real-time usage of AI features including the Policy Copilot,
                Smart Matchmaker, and Grid Timeline Estimator. Costs are calculated based on OpenAI's
                token pricing. Data refreshes every 30 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
