/**
 * JSON-LD Structured Data Component
 * Provides rich snippets for search engines
 */

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Transition Nexus Europe',
    alternateName: 'European Future Energy Forum',
    url: 'https://transition-nexus-europe.com',
    logo: 'https://transition-nexus-europe.com/og-image.png',
    description:
      'European clean energy forum connecting renewable energy projects with investors and suppliers. AI-powered platform for solar, wind, hydrogen, and battery storage projects.',
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/TransitionNexus',
      'https://www.linkedin.com/company/transition-nexus-europe',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
    areaServed: {
      '@type': 'Place',
      name: 'Europe',
    },
    industry: 'Renewable Energy',
    keywords:
      'clean energy, renewable energy, solar energy, wind energy, hydrogen, battery storage, energy investment, European energy projects',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Transition Nexus Europe',
    url: 'https://transition-nexus-europe.com',
    description:
      'European clean energy forum connecting projects, investors, and suppliers. AI-powered tools for policy guidance, grid connections, and smart matchmaking.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://transition-nexus-europe.com/projects?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
