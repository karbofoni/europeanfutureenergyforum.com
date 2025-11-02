'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export function PolicyCopilot() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: 'ES',
    technology: 'Solar',
    size_mw: '50',
    question: '',
  });
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: formData.country,
          technology: formData.technology,
          size_mw: parseFloat(formData.size_mw),
          question: formData.question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResult(data);
      toast.success('Policy guidance generated!');
    } catch (error: any) {
      console.error('Policy Copilot error:', error);
      toast.error(error.message || 'Failed to generate guidance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            Ask Policy Copilot
          </CardTitle>
          <CardDescription>
            Get AI-powered guidance on renewable energy policy, permitting, and incentives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ES">Spain</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="IT">Italy</SelectItem>
                    <SelectItem value="PT">Portugal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="technology">Technology</Label>
                <Select value={formData.technology} onValueChange={(value) => setFormData({ ...formData, technology: value })}>
                  <SelectTrigger id="technology">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solar">Solar</SelectItem>
                    <SelectItem value="Wind">Wind</SelectItem>
                    <SelectItem value="Storage">Storage</SelectItem>
                    <SelectItem value="Hydro">Hydro</SelectItem>
                    <SelectItem value="Hydrogen">Hydrogen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="size">Project Size (MW)</Label>
              <Input
                id="size"
                type="number"
                value={formData.size_mw}
                onChange={(e) => setFormData({ ...formData, size_mw: e.target.value })}
                placeholder="50"
              />
            </div>

            <div>
              <Label htmlFor="question">Your Question</Label>
              <Textarea
                id="question"
                rows={4}
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="e.g., What are the key permitting steps? What incentives are available? How long does the process take?"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating guidance...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Guidance
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-36" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded">
                    <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Policy Guidance</CardTitle>
              {result.powered_by && (
                <Badge variant="outline" className="w-fit">
                  Powered by {result.powered_by}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.answer}</p>
              </div>

              {result.disclaimer && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-900">{result.disclaimer}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {result.checklist && result.checklist.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Action Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.checklist.map((item: any) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 bg-slate-50 rounded">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.task}</p>
                        <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                          <span>📅 {item.deadline}</span>
                          <span>🏛️ {item.agency}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {result.citations && result.citations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.citations.map((citation: any, index: number) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{citation.title}</p>
                      <p className="text-xs text-muted-foreground">{citation.relevance}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
