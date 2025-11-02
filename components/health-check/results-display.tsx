'use client';

import { HealthCheckResult, CategoryScore, RedFlag, BenchmarkData } from '@/types/health-check';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HealthGauge } from './health-gauge';
import { AlertTriangle, CheckCircle2, AlertCircle, TrendingUp, Award, Target, BarChart3 } from 'lucide-react';

interface ResultsDisplayProps {
  result: HealthCheckResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <Card className="border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Project Health Score</CardTitle>
          <CardDescription>Overall assessment of your project&apos;s investment readiness</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-8">
          <HealthGauge score={result.overall_score} size="lg" showLabel={true} />

          {/* Quick Summary */}
          <div className="mt-8 max-w-2xl">
            <h3 className="font-semibold text-lg mb-3 text-center">Quick Summary</h3>
            <ul className="space-y-2">
              {result.quick_summary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Category Analysis
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(result.category_scores).map(([key, category]) => (
            <CategoryScoreCard key={key} name={key} category={category} />
          ))}
        </div>
      </div>

      {/* Red Flags */}
      {result.red_flags.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            Issues & Concerns
          </h2>
          <div className="space-y-3">
            {result.red_flags.map((flag, idx) => (
              <RedFlagCard key={idx} flag={flag} />
            ))}
          </div>
        </div>
      )}

      {/* Benchmarks */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Benchmark Comparison
        </h2>
        <Card>
          <CardHeader>
            <CardDescription>
              Compared against {result.comparable_projects_count} similar projects.
              Your project ranks in the <strong>{result.percentile_rank}th percentile</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.benchmarks.map((benchmark, idx) => (
              <BenchmarkRow key={idx} benchmark={benchmark} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Investor Readiness */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-6 w-6" />
          Investor Readiness
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <HealthGauge
                score={result.investor_readiness.score}
                size="md"
                showLabel={false}
              />
              <p className="text-center mt-4 text-lg font-semibold">
                {result.investor_readiness.score >= 75 ? 'Investment Ready' :
                 result.investor_readiness.score >= 50 ? 'Nearly Ready' :
                 'Requires Preparation'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-sm text-emerald-600 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </h4>
                <ul className="space-y-1 text-sm">
                  {result.investor_readiness.completed_milestones.map((m, i) => (
                    <li key={i} className="text-muted-foreground">• {m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-blue-600 mb-2 flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Pending
                </h4>
                <ul className="space-y-1 text-sm">
                  {result.investor_readiness.pending_milestones.map((m, i) => (
                    <li key={i} className="text-muted-foreground">• {m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-red-600 mb-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Critical Gaps
                </h4>
                <ul className="space-y-1 text-sm">
                  {result.investor_readiness.critical_gaps.map((m, i) => (
                    <li key={i} className="text-muted-foreground">• {m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Next Steps & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm">
                  <strong>{idx + 1}.</strong> {rec}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Category Score Card Component
function CategoryScoreCard({ name, category }: { name: string; category: CategoryScore }) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Excellent': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Fair': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Poor': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const categoryIcons: Record<string, any> = {
    technical: '⚙️',
    financial: '💰',
    legal: '⚖️',
    market: '📈',
    development: '🏗️',
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">{categoryIcons[name]}</span>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{category.score}</span>
          <Badge className={getGradeColor(category.grade)}>
            {category.grade}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{category.summary}</p>

        {category.key_findings.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-emerald-600 mb-1">Key Strengths:</p>
            <ul className="text-xs space-y-0.5">
              {category.key_findings.slice(0, 2).map((finding, i) => (
                <li key={i} className="text-muted-foreground">• {finding}</li>
              ))}
            </ul>
          </div>
        )}

        {category.concerns.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-amber-600 mb-1">Concerns:</p>
            <ul className="text-xs space-y-0.5">
              {category.concerns.slice(0, 2).map((concern, i) => (
                <li key={i} className="text-muted-foreground">• {concern}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Red Flag Card Component
function RedFlagCard({ flag }: { flag: RedFlag }) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          badgeColor: 'bg-red-100 text-red-800',
        };
      case 'warning':
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          badgeColor: 'bg-amber-100 text-amber-800',
        };
      case 'advisory':
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          badgeColor: 'bg-blue-100 text-blue-800',
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-200',
          textColor: 'text-slate-800',
          badgeColor: 'bg-slate-100 text-slate-800',
        };
    }
  };

  const config = getSeverityConfig(flag.severity);

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={config.textColor}>{config.icon}</span>
            <CardTitle className="text-base">{flag.title}</CardTitle>
          </div>
          <Badge className={config.badgeColor}>{flag.severity.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{flag.description}</p>

        <div>
          <p className="text-xs font-semibold mb-1">Impact:</p>
          <p className="text-xs text-muted-foreground">{flag.impact}</p>
        </div>

        <div>
          <p className="text-xs font-semibold mb-1">Recommendations:</p>
          <ul className="text-xs space-y-0.5">
            {flag.recommendations.map((rec, i) => (
              <li key={i} className="text-muted-foreground">• {rec}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Benchmark Row Component
function BenchmarkRow({ benchmark }: { benchmark: BenchmarkData }) {
  const getPercentileColor = (percentile: number) => {
    if (percentile >= 75) return 'text-emerald-600';
    if (percentile >= 50) return 'text-blue-600';
    if (percentile >= 25) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{benchmark.metric}</span>
        <span className={`font-semibold ${getPercentileColor(benchmark.percentile)}`}>
          {benchmark.percentile}th percentile
        </span>
      </div>

      {/* Visual Bar */}
      <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
        {/* Quartile markers */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 border-r border-slate-300" />
          <div className="flex-1 border-r border-slate-300" />
          <div className="flex-1 border-r border-slate-300" />
          <div className="flex-1" />
        </div>

        {/* Your position marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-emerald-600 z-10"
          style={{ left: `${benchmark.percentile}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-600 rounded-full border-2 border-white" />
        </div>

        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium">
          <span>P25: {benchmark.p25}{benchmark.unit}</span>
          <span>P50: {benchmark.p50}{benchmark.unit}</span>
          <span>P75: {benchmark.p75}{benchmark.unit}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Your value: <strong>{benchmark.your_value}{benchmark.unit}</strong>
      </p>
    </div>
  );
}
