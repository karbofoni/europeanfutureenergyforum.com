'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectForm } from '@/components/health-check/project-form';
import { ResultsDisplay } from '@/components/health-check/results-display';
import { getShimmerDataURL } from '@/lib/image-blur';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Clock, Award, ArrowRight, CheckCircle2, Eye, Zap } from 'lucide-react';
import type { ProjectHealthCheckInput, HealthCheckResult } from '@/types/health-check';
import { DEMO_REPORT, EXAMPLE_PROJECT } from '@/lib/demo-data';

export default function HealthCheckPage() {
  const [showForm, setShowForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exampleData, setExampleData] = useState<ProjectHealthCheckInput | null>(null);

  // Loading progress messages
  useEffect(() => {
    if (!isAnalyzing) return;

    const messages = [
      'Analyzing technical factors...',
      'Evaluating financial structure...',
      'Comparing with similar projects...',
      'Assessing legal and regulatory compliance...',
      'Identifying potential risks...',
      'Calculating investor readiness...',
      'Finalizing recommendations...',
    ];

    let messageIndex = 0;
    setLoadingMessage(messages[0]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleSubmit = async (data: ProjectHealthCheckInput) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/health-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analysisResult: HealthCheckResult = await response.json();
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze project');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartNew = () => {
    setResult(null);
    setShowForm(true);
    setExampleData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDemo = () => {
    setResult(DEMO_REPORT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryExample = () => {
    setExampleData(EXAMPLE_PROJECT);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show results if available
  if (result) {
    return (
      <div className="min-h-screen">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
          <div className="container py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-2">Project Health Check Results</h1>
              <p className="text-muted-foreground">
                Report ID: {result.report_id} • Generated: {new Date(result.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="max-w-6xl mx-auto">
            <ResultsDisplay result={result} />

            <div className="mt-12 flex justify-center gap-4">
              <Button onClick={handleStartNew} variant="outline" size="lg">
                Analyze Another Project
              </Button>
              <Button onClick={() => window.print()} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Export Report
              </Button>
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-lg border text-center text-sm text-muted-foreground">
              <p>
                <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not
                constitute financial, legal, or investment advice. Always conduct thorough due diligence
                with qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show form if started
  if (showForm) {
    return (
      <div className="min-h-screen">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
          <div className="container py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-2">AI Project Health Check</h1>
              <p className="text-muted-foreground">
                Complete the form below to receive your comprehensive project analysis
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {error && (
            <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <strong>Error:</strong> {error}
            </div>
          )}

          {isAnalyzing && (
            <div className="max-w-3xl mx-auto mb-6 p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                <span className="text-lg font-semibold text-emerald-900">Analyzing Your Project</span>
              </div>
              <p className="text-emerald-700">{loadingMessage}</p>
              <p className="text-xs text-emerald-600 mt-2">This typically takes 10-15 seconds</p>
            </div>
          )}

          <ProjectForm onSubmit={handleSubmit} isLoading={isAnalyzing} exampleData={exampleData} />

          <div className="max-w-3xl mx-auto mt-8 text-center">
            <Button variant="ghost" onClick={() => {
              setShowForm(false);
              setExampleData(null);
            }}>
              Back to Overview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Project analysis"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={getShimmerDataURL()}
          />
        </div>
        <div className="container relative z-10 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI-Powered Project Health Check
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get instant due diligence analysis for your renewable energy project.
              Understand risks, compare benchmarks, and prepare for investor conversations—all in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleViewDemo}
                className="text-lg px-8"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Demo Report
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleTryExample}
                className="text-lg px-8"
              >
                <Zap className="mr-2 h-5 w-5" />
                Try Example
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No signup required • Takes 3 minutes • 100% free
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Problem Statement */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">The €50k-200k Problem</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Professional due diligence for renewable energy projects costs <strong>€50,000 to €200,000</strong> and
            takes weeks. Many early-stage developers can&apos;t afford this—yet investors require it.
          </p>
          <p className="text-lg text-emerald-600 font-semibold mt-4">
            Our AI gives you instant preliminary analysis for free.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-emerald-600 mb-3" />
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get comprehensive analysis in under 3 minutes. No waiting weeks for consultant reports.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-emerald-600 mb-3" />
              <CardTitle>Risk Identification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Spot critical red flags before investors do. Address issues proactively to improve project quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-emerald-600 mb-3" />
              <CardTitle>Benchmark Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See how your project compares to similar deals. Understand if your metrics are competitive.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-emerald-600 mb-3" />
              <CardTitle>Investor Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Know exactly what milestones you need to attract capital. Prioritize next steps strategically.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Enter Project Details</h3>
                <p className="text-muted-foreground">
                  Complete a 4-step form covering basics, financials, development status, and optional details.
                  Takes 2-3 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your project against 5 categories: Technical, Financial, Legal, Market, and
                  Development. It identifies risks and compares you to similar projects in our database.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Get Your Report</h3>
                <p className="text-muted-foreground">
                  Receive an overall health score (0-100), category breakdowns, red flags, benchmarks,
                  investor readiness assessment, and prioritized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What&apos;s Included</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Overall Project Health Score (0-100)',
              'Category Scores: Technical, Financial, Legal, Market, Development',
              'Red Flags & Risk Assessment',
              'Benchmark Comparison vs Similar Projects',
              'Investor Readiness Score',
              'Prioritized Recommendations',
              'Completed vs Pending Milestones',
              'Critical Gaps Identification',
              'Country-Specific Insights',
              'Exportable PDF Report',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center bg-emerald-50 rounded-2xl p-12 border border-emerald-200">
          <h2 className="text-3xl font-bold mb-4">Ready to Analyze Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join developers who are using AI to prepare better for investor conversations.
          </p>
          <Button
            size="lg"
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
          >
            Start Free Health Check
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No signup required • Takes 3 minutes • 100% free
          </p>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-slate-50 rounded-lg border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Important:</strong> This tool provides preliminary analysis for informational purposes only.
            It is not a substitute for professional due diligence, financial advice, or legal counsel.
            Always consult qualified professionals before making investment or business decisions.
            Results are based on the information you provide and comparable project data in our database.
          </p>
        </div>
      </div>
    </div>
  );
}
