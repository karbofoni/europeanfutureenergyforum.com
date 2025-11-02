'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResultsDisplay } from '@/components/health-check/results-display';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import type { HealthCheckResult } from '@/types/health-check';

export default function ReportPage({ params }: { params: { id: string } }) {
  const resolvedParams = params;
  const router = useRouter();
  const [report, setReport] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/health-check/report/${resolvedParams.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Report not found');
          } else {
            setError('Failed to load report');
          }
          return;
        }

        const data = await response.json();
        setReport(data);
      } catch (err) {
        setError('Failed to load report');
        console.error('Error fetching report:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [resolvedParams.id]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Project Health Check Report',
          text: 'Check out this renewable energy project analysis',
          url,
        });
      } catch (err) {
        // User cancelled or share failed, fall back to copy
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Report Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'This report does not exist or has been removed.'}</p>
          <Button onClick={() => router.push('/health-check')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Health Check
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => router.push('/health-check')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Health Check
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Project Health Check Results</h1>
                <p className="text-muted-foreground">
                  Report ID: {report.report_id} • Generated: {new Date(report.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <ResultsDisplay result={report} />

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
