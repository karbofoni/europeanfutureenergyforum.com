import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrganizationSchema } from '@/components/json-ld';
import { getShimmerDataURL } from '@/lib/image-blur';
import {
  ArrowRight,
  Zap,
  Users,
  Target,
  FileText,
  Calculator,
  Calendar,
  Shield,
  Database,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Wind turbines and solar panels"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={getShimmerDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>
        <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Badge variant="outline" className="mb-4">
            Independent Initiative
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Where European energy projects meet capital and verified impact
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect projects, investors, and suppliers across Europe. Navigate policy, verify impact, and accelerate the clean energy transition with transparent data and AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/projects">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/investors">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Investor Mandates
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Add Your Project
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </section>

      <section className="relative border-y py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-slate-50 to-blue-50" />
        <div className="relative z-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Transparent Methodology</h3>
                <p className="text-sm text-muted-foreground">
                  Every impact calculation shows assumptions, uncertainty bands, and clear formulas. No black boxes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Database className="h-8 w-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Open Data</h3>
                <p className="text-sm text-muted-foreground">
                  All project data, policy briefs, and grid timelines are openly accessible and exportable.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Independent Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Not affiliated with any brands or events. Built to serve the European energy community.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl" />
        </div>
        <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate complexity with intelligent tools that provide clear recommendations and transparent reasoning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Target className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>AI Matchmaker</CardTitle>
              <CardDescription>
                Find the best matches between projects, investors, and suppliers with transparent scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/projects">
                <Button variant="ghost" className="w-full">
                  Try Matchmaker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <FileText className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>Policy Copilot</CardTitle>
              <CardDescription>
                Plain-English answers about EU and member-state permitting, incentives, and eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/policy">
                <Button variant="ghost" className="w-full">
                  Open Copilot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Zap className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>Grid Estimator</CardTitle>
              <CardDescription>
                Estimate interconnection timelines and get step-by-step checklists by country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/grid">
                <Button variant="ghost" className="w-full">
                  Estimate Timeline
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Calculator className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>Impact Verifier</CardTitle>
              <CardDescription>
                Calculate CO₂ abatement with clear assumptions and export detailed reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/impact">
                <Button variant="ghost" className="w-full">
                  Calculate Impact
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Calendar className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>Event Scheduler</CardTitle>
              <CardDescription>
                Build personalized agendas and get smart 1:1 meeting recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/events">
                <Button variant="ghost" className="w-full">
                  Plan Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Users className="h-10 w-10 text-emerald-600 mb-2" />
              <CardTitle>Network Directory</CardTitle>
              <CardDescription>
                Browse verified projects, investor mandates, and supplier capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/suppliers">
                <Button variant="ghost" className="w-full">
                  View Directory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      <section className="relative border-t py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Solar farm landscape"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/90" />
        </div>
        <div className="relative z-10">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for the European Energy Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're developing a solar farm in Spain, seeking project finance for offshore wind,
              or supplying green hydrogen technology, Transition Nexus Europe connects you with the right
              partners and information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More About Us
                </Button>
              </Link>
              <Link href="/library">
                <Button size="lg" variant="outline">
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
    </>
  );
}
