import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LibraryItem } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArticleSchema } from '@/components/json-ld';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getLibraryItem(id: string): Promise<LibraryItem | null> {
  const { data, error } = await supabase
    .from('library_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = await getLibraryItem(params.id);

  if (!item) {
    return {
      title: 'Article Not Found | Transition Nexus Europe',
    };
  }

  return {
    title: `${item.title} | Library | Transition Nexus Europe`,
    description: item.summary,
    alternates: {
      canonical: `.`
    }
  };
}

const typeColors: Record<string, string> = {
  Brief: 'bg-blue-100 text-blue-800',
  Report: 'bg-purple-100 text-purple-800',
  'Case Study': 'bg-green-100 text-green-800',
};

export default async function LibraryItemDetailPage({ params }: { params: { id: string } }) {
  const item = await getLibraryItem(params.id);

  if (!item) {
    notFound();
  }

  const publishedDate = new Date(item.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com';

  return (
    <>
      <ArticleSchema
        title={item.title}
        description={item.summary}
        datePublished={item.published_at}
        dateModified={item.updated_at || item.published_at}
        url={`${baseUrl}/library/${item.id}`}
        imageUrl={`${baseUrl}/og-image.png`}
      />
      <div className="min-h-screen">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 border-b">
        <div className="container py-8">
          <Link href="/library" className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Library
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={typeColors[item.item_type]}>{item.item_type}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{item.read_time_minutes} min read</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{item.summary}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Published {publishedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <CardTitle className="text-2xl mb-2">Full Article</CardTitle>
                  <CardDescription>
                    Comprehensive analysis and insights on European clean energy markets
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-line text-base leading-relaxed">
                  {item.content}
                </div>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Knowledge Library
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
