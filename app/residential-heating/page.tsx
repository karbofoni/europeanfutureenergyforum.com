import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Zap, TrendingDown, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Residential Heating Transition - Transition Nexus Europe',
  description: 'Understand the shift from traditional heating systems to renewable heat pumps and electrified heating solutions across Europe. Investment opportunities in decarbonization.',
  alternates: {
    canonical: './'
  }
};

export default function ResidentialHeatingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Residential Heating Transition
            </h1>
            <p className="text-xl text-muted-foreground">
              From traditional heating systems to renewable heat pumps: Understanding Europe's
              residential heating transformation and investment opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">The European Heating Challenge</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Residential heating accounts for approximately 25% of Europe's total energy consumption and represents
            one of the largest opportunities for decarbonization. As the continent transitions toward carbon neutrality
            by 2050, replacing fossil fuel-based heating systems with renewable alternatives has become a policy and
            investment priority.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This transformation involves not only technology replacement but also substantial infrastructure upgrades,
            behavioral changes, and multi-trillion euro investment across hundreds of millions of households.
          </p>
        </div>

        {/* Current Heating Landscape */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Current Heating Technologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Flame className="h-10 w-10 text-orange-600 mb-3" />
                <CardTitle>Traditional Heating Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Most European households currently rely on conventional heating technologies including
                  gas boilers, oil heaters, and traditional electric radiators.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Gas boilers (most common in Western Europe)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Oil-fired systems (rural areas, Eastern Europe)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Electric resistance heating (Nordic countries, France)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>District heating networks (urban areas)</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  While these systems offer proven reliability and lower upfront costs, they face increasing regulatory
                  pressure and rising fuel prices.{' '}
                  <a
                    href="https://www.nationalheatershops.co.uk/c/heating/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline inline-flex items-center gap-1"
                  >
                    Learn more about residential heating systems
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <Zap className="h-10 w-10 text-emerald-600 mb-3" />
                <CardTitle>Renewable Heat Pumps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Heat pumps are emerging as the primary replacement technology, leveraging renewable electricity
                  to provide efficient heating and cooling.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Air-source heat pumps (easiest to install)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Ground-source/geothermal (highest efficiency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Hybrid systems (combining heat pump + backup)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>High-temperature heat pumps (retrofits)</span>
                  </li>
                </ul>
                <p className="text-sm text-emerald-700">
                  Heat pumps typically deliver 3-5 units of heat per unit of electricity consumed, making them
                  significantly more efficient than traditional electric heating.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Heat Pumps?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <TrendingDown className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle className="text-lg">Emissions Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Up to 75% reduction in carbon emissions compared to gas boilers when powered by renewable electricity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle className="text-lg">Energy Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Coefficient of Performance (COP) of 3-5 means significantly lower energy consumption and operating costs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle className="text-lg">Energy Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reduced dependence on imported fossil fuels, increased energy independence with domestic electricity
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Investment Opportunity */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Investment Opportunity</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            The European residential heating transition represents a multi-trillion euro investment opportunity
            spanning 2025-2050:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-lg mb-2">Market Size</h3>
              <p className="text-sm text-muted-foreground">
                70+ million heat pump installations needed across European households by 2030 to meet climate targets
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-lg mb-2">Supporting Infrastructure</h3>
              <p className="text-sm text-muted-foreground">
                Grid upgrades, building retrofits, thermal storage, and smart energy management systems
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-lg mb-2">Policy Support</h3>
              <p className="text-sm text-muted-foreground">
                30-50% subsidies, carbon pricing on fossil fuels, and regulatory phase-outs creating strong tailwinds
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-lg mb-2">Technology Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Next-generation heat pumps, thermal storage, and heat-as-a-service business models
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-12 border">
          <h2 className="text-3xl font-bold mb-4">Explore Heating Transition Projects</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover investment opportunities in European residential heating electrification and
            renewable energy projects powering the transition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/blog/european-heating-transition-from-traditional-to-renewable">
              <Button size="lg" variant="outline">
                Read Full Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
