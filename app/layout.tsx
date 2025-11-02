import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/sonner';
import { BackToTop } from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com'),
  title: {
    default: 'Transition Nexus Europe | European Clean Energy Forum',
    template: '%s | Transition Nexus Europe',
  },
  description: 'Connect projects, investors, and suppliers across Europe. Verify impact, navigate policy, and accelerate the clean energy transition with AI-powered tools.',
  keywords: ['clean energy', 'renewable energy', 'European energy', 'solar', 'wind', 'hydrogen', 'energy projects', 'energy investment', 'green energy', 'sustainable energy'],
  authors: [{ name: 'Transition Nexus Europe' }],
  creator: 'Transition Nexus Europe',
  publisher: 'Transition Nexus Europe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Transition Nexus Europe | European Clean Energy Forum',
    description: 'Where European energy projects meet capital and verified impact. AI-powered platform for clean energy investment.',
    type: 'website',
    locale: 'en_EU',
    siteName: 'Transition Nexus Europe',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Transition Nexus Europe - European Clean Energy Forum',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transition Nexus Europe | European Clean Energy Forum',
    description: 'Connect clean energy projects with investors across Europe. AI-powered policy guidance and smart matchmaking.',
    images: ['/og-image.png'],
    creator: '@TransitionNexus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
        <BackToTop />
      </body>
    </html>
  );
}
