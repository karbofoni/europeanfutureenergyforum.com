import Image from 'next/image';
import { getShimmerDataURL } from '@/lib/image-blur';
import { supabase } from '@/lib/supabase';
import { GridBrief } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, FileCheck } from 'lucide-react';
import { GridEstimator } from '@/components/grid-estimator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid Connection Guide | Transition Nexus Europe',
  description: 'Grid interconnection timelines and processes across Europe. Understand connection requirements, lead times, and documentation for renewable energy projects.',
  alternates: {
    canonical: './'
  }
};

export const revalidate = 60;

async function getGridBriefs(): Promise<GridBrief[]> {
  const { data } = await supabase
    .from('grid_briefs')
    .select('*')
    .order('country_name', { ascending: true });
  return data || [];
}

export default async function GridPage() {
  const briefs = await getGridBriefs();
  const countries = Array.from(new Set(briefs.map(b => b.country))).sort();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-yellow-50 via-white to-emerald-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/9875436/pexels-photo-9875436.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Electrical grid"
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
            <h1 className="text-4xl font-bold mb-4">Grid Connection Guide</h1>
            <p className="text-lg text-muted-foreground">
              Understand grid interconnection processes, timelines, and requirements across European markets.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-5xl mx-auto mb-12">
          <GridEstimator countries={countries} />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Country-Specific Grid Information</h2>
            <p className="text-muted-foreground mb-6">
              Browse detailed grid connection information for each European market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {briefs.map((brief) => (
          <Card key={brief.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Zap className="h-8 w-8 text-emerald-600" />
                <Badge variant="secondary">{brief.country}</Badge>
              </div>
              <CardTitle className="text-2xl">{brief.country_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lead Time</p>
                    <p className="font-semibold">
                      {brief.lead_time_min_months}-{brief.lead_time_max_months} months
                    </p>
                  </div>
                </div>

                {brief.queue_notes && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                    <p className="text-xs text-amber-900">{brief.queue_notes}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Connection Process</h4>
                  <ol className="space-y-2">
                    {brief.steps.slice(0, 3).map((step: any) => (
                      <li key={step.step} className="text-sm flex gap-2">
                        <span className="font-medium text-emerald-600">{step.step}.</span>
                        <div>
                          <p className="font-medium">{step.name}</p>
                          <p className="text-xs text-muted-foreground">{step.typical_duration}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{brief.documents.length} documents required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Lead times are indicative and vary by project size, location, and grid capacity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
