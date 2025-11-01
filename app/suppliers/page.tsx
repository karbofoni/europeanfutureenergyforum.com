import { supabase } from '@/lib/supabase';
import { Supplier } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suppliers | Transition Nexus Europe',
  description: 'Find EPCs, OEMs, and consultants for renewable energy projects',
};

export const revalidate = 60;

async function getSuppliers(): Promise<Supplier[]> {
  const { data } = await supabase
    .from('suppliers')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

const roleColors: Record<string, string> = {
  EPC: 'bg-blue-100 text-blue-800',
  OEM: 'bg-purple-100 text-purple-800',
  Consulting: 'bg-green-100 text-green-800',
};

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-slate-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Construction equipment"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Supplier Directory</h1>
            <p className="text-lg text-muted-foreground">
              Connect with EPCs, equipment manufacturers, and consultants supporting renewable energy projects.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="transition-all hover:shadow-lg">
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
        ))}
        </div>
      </div>
    </div>
  );
}
