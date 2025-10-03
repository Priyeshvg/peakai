'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Tag, Eye, BookOpen, Twitter, Linkedin, Facebook } from 'lucide-react';
import { getBlogBySlug, getBlogs, Blog } from '@/lib/supabase';
import { GridPattern } from '@/components/GridPattern';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(resolvedParams => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const [blogData, allBlogs] = await Promise.all([
          getBlogBySlug(slug),
          getBlogs(4)
        ]);

        if (!blogData) {
          setError('Blog post not found');
          return;
        }

        setBlog(blogData);

        // Filter related blogs (same category, different post)
        const related = allBlogs
          .filter(b => b.id !== blogData.id && b.category === blogData.category)
          .slice(0, 3);

        setRelatedBlogs(related);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
          <p className="text-brand-600 mt-4">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-brand-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-brand-900 mb-4">
            {error || 'Blog post not found'}
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-accent-600 hover:text-accent-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-accent-600 hover:text-accent-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-blue-100/35 stroke-blue-100/45"
          squares={[[4, 4], [6, 6], [8, 2], [12, 8]]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {blog.category && (
              <div className="flex justify-center mb-6">
                <span className="bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {blog.category}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.meta_description && (
              <p className="text-xl text-brand-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {blog.meta_description}
              </p>
            )}

            <div className="flex items-center justify-center space-x-8 text-sm text-brand-500">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{blog.author || 'PeakAI Team'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{blog.reading_time || 5} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featured_image && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            {/* Share Buttons */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-accent-600" />
                <span className="text-brand-600">Share this article:</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`)}
                  className="p-2 bg-accent-50 hover:bg-accent-100 rounded-lg text-accent-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}
                  className="p-2 bg-accent-50 hover:bg-accent-100 rounded-lg text-accent-600 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
                  className="p-2 bg-accent-50 hover:bg-accent-100 rounded-lg text-accent-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg prose-blue max-w-none">
              <div
                className="blog-content text-brand-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: blog.content
                    .replace(/\n{3,}/g, '\n\n')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, ' ')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                    .replace(/<p><\/p>/g, '')
                    .replace(/<p><h/g, '<h')
                    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
                    .replace(/<p><table/g, '<table')
                    .replace(/<\/table><\/p>/g, '</table>')
                    .replace(/<p><ul/g, '<ul')
                    .replace(/<\/ul><\/p>/g, '</ul>')
                }}
              />
            </article>

            {/* Keywords */}
            {blog.keywords && blog.keywords.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center space-x-3 mb-4">
                  <Tag className="w-5 h-5 text-brand-600" />
                  <span className="text-brand-600 font-medium">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="block bg-brand-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedBlog.featured_image || "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={relatedBlog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-accent-100 text-accent-600 px-2 py-1 rounded text-xs font-medium">
                        {relatedBlog.category || 'General'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-900 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-brand-600 text-sm mb-4 line-clamp-2">
                      {relatedBlog.meta_description || relatedBlog.content.substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-brand-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{relatedBlog.reading_time || 5} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{relatedBlog.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-accent-600 relative overflow-hidden">
        <GridPattern
          width={100}
          height={100}
          className="fill-white/25 stroke-white/35"
          squares={[[1, 2], [5, 1], [9, 4], [13, 2]]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Join thousands of sales professionals who are already using PeakAI to find accurate contact information and close more deals.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-accent-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors font-semibold text-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Blog Content Styles */}
      <style jsx>{`
        .blog-content {
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .blog-content p {
          margin: 0.75rem 0;
          color: #374151;
          line-height: 1.6;
        }

        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e40af;
          margin: 1.5rem 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e0e7ff;
          line-height: 1.3;
        }

        .blog-content h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #1f2937;
          margin: 1.25rem 0 0.75rem 0;
          line-height: 1.4;
        }

        .blog-content ul, .blog-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin: 0.5rem 0;
          color: #374151;
        }

        .blog-content strong {
          color: #1f2937;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
          }

          .blog-content h2 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem 0;
          }

          .blog-content h3 {
            font-size: 1.25rem;
            margin: 1.5rem 0 0.75rem 0;
          }
        }
      `}</style>
    </div>
  );
}
