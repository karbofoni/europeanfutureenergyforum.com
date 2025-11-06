'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Supplier } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { EmptyState } from './empty-state';

interface SuppliersListProps {
  suppliers: Supplier[];
}

const roleColors: Record<string, string> = {
  EPC: 'bg-blue-100 text-blue-800',
  OEM: 'bg-purple-100 text-purple-800',
  Consulting: 'bg-green-100 text-green-800',
};

export function SuppliersList({ suppliers }: SuppliersListProps) {
  const [filters, setFilters] = useState({
    role: 'All',
    technology: 'All',
    search: '',
  });

  const handleReset = () => {
    setFilters({ role: 'All', technology: 'All', search: '' });
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesRole = filters.role === 'All' || supplier.role === filters.role;
      const matchesTech = filters.technology === 'All' ||
        supplier.technologies.includes(filters.technology);
      const matchesSearch = filters.search === '' ||
        supplier.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.summary.toLowerCase().includes(filters.search.toLowerCase());

      return matchesRole && matchesTech && matchesSearch;
    });
  }, [suppliers, filters]);

  const hasActiveFilters = filters.role !== 'All' || filters.technology !== 'All' || filters.search !== '';

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
              placeholder="Search suppliers..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={filters.role} onValueChange={(value) => setFilters({ ...filters, role: value })}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="EPC">EPC</SelectItem>
                <SelectItem value="OEM">OEM</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="technology">Technology</Label>
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
                <SelectItem value="Grid">Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredSuppliers.length} of {suppliers.length} suppliers
        </p>
      </div>

      {filteredSuppliers.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No suppliers found"
          description="No suppliers match your current filters. Try adjusting your search criteria or clearing filters to see more options."
          action={{
            label: "Clear all filters",
            onClick: handleReset
          }}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
              <Card className="transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Building2 className="h-8 w-8 text-emerald-600" />
                    <Badge className={roleColors[supplier.role]}>{supplier.role}</Badge>
                  </div>
                  <CardTitle className="text-xl">{supplier.name}</CardTitle>
                  <CardDescription>{supplier.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supplier.capacity_mw_py && (
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Capacity</p>
                        <p className="font-medium">{supplier.capacity_mw_py} MW/year</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-1">
                        {supplier.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{supplier.geographies.slice(0, 3).join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
