'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, TrendingUp, Activity } from 'lucide-react';
import { ProjectFilters } from './project-filters';
import { AIMatchmakerDrawer } from './ai-matchmaker-drawer';

interface ProjectsListProps {
  projects: Project[];
}

const stageColors: Record<string, string> = {
  Feasibility: 'bg-blue-100 text-blue-800',
  Permitting: 'bg-yellow-100 text-yellow-800',
  Construction: 'bg-orange-100 text-orange-800',
  Operational: 'bg-emerald-100 text-emerald-800',
};

const techIcons: Record<string, any> = {
  Solar: Zap,
  Wind: Activity,
  Storage: TrendingUp,
  Hydro: Activity,
  Hydrogen: Zap,
  Efficiency: TrendingUp,
};

export function ProjectsList({ projects }: ProjectsListProps) {
  const [filters, setFilters] = useState({
    country: 'All',
    technology: 'All',
    stage: 'All',
    search: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      country: 'All',
      technology: 'All',
      stage: 'All',
      search: '',
    });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCountry = filters.country === 'All' || project.country === filters.country;
      const matchesTechnology = filters.technology === 'All' || project.technology === filters.technology;
      const matchesStage = filters.stage === 'All' || project.stage === filters.stage;
      const matchesSearch = filters.search === '' ||
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.summary.toLowerCase().includes(filters.search.toLowerCase());

      return matchesCountry && matchesTechnology && matchesStage && matchesSearch;
    });
  }, [projects, filters]);

  return (
    <>
      <ProjectFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects match your filters. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const Icon = techIcons[project.technology] || Zap;
            return (
              <Card key={project.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="h-8 w-8 text-emerald-600" />
                    <Badge className={stageColors[project.stage] || ''}>
                      {project.stage}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{project.country}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Technology</p>
                        <p className="font-medium">{project.technology}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Capacity</p>
                        <p className="font-medium">{project.size_mw} MW</p>
                      </div>
                    </div>
                    {project.grid_status && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">Grid Status</p>
                        <p className="font-medium text-xs">{project.grid_status}</p>
                      </div>
                    )}
                    {project.capex_eur && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">CAPEX</p>
                        <p className="font-medium">
                          €{(project.capex_eur / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 pt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      <AIMatchmakerDrawer project={project} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
