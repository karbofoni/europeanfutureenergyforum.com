import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Investor } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Globe, Mail, Phone, ExternalLink, Linkedin, Building2, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getInvestor(id: string): Promise<Investor | null> {
  const { data, error } = await supabase
    .from('investors')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const investor = await getInvestor(params.id);

  if (!investor) {
    return {
      title: 'Investor Not Found | Transition Nexus Europe',
    };
  }

  return {
    title: `${investor.name} | Investors | Transition Nexus Europe`,
    description: investor.summary,
    alternates: {
      canonical: `.`
    }
  };
}

export default async function InvestorDetailPage({ params }: { params: { id: string } }) {
  const investor = await getInvestor(params.id);

  if (!investor) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 border-b">
        <div className="container py-8">
          <Link href="/investors" className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Investors
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{investor.name}</h1>
            <p className="text-lg text-muted-foreground">{investor.summary}</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Investment Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Criteria</CardTitle>
                <CardDescription>Target investment parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Size</p>
                    <p className="text-lg font-semibold">
                      €{(investor.ticket_min_eur / 1000000).toFixed(1)}M - €{(investor.ticket_max_eur / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>

                {investor.irr_target && (
                  <div>
                    <p className="text-sm text-muted-foreground">Target IRR</p>
                    <p className="text-lg font-semibold">{investor.irr_target}%</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Mandate Types</p>
                  <div className="flex flex-wrap gap-2">
                    {investor.mandate_types.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Technology Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {investor.tech_focus.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Geographic Focus</p>
                    <p className="font-medium">{investor.geographies.join(', ')}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {investor.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {investor.headquarters && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Headquarters</p>
                      <p className="font-medium">{investor.headquarters}</p>
                    </div>
                  </div>
                )}

                {investor.contact_person && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium">{investor.contact_person}</p>
                    </div>
                  </div>
                )}

                {investor.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${investor.email}`} className="font-medium hover:text-emerald-600 break-all">
                        {investor.email}
                      </a>
                    </div>
                  </div>
                )}

                {investor.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${investor.phone}`} className="font-medium hover:text-emerald-600">
                        {investor.phone}
                      </a>
                    </div>
                  </div>
                )}

                {investor.website && (
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a
                        href={investor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-emerald-600 break-all"
                      >
                        {investor.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}

                {investor.linkedin_url && (
                  <div className="flex items-start gap-3">
                    <Linkedin className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <a
                        href={investor.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-emerald-600"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  {investor.email && (
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <a href={`mailto:${investor.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  )}
                  {investor.website && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={investor.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Contact information is provided for informational purposes.
                  Always verify details independently before making investment decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
