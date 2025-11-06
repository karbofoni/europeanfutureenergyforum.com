'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ArticleSchema } from '@/components/json-ld';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://transition-nexus-europe.com';

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.date}
        url={`${baseUrl}/blog/${post.slug}`}
        imageUrl={`${baseUrl}/og-image.png`}
        authorName={post.author}
      />
      <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{post.category}</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground">
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
                <span>by {post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <article className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:mb-4 prose-p:leading-relaxed
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-600 prose-blockquote:pl-4 prose-blockquote:italic
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
    </>
  );
}
