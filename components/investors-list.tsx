'use client';

import { useState, useMemo } from 'react';
import { Investor } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Globe, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { EmptyState } from './empty-state';
import { GlossaryTerm } from './glossary-term';

interface InvestorsListProps {
  investors: Investor[];
}

export function InvestorsList({ investors }: InvestorsListProps) {
  const [filters, setFilters] = useState({
    mandateType: 'All',
    technology: 'All',
    search: '',
  });

  const handleReset = () => {
    setFilters({ mandateType: 'All', technology: 'All', search: '' });
  };

  const filteredInvestors = useMemo(() => {
    return investors.filter((investor) => {
      const matchesMandate = filters.mandateType === 'All' ||
        investor.mandate_types.includes(filters.mandateType as any);
      const matchesTech = filters.technology === 'All' ||
        investor.tech_focus.includes(filters.technology);
      const matchesSearch = filters.search === '' ||
        investor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        investor.summary.toLowerCase().includes(filters.search.toLowerCase());

      return matchesMandate && matchesTech && matchesSearch;
    });
  }, [investors, filters]);

  const hasActiveFilters = filters.mandateType !== 'All' || filters.technology !== 'All' || filters.search !== '';

  return (
    <>
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search investors..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="mandate">Mandate Type</Label>
            <Select value={filters.mandateType} onValueChange={(value) => setFilters({ ...filters, mandateType: value })}>
              <SelectTrigger id="mandate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Equity">Equity</SelectItem>
                <SelectItem value="Project Finance">Project Finance</SelectItem>
                <SelectItem value="Mezz">Mezz</SelectItem>
                <SelectItem value="Grants">Grants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="technology">Technology Focus</Label>
            <Select value={filters.technology} onValueChange={(value) => setFilters({ ...filters, technology: value })}>
              <SelectTrigger id="technology">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Solar">Solar</SelectItem>
                <SelectItem value="Wind">Wind</SelectItem>
                <SelectItem value="Storage">Storage</SelectItem>
                <SelectItem value="Hydro">Hydro</SelectItem>
                <SelectItem value="Hydrogen">Hydrogen</SelectItem>
                <SelectItem value="Efficiency">Efficiency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredInvestors.length} of {investors.length} investors
        </p>
      </div>

      {filteredInvestors.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No investors found"
          description="No investors match your current filters. Try adjusting your search criteria or clearing filters to see more investment opportunities."
          action={{
            label: "Clear all filters",
            onClick: handleReset
          }}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredInvestors.map((investor) => (
            <Card key={investor.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{investor.name}</CardTitle>
                <CardDescription>{investor.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <GlossaryTerm term="Ticket Size">Ticket Size</GlossaryTerm>
                      </p>
                      <p className="font-medium">
                        €{(investor.ticket_min_eur / 1000000).toFixed(1)}M - €
                        {(investor.ticket_max_eur / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>

                  {investor.irr_target && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <GlossaryTerm term="IRR">Target IRR</GlossaryTerm>
                      </p>
                      <p className="font-medium">{investor.irr_target}%</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <GlossaryTerm term="Mandate Types">Mandate Types</GlossaryTerm>
                    </p>
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

                  <div className="flex items-center gap-2 pt-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{investor.geographies.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
