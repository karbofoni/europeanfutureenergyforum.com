'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { GlossaryTerm } from './glossary-term';
import { Loader2, Zap, Clock, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface GridEstimatorProps {
  countries: string[];
}

export function GridEstimator({ countries }: GridEstimatorProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    country: '',
    technology: 'Solar',
    size_mw: 50,
    interconnection_type: 'Distribution',
    has_ppa: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.country) {
      toast.error('Please select a country');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/grid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to estimate timeline');
      }

      const data = await response.json();
      setResult(data);
      toast.success('Timeline estimated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to estimate timeline');
      console.error('Grid estimator error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">AI Grid Timeline Estimator</CardTitle>
              <CardDescription>
                Get AI-powered estimates for your grid connection timeline
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technology">Technology</Label>
                <Select
                  value={formData.technology}
                  onValueChange={(value) => setFormData({ ...formData, technology: value })}
                >
                  <SelectTrigger id="technology">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solar">Solar</SelectItem>
                    <SelectItem value="Wind">Wind</SelectItem>
                    <SelectItem value="Storage">Battery Storage</SelectItem>
                    <SelectItem value="Hydro">Hydro</SelectItem>
                    <SelectItem value="Hydrogen">Hydrogen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size_mw">
                  Capacity (<GlossaryTerm term="MW">MW</GlossaryTerm>)
                </Label>
                <Input
                  id="size_mw"
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.size_mw}
                  onChange={(e) => setFormData({ ...formData, size_mw: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interconnection_type">Grid Level</Label>
                <Select
                  value={formData.interconnection_type}
                  onValueChange={(value) => setFormData({ ...formData, interconnection_type: value })}
                >
                  <SelectTrigger id="interconnection_type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Distribution">Distribution</SelectItem>
                    <SelectItem value="Transmission">Transmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="has_ppa"
                checked={formData.has_ppa}
                onChange={(e) => setFormData({ ...formData, has_ppa: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="has_ppa" className="font-normal cursor-pointer">
                Project has <GlossaryTerm term="PPA">Power Purchase Agreement (PPA)</GlossaryTerm>
              </Label>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Estimate Timeline
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && (
        <Card className="border-2 border-emerald-200">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-8 w-40" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Skeleton className="h-5 w-56 mb-3" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-5 w-44 mb-3" />
              <div className="grid md:grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-2 border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-600" />
              Estimated Timeline
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg px-4 py-1">
                {result.range_months[0]}-{result.range_months[1]} months
              </Badge>
              {result.powered_by && (
                <Badge variant="outline" className="text-xs">
                  Powered by {result.powered_by}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Connection Process Steps
              </h3>
              <div className="space-y-3">
                {result.steps.map((step: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{step.name}</h4>
                      <Badge variant="secondary">{step.duration_months} months</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Required Documents
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.documents.map((doc: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            {result.notes && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-amber-900 mb-1">Key Considerations</p>
                    <p className="text-sm text-amber-800">{result.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {result.disclaimer && (
              <p className="text-xs text-muted-foreground border-t pt-4">
                {result.disclaimer}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
