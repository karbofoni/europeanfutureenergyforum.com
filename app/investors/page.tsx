import { supabase } from '@/lib/supabase';
import { Investor } from '@/types/database';
import { InvestorsList } from '@/components/investors-list';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investors | Transition Nexus Europe',
  description: 'Connect with investors seeking renewable energy projects across Europe',
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getInvestors(): Promise<Investor[]> {
  const { data, error } = await supabase
    .from('investors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching investors:', error);
    return [];
  }

  return data || [];
}

export default async function InvestorsPage() {
  const investors = await getInvestors();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Business collaboration"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Investor Directory</h1>
            <p className="text-lg text-muted-foreground">
              Browse investor mandates for renewable energy projects. Find capital partners
              aligned with your project stage, technology, and geography.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

      {investors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No investors found. Check back soon.</p>
        </div>
      ) : (
        <InvestorsList investors={investors} />
      )}

        <div className="mt-12 p-6 bg-slate-50 rounded-lg border max-w-5xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Investor information is for informational purposes only.
            Not financial or investment advice. Conduct proper due diligence.
          </p>
        </div>
      </div>
    </div>
  );
}
