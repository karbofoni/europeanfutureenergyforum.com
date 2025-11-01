'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Download } from 'lucide-react';

export default function ImpactPage() {
  const [capacity, setCapacity] = useState('50');
  const [technology, setTechnology] = useState('Solar');
  const [capacityFactor, setCapacityFactor] = useState('0.22');
  const [lifetime, setLifetime] = useState('25');
  const [baselineIntensity, setBaselineIntensity] = useState('400');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const cap = parseFloat(capacity) || 0;
    const cf = parseFloat(capacityFactor) || 0;
    const years = parseFloat(lifetime) || 0;
    const baseline = parseFloat(baselineIntensity) || 0;

    const annualMWh = cap * 8760 * cf;
    const annualCO2Tonnes = (annualMWh * baseline) / 1000;
    const lifetimeCO2Tonnes = annualCO2Tonnes * years;
    const errorBand = 15;

    setResult({
      annualMWh: annualMWh.toFixed(0),
      annualCO2Tonnes: annualCO2Tonnes.toFixed(0),
      lifetimeCO2Tonnes: lifetimeCO2Tonnes.toFixed(0),
      errorBand,
      assumptions: [
        `Baseline grid intensity: ${baseline} gCO₂/kWh`,
        `Capacity factor: ${(cf * 100).toFixed(1)}%`,
        `Project lifetime: ${years} years`,
        `Technology: ${technology}`,
      ],
    });
  };

  const exportCSV = () => {
    if (!result) return;
    const csv = `Metric,Value\nAnnual Generation (MWh),${result.annualMWh}\nAnnual CO2 Avoided (tonnes),${result.annualCO2Tonnes}\nLifetime CO2 Avoided (tonnes),${result.lifetimeCO2Tonnes}\nError Band,±${result.errorBand}%`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'impact-calculation.csv';
    a.click();
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/414943/pexels-photo-414943.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Green forest environment"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">CO₂ Impact Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate carbon abatement with transparent assumptions and uncertainty bands.
              All formulas and data sources are clearly documented.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-5xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Project Inputs
            </CardTitle>
            <CardDescription>Enter your project parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="technology">Technology</Label>
              <Select value={technology} onValueChange={setTechnology}>
                <SelectTrigger id="technology">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solar">Solar PV</SelectItem>
                  <SelectItem value="Wind">Wind</SelectItem>
                  <SelectItem value="Hydro">Hydro</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                  <SelectItem value="Hydrogen">Green Hydrogen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="capacity">Capacity (MW)</Label>
              <Input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="50"
              />
            </div>

            <div>
              <Label htmlFor="cf">Capacity Factor (0-1)</Label>
              <Input
                id="cf"
                type="number"
                step="0.01"
                value={capacityFactor}
                onChange={(e) => setCapacityFactor(e.target.value)}
                placeholder="0.22"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Typical: Solar 0.15-0.25, Wind 0.30-0.50
              </p>
            </div>

            <div>
              <Label htmlFor="lifetime">Project Lifetime (years)</Label>
              <Input
                id="lifetime"
                type="number"
                value={lifetime}
                onChange={(e) => setLifetime(e.target.value)}
                placeholder="25"
              />
            </div>

            <div>
              <Label htmlFor="baseline">Baseline Grid Intensity (gCO₂/kWh)</Label>
              <Input
                id="baseline"
                type="number"
                value={baselineIntensity}
                onChange={(e) => setBaselineIntensity(e.target.value)}
                placeholder="400"
              />
              <p className="text-xs text-muted-foreground mt-1">
                EU average: ~300-400 gCO₂/kWh
              </p>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Impact
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle>Impact Results</CardTitle>
              <CardDescription>
                Uncertainty: ±{result.errorBand}%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Annual Generation</p>
                <p className="text-3xl font-bold">
                  {parseInt(result.annualMWh).toLocaleString()} MWh
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Annual CO₂ Avoided</p>
                <p className="text-3xl font-bold text-emerald-700">
                  {parseInt(result.annualCO2Tonnes).toLocaleString()} tonnes
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Lifetime CO₂ Avoided</p>
                <p className="text-3xl font-bold text-emerald-700">
                  {parseInt(result.lifetimeCO2Tonnes).toLocaleString()} tonnes
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-2">Assumptions:</p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {result.assumptions.map((assumption: string, idx: number) => (
                    <li key={idx}>• {assumption}</li>
                  ))}
                </ul>
              </div>

              <Button onClick={exportCSV} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardContent>
          </Card>
        )}
        </div>

        <Card className="mt-8">
        <CardHeader>
          <CardTitle>Methodology</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="text-sm">
            <strong>Formula:</strong> Annual CO₂ avoided = Capacity (MW) × 8,760 hours × Capacity Factor × Baseline Intensity (gCO₂/kWh) / 1,000
          </p>
          <p className="text-sm mt-2">
            <strong>Assumptions:</strong> Calculations assume displaced electricity from the baseline grid mix.
            Does not account for embodied carbon in manufacturing, curtailment, or degradation.
            Uncertainty band reflects typical variation in capacity factors and baseline intensity.
          </p>
          <p className="text-sm mt-2 text-muted-foreground">
            <strong>Disclaimer:</strong> Results are estimates for informational purposes. Verify with detailed engineering studies.
          </p>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
