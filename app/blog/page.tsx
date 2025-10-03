'use client'

import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Clock, Tag, TrendingUp, Users, Phone, Shield, Target, Zap } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';
import Link from 'next/link';
import { getBlogs, getBlogCategories, Blog } from '@/lib/supabase';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number; icon: any }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching blogs from Supabase...');
        console.log('Env check:', {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        });

        const [blogs, categoryData] = await Promise.all([
          getBlogs(),
          getBlogCategories()
        ]);

        console.log('Fetched blogs:', blogs.length);

        if (blogs.length === 0) {
          setError('No blog posts found. Please check Supabase configuration.');
        }

        setBlogPosts(blogs);

        // Create categories with icons
        const categoryIcons: { [key: string]: any } = {
          'B2B Sales': TrendingUp,
          'Lead Generation': Target,
          'Sales Strategy': Shield,
          'Technology': Zap,
          'Recruiting': Users,
          'Research': Phone
        };

        const formattedCategories = [
          { name: "All Posts", count: blogs.length, icon: Target },
          ...categoryData.map(cat => ({
            name: cat.name,
            count: cat.count,
            icon: categoryIcons[cat.name] || Tag
          }))
        ];

        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPosts = selectedCategory === "All Posts"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-blue-100/35 stroke-blue-100/45"
          squares={[
            [4, 4],
            [6, 6],
            [8, 2],
            [12, 8],
            [15, 5],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              PeakAI Blog
              <span className="block text-accent-600">Sales & Recruiting Insights</span>
            </h1>

            <p className="text-xl text-brand-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Expert insights, strategies, and case studies to help you maximize your LinkedIn prospecting and recruiting success.
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
            <p className="text-brand-600 mt-4">Loading blogs...</p>
          </div>
        </section>
      ) : error || blogPosts.length === 0 ? (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-brand-900 mb-4">
                {error || 'No blog posts available yet'}
              </h3>
              <p className="text-brand-600 mb-6">
                We're currently setting up our blog content. Please check back soon for insightful articles on sales and recruiting strategies.
              </p>
              <div className="text-left bg-white p-6 rounded-xl border border-gray-200">
                <p className="text-sm font-semibold text-brand-900 mb-2">For Administrators:</p>
                <p className="text-xs text-brand-600 mb-2">
                  If you're seeing this message, please ensure your Netlify environment variables are configured:
                </p>
                <ul className="text-xs text-brand-600 space-y-1 ml-4">
                  <li>• NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                </ul>
                <p className="text-xs text-brand-600 mt-2">
                  Check browser console for detailed error messages.
                </p>
              </div>
              <Link
                href="/"
                className="inline-block mt-6 bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors font-semibold"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Categories */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                        selectedCategory === category.name
                          ? 'bg-accent-600 text-white shadow-lg'
                          : 'bg-brand-100 text-brand-700 hover:bg-accent-50 hover:text-accent-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.name
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-brand-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

      {/* Featured Post */}
      {selectedCategory === "All Posts" && (
        <section className="py-20 bg-brand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
                Featured Article
              </h2>
            </div>

            {blogPosts.filter(post => post.featured).slice(0, 1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={post.featured_image || "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-12">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-accent-100 text-accent-600 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category || 'General'}
                      </span>
                      <span className="bg-brand-100 text-brand-600 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-900 mb-4 leading-tight line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {post.title}
                    </h3>
                    <p className="text-brand-600 mb-6 text-lg leading-relaxed">
                      {post.meta_description || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-brand-500">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{post.author || 'PeakAI Team'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.reading_time || 5} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-accent-600 hover:text-accent-700 font-semibold transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              {selectedCategory === "All Posts" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <p className="text-xl text-brand-600">
              {selectedCategory === "All Posts"
                ? "Stay updated with the latest insights and strategies"
                : `Specialized content about ${selectedCategory.toLowerCase()}`
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured || selectedCategory !== "All Posts").map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={post.featured_image || "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-accent-100 text-accent-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category || 'General'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-3 leading-tight line-clamp-2 hover:line-clamp-none transition-all duration-300">
                    {post.title}
                  </h3>
                  <p className="text-brand-600 mb-6 leading-relaxed">
                    {post.meta_description || post.content.substring(0, 120) + '...'}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-brand-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author || 'PeakAI Team'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.reading_time || 5} min read</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-brand-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-accent-600 hover:text-accent-700 font-semibold transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-accent-600 relative overflow-hidden">
        <GridPattern
          width={100}
          height={100}
          className="fill-white/25 stroke-white/35"
          squares={[
            [1, 2],
            [5, 1],
            [9, 4],
            [13, 2],
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with PeakAI Insights
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Get the latest sales and recruiting strategies delivered to your inbox weekly.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-brand-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-accent-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-accent-100 text-sm mt-4">
              No spam. Unsubscribe anytime. Join 5,000+ professionals.
            </p>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  );
}
