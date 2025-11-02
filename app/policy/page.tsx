import Image from 'next/image';
import { getShimmerDataURL } from '@/lib/image-blur';
import { supabase } from '@/lib/supabase';
import { PolicyBrief } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock } from 'lucide-react';
import { PolicyCopilot } from '@/components/policy-copilot';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Policy Briefs | Transition Nexus Europe',
  description: 'Plain-English policy guides for renewable energy across Europe',
};

export const revalidate = 60;

async function getPolicyBriefs(): Promise<PolicyBrief[]> {
  const { data } = await supabase
    .from('policy_briefs')
    .select('*')
    .order('country_name', { ascending: true });
  return data || [];
}

export default async function PolicyPage() {
  const briefs = await getPolicyBriefs();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Documents and planning"
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
            <h1 className="text-4xl font-bold mb-4">Policy Briefs</h1>
            <p className="text-lg text-muted-foreground">
              Plain-English guides to renewable energy incentives, permitting processes, and timelines across Europe.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
      <Card className="mb-12 bg-emerald-50 border-emerald-200 max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>✨ AI Policy Copilot</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ask specific questions about permitting, eligibility, and incentives for your project
          </p>
        </CardHeader>
        <CardContent>
          <PolicyCopilot />
        </CardContent>
      </Card>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Country Guides</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {briefs.map((brief) => (
          <Card key={brief.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-emerald-600" />
                <Badge variant="secondary">{brief.country}</Badge>
              </div>
              <CardTitle className="text-2xl">{brief.country_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Key Incentives</h4>
                  <ul className="space-y-2">
                    {brief.incentives.slice(0, 2).map((inc: any, idx: number) => (
                      <li key={idx} className="text-sm">
                        <p className="font-medium">{inc.name}</p>
                        <p className="text-muted-foreground text-xs">{inc.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Typical Timelines
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(brief.avg_lead_times).map(([tech, time]) => (
                      <div key={tech} className="flex justify-between text-sm">
                        <span className="capitalize">{tech}:</span>
                        <span className="font-medium">{time as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Permitting Steps</h4>
                  <p className="text-sm text-muted-foreground">
                    {brief.permitting_steps.length} key steps identified
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> Policy information is simplified for clarity. Always verify with official sources and legal counsel.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
