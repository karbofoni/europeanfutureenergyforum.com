'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const routeNames: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/investors': 'Investors',
  '/suppliers': 'Suppliers',
  '/policy': 'Policy',
  '/grid': 'Grid Guide',
  '/impact': 'Impact',
  '/events': 'Events',
  '/library': 'Library',
  '/about': 'About',
  '/contact': 'Contact',
  '/ai-analytics': 'AI Analytics',
};

export function Breadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumb on homepage
  if (pathname === '/') {
    return null;
  }

  // Split pathname into segments
  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', path: '/', isHome: true },
  ];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbItems.push({ name, path: currentPath, isHome: false });
  });

  return (
    <nav aria-label="Breadcrumb" className="py-3 border-b bg-slate-50/50">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.isHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {item.isHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
