import Image from 'next/image';
import { getShimmerDataURL } from '@/lib/image-blur';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Shield, Database } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Transition Nexus Europe',
  description: 'Learn about our mission to accelerate the European clean energy transition',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Team collaboration"
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
            <h1 className="text-4xl font-bold mb-4">About Transition Nexus Europe</h1>
            <p className="text-xl text-muted-foreground">
              An independent platform connecting European clean energy projects, investors, and suppliers
              with transparent data and AI-powered tools.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-4xl mx-auto">

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            Founded in 2025, Transition Nexus Europe was created to address a critical gap in the European
            clean energy ecosystem: the lack of a transparent, data-driven platform that connects projects
            with capital and expertise while providing clear insights into policy, grid realities, and impact.
          </p>
          <p>
            We believe that accelerating the energy transition requires more than ambition—it demands accessible
            information, transparent methodologies, and intelligent tools that help stakeholders navigate complexity.
          </p>
          <p>
            Our platform serves developers, investors, suppliers, and policymakers by providing:
          </p>
          <ul>
            <li>Verified project and investment opportunity data</li>
            <li>Plain-English policy and permitting guides</li>
            <li>Grid interconnection timelines and processes</li>
            <li>Transparent impact calculations with clear assumptions</li>
            <li>AI-powered matching and decision support tools</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <Target className="h-8 w-8 text-emerald-600 mb-2" />
            <CardTitle>What We Do</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Connect renewable energy projects with investors and suppliers</li>
              <li>• Demystify EU and member-state energy policy</li>
              <li>• Provide transparent impact verification methodologies</li>
              <li>• Offer AI-powered tools for matching and analysis</li>
              <li>• Curate plain-English resources and case studies</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-emerald-600 mb-2" />
            <CardTitle>Who We Serve</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Project developers seeking capital or partners</li>
              <li>• Investors looking for vetted opportunities</li>
              <li>• Equipment suppliers and service providers</li>
              <li>• Policy researchers and analysts</li>
              <li>• Anyone navigating the European energy landscape</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-emerald-600 mb-2" />
            <CardTitle>Our Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Transparency:</strong> All methodologies and assumptions are clearly documented</li>
              <li>• <strong>Independence:</strong> Not affiliated with any commercial entity or event organizer</li>
              <li>• <strong>Accuracy:</strong> Data is sourced from official and verifiable references</li>
              <li>• <strong>Accessibility:</strong> Complex information presented in plain language</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-emerald-600 mb-2" />
            <CardTitle>Open Data Commitment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              We believe in open access to clean energy data. All project listings, policy briefs,
              and grid timelines are publicly accessible.
            </p>
            <p className="text-sm">
              Impact calculations include full methodology disclosure with exportable results.
              No paywalls for core information.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Transition Nexus Europe is an independent initiative.</strong> We are not affiliated
            with any third-party brands, events, or commercial organizations.
          </p>
          <p>
            All information on this platform is provided for informational purposes only and does not
            constitute financial, legal, or investment advice. Users should conduct their own due diligence
            and consult appropriate professionals before making decisions.
          </p>
          <p>
            While we strive for accuracy, we cannot guarantee the completeness or timeliness of all data.
            Always verify critical information with official sources and project stakeholders.
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
