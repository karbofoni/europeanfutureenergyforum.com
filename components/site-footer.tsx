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
    { name: 'Residential Heating', href: '/residential-heating' },
    { name: 'Impact Calculator', href: '/impact' },
    { name: 'Library', href: '/library' },
    { name: 'Blog', href: '/blog' },
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

const relatedTechnologies = [
  { name: 'European Heat Pump Association', href: 'https://www.ehpa.org/', external: true },
  { name: 'Solar Power Europe', href: 'https://www.solarpowereurope.org/', external: true },
  { name: 'WindEurope', href: 'https://windeurope.org/', external: true },
  { name: 'Residential Heating Systems', href: 'https://www.nationalheatershops.co.uk/c/heating/', external: true },
  { name: 'Energy Storage Europe', href: 'https://www.energystorageeurope.org/', external: true },
  { name: 'Smart Energy Europe', href: 'https://www.smarten.eu/', external: true },
  { name: 'IEA Energy Efficiency Hub', href: 'https://www.iea.org/topics/energy-efficiency', external: true },
];

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

        {/* Related Technologies Section */}
        <div className="mb-8 pb-8 border-b">
          <h3 className="font-semibold mb-4 text-sm">Related Technologies & Resources</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {relatedTechnologies.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
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
