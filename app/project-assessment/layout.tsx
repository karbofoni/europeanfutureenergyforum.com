import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Assessment | Transition Nexus Europe',
  description: 'Get instant due diligence analysis for your renewable energy project. Free AI-powered assessment identifies risks, compares benchmarks, and prepares you for investor conversations.',
};

// Force dynamic rendering for this page (client-side state)
export const dynamic = 'force-dynamic';

export default function ProjectAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
