import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Supplier } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Phone, ExternalLink, Linkedin, Building2, User, ArrowLeft, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getSupplier(id: string): Promise<Supplier | null> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supplier = await getSupplier(params.id);

  if (!supplier) {
    return {
      title: 'Supplier Not Found | Transition Nexus Europe',
    };
  }

  return {
    title: `${supplier.name} | Suppliers | Transition Nexus Europe`,
    description: supplier.summary,
    alternates: {
      canonical: `.`
    }
  };
}

export default async function SupplierDetailPage({ params }: { params: { id: string } }) {
  const supplier = await getSupplier(params.id);

  if (!supplier) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
        <div className="container py-8">
          <Link href="/suppliers" className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Suppliers
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-start gap-4 mb-4">
              <div>
                <Badge className="mb-2">{supplier.role}</Badge>
                <h1 className="text-4xl font-bold">{supplier.name}</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{supplier.summary}</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle>Capabilities & Expertise</CardTitle>
                <CardDescription>Technical specifications and service areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {supplier.capacity_mw_py && (
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Capacity</p>
                      <p className="text-lg font-semibold">{supplier.capacity_mw_py} MW/year</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service Regions</p>
                    <p className="font-medium">{supplier.geographies.join(', ')}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credentials */}
            {supplier.credentials && supplier.credentials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Credentials</CardTitle>
                  <CardDescription>Industry certifications and accreditations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {supplier.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <Award className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{cred.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {cred.issuer} • {cred.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supplier.headquarters && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Headquarters</p>
                      <p className="font-medium">{supplier.headquarters}</p>
                    </div>
                  </div>
                )}

                {supplier.contact_person && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium">{supplier.contact_person}</p>
                    </div>
                  </div>
                )}

                {supplier.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${supplier.email}`} className="font-medium hover:text-emerald-600 break-all">
                        {supplier.email}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${supplier.phone}`} className="font-medium hover:text-emerald-600">
                        {supplier.phone}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.website && (
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a
                        href={supplier.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-emerald-600 break-all"
                      >
                        {supplier.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.linkedin_url && (
                  <div className="flex items-start gap-3">
                    <Linkedin className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <a
                        href={supplier.linkedin_url}
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
                  {supplier.email && (
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <a href={`mailto:${supplier.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  )}
                  {supplier.website && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={supplier.website} target="_blank" rel="noopener noreferrer">
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
                  Always verify supplier credentials and references independently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
