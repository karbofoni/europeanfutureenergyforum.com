import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Project Health Check | Transition Nexus Europe',
  description: 'Get instant due diligence analysis for your renewable energy project. Free AI-powered health check identifies risks, compares benchmarks, and prepares you for investor conversations.',
};

export default function HealthCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
