import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { getBlogPosts } from '@/lib/blog-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/investors`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/suppliers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/policy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/grid`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/residential-heating`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/project-assessment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/brand-use`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Fetch dynamic library items
  const { data: libraryItems } = await supabase
    .from('library_items')
    .select('id, published_at')
    .order('published_at', { ascending: false });

  const libraryPages: MetadataRoute.Sitemap = (libraryItems || []).map((item) => ({
    url: `${baseUrl}/library/${item.id}`,
    lastModified: item.published_at ? new Date(item.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch dynamic investors
  const { data: investors } = await supabase
    .from('investors')
    .select('id, updated_at')
    .order('created_at', { ascending: false });

  const investorPages: MetadataRoute.Sitemap = (investors || []).map((item) => ({
    url: `${baseUrl}/investors/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch dynamic suppliers
  const { data: suppliers } = await supabase
    .from('suppliers')
    .select('id, updated_at')
    .order('created_at', { ascending: false });

  const supplierPages: MetadataRoute.Sitemap = (suppliers || []).map((item) => ({
    url: `${baseUrl}/suppliers/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch blog posts
  const blogPosts = getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Combine all pages
  return [...staticPages, ...libraryPages, ...investorPages, ...supplierPages, ...blogPages];
}
