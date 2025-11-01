import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Projects', href: '/projects' },
    { name: 'Investors', href: '/investors' },
    { name: 'Suppliers', href: '/suppliers' },
    { name: 'Events', href: '/events' },
  ],
  Resources: [
    { name: 'Policy Briefs', href: '/policy' },
    { name: 'Grid Guide', href: '/grid' },
    { name: 'Impact Calculator', href: '/impact' },
    { name: 'Library', href: '/library' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Brand Use', href: '/legal/brand-use' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold">Transition Nexus Europe</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} Transition Nexus Europe. All rights reserved.
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
            Transition Nexus Europe is an independent initiative. No affiliation with any third-party brands or events.
          </p>
        </div>
      </div>
    </footer>
  );
}
