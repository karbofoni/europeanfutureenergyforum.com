'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Investors', href: '/investors' },
  { name: 'Suppliers', href: '/suppliers' },
  { name: 'Policy', href: '/policy' },
  { name: 'Grid', href: '/grid' },
  { name: 'Impact', href: '/impact' },
  { name: 'Events', href: '/events' },
  { name: 'Library', href: '/library' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-6 w-6 text-emerald-600" />
            <span>Transition Nexus Europe</span>
          </Link>

          <div className="hidden lg:flex lg:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-emerald-600',
                  pathname === item.href ? 'text-emerald-600' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/analytics" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">
            <Sparkles className="h-4 w-4" />
            AI Analytics
          </Link>
          <Link href="/about" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">
            About
          </Link>
          <Link href="/contact">
            <Button variant="default" size="sm" className="hidden md:flex">
              Contact Us
            </Button>
          </Link>

          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="container py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors',
                  pathname === item.href ? 'text-emerald-600' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="block py-2 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="default" size="sm" className="w-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
