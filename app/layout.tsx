import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com'),
  title: 'Transition Nexus Europe | European Clean Energy Forum',
  description: 'Connect projects, investors, and suppliers across Europe. Verify impact, navigate policy, and accelerate the clean energy transition.',
  keywords: 'clean energy, renewable energy, European energy, solar, wind, hydrogen, energy projects, energy investment',
  authors: [{ name: 'Transition Nexus Europe' }],
  openGraph: {
    title: 'Transition Nexus Europe',
    description: 'Where European energy projects meet capital and verified impact.',
    type: 'website',
    locale: 'en_EU',
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
      </body>
    </html>
  );
}
