import { supabase } from '@/lib/supabase';
import { LibraryItem } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library | Transition Nexus Europe',
  description: 'Curated briefs, reports, and case studies on European clean energy markets, policy developments, and technology trends. Plain-English analysis for professionals.',
  alternates: {
    canonical: './'
  }
};

export const revalidate = 60;

async function getLibraryItems(): Promise<LibraryItem[]> {
  const { data } = await supabase
    .from('library_items')
    .select('*')
    .order('published_at', { ascending: false });
  return data || [];
}

const typeColors: Record<string, string> = {
  Brief: 'bg-blue-100 text-blue-800',
  Report: 'bg-purple-100 text-purple-800',
  'Case Study': 'bg-green-100 text-green-800',
};

export default async function LibraryPage() {
  const items = await getLibraryItems();

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Knowledge Library</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Plain-English briefs, in-depth reports, and case studies on European clean energy markets,
            policy, and technology.
          </p>
        </div>

        {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No library items found. Check back soon.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/library/${item.id}`}>
              <Card className="transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <BookOpen className="h-8 w-8 text-emerald-600" />
                    <Badge className={typeColors[item.item_type]}>{item.item_type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm line-clamp-4">{item.content}</p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{item.read_time_minutes} min read</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
