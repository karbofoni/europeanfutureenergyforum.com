export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Transition Nexus Europe',
    description: 'Independent platform connecting European clean energy projects, investors, and suppliers',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com'}/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
  };

  return <JsonLd data={schema} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
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

  return <JsonLd data={schema} />;
}

export function ItemListSchema({ items, listType }: { items: any[]; listType: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listType,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 10).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title || item.name,
    })),
  };

  return <JsonLd data={schema} />;
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  imageUrl,
  authorName = 'Transition Nexus Europe',
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  authorName?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title.substring(0, 110), // Max 110 chars for headline
    description: description,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Transition Nexus Europe',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    }),
  };

  return <JsonLd data={schema} />;
}
