'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Target, TrendingUp, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Project } from '@/types/database';

interface AIMatchmakerDrawerProps {
  project: Project;
  trigger?: React.ReactNode;
}

export function AIMatchmakerDrawer({ project, trigger }: AIMatchmakerDrawerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const findMatches = async () => {
    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: 'project',
          entityId: project.id,
          filters: {},
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to find matches');
      }

      setMatches(data.matches || []);

      if (data.matches && data.matches.length > 0) {
        toast.success(`Found ${data.matches.length} potential matches!`);
      } else {
        toast.info('No matches found. Try adjusting filters.');
      }
    } catch (error: any) {
      console.error('Matchmaker error:', error);
      setError(error.message || 'Failed to find matches');
      toast.error('Failed to find matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && matches.length === 0 && !loading) {
      findMatches();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="w-full">
            <Target className="h-4 w-4 mr-2" />
            Find Investors
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            AI Investor Matches
          </SheetTitle>
          <SheetDescription>
            AI-powered matching for <strong>{project.title}</strong>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <Card className="bg-slate-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Technology:</span>
                <Badge variant="secondary">{project.technology}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{project.size_mw} MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stage:</span>
                <Badge variant="outline">{project.stage}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium">{project.country}</span>
              </div>
            </CardContent>
          </Card>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-sm text-muted-foreground">Analyzing compatibility with investors...</p>
              <p className="text-xs text-muted-foreground">Using AI semantic matching</p>
            </div>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-900">Error finding matches</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={findMatches}
                      className="mt-3"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && !error && matches.length === 0 && (
            <div className="text-center py-12">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Click "Find Matches" to discover potential investors</p>
            </div>
          )}

          {matches.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Top Matches</h3>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </Badge>
              </div>

              <div className="space-y-4">
                {matches.map((match) => (
                  <Card key={match.id} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{match.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {match.entity.summary}
                          </CardDescription>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-emerald-600">
                            {match.score}
                          </div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-3">Why this match?</p>
                        <div className="space-y-2">
                          {match.reasons.map((reason: any, idx: number) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{reason.factor}</span>
                                <span className="font-medium">{reason.score}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-600 transition-all"
                                  style={{ width: `${reason.score}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">{reason.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-muted-foreground text-xs">Ticket Size</p>
                            <p className="font-medium">
                              €{(match.entity.ticket_min_eur / 1000000).toFixed(0)}-
                              {(match.entity.ticket_max_eur / 1000000).toFixed(0)}M
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-muted-foreground text-xs">Geographies</p>
                            <p className="font-medium text-xs">
                              {match.entity.geographies.slice(0, 3).join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {match.entity.mandate_types.map((type: string) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900">
                      These matches are AI-powered suggestions for informational purposes only.
                      Conduct thorough due diligence before engaging with any investor.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
