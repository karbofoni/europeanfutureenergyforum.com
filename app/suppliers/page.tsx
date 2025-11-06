import Image from 'next/image';
import { getShimmerDataURL } from '@/lib/image-blur';
import { supabase } from '@/lib/supabase';
import { Supplier } from '@/types/database';
import { SuppliersList } from '@/components/suppliers-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suppliers | Transition Nexus Europe',
  description: 'Find EPCs, OEMs, and consultants for renewable energy projects. Connect with vetted equipment manufacturers and engineering firms across Europe.',
  alternates: {
    canonical: './'
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getSuppliers(): Promise<Supplier[]> {
  const { data } = await supabase
    .from('suppliers')
    .select('*')
    .order('created_at', { ascending: false});
  return data || [];
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-slate-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Construction equipment"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={getShimmerDataURL()}
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
        {suppliers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No suppliers found. Check back soon.</p>
          </div>
        ) : (
          <SuppliersList suppliers={suppliers} />
        )}
      </div>
    </div>
  );
}
