import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/database';
import { ProjectsList } from '@/components/projects-list';
import { getShimmerDataURL } from '@/lib/image-blur';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Transition Nexus Europe',
  description: 'Browse renewable energy projects across Europe seeking investment and partnerships. Discover solar, wind, and battery storage opportunities with transparent data.',
  alternates: {
    canonical: './'
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-emerald-50 via-white to-slate-50 border-b">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Solar panels"
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
            <h1 className="text-4xl font-bold mb-4">Project Directory</h1>
            <p className="text-lg text-muted-foreground">
              Browse renewable energy projects across Europe. Each project displays transparent
              information about capacity, stage, and impact potential.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found. Check back soon.</p>
        </div>
      ) : (
        <ProjectsList projects={projects} />
      )}

        <div className="mt-12 p-6 bg-slate-50 rounded-lg border max-w-5xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> All project data is provided for informational purposes only.
            Verify details directly with project developers before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
