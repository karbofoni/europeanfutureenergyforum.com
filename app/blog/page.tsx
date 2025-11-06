import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBlogPosts } from '@/lib/blog-posts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog - Transition Nexus Europe',
  description: 'Insights on European renewable energy projects, policy developments, and energy transition analysis. Expert perspectives on clean energy markets and investment trends.',
  alternates: {
    canonical: './'
  }
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Energy Transition Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Analysis, trends, and perspectives on Europe's renewable energy transformation
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="hover:border-emerald-500 transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-emerald-600">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-emerald-600 font-semibold">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
