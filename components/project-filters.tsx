'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProjectFiltersProps {
  filters: {
    country: string;
    technology: string;
    stage: string;
    search: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

const countries = ['All', 'ES', 'DE', 'FR', 'AT', 'IT', 'PT', 'NL', 'BE', 'PL', 'SE', 'DK'];
const technologies = ['All', 'Solar', 'Wind', 'Storage', 'Hydro', 'Hydrogen', 'Efficiency'];
const stages = ['All', 'Feasibility', 'Permitting', 'Construction', 'Operational'];

export function ProjectFilters({ filters, onFilterChange, onReset }: ProjectFiltersProps) {
  const hasActiveFilters = filters.country !== 'All' || filters.technology !== 'All' ||
                          filters.stage !== 'All' || filters.search !== '';

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select value={filters.country} onValueChange={(value) => onFilterChange('country', value)}>
            <SelectTrigger id="country">
              <SelectValue />
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

        <div>
          <Label htmlFor="technology">Technology</Label>
          <Select value={filters.technology} onValueChange={(value) => onFilterChange('technology', value)}>
            <SelectTrigger id="technology">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {technologies.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="stage">Stage</Label>
          <Select value={filters.stage} onValueChange={(value) => onFilterChange('stage', value)}>
            <SelectTrigger id="stage">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.country !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                Country: {filters.country}
                <button
                  onClick={() => onFilterChange('country', 'All')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  aria-label="Remove country filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.technology !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                Technology: {filters.technology}
                <button
                  onClick={() => onFilterChange('technology', 'All')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  aria-label="Remove technology filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.stage !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                Stage: {filters.stage}
                <button
                  onClick={() => onFilterChange('stage', 'All')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  aria-label="Remove stage filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: "{filters.search}"
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
