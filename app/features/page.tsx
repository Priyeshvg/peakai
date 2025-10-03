'use client'

import React from 'react';
import { Chrome, Shield, Target, Zap, CheckCircle, Star, Users, Phone, DollarSign, TrendingUp, Lock, ArrowRight, Clock, Database, Globe, RefreshCw } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-accent-100/35 stroke-accent-100/45"
          squares={[
            [4, 4],
            [6, 6],
            [8, 2],
            [12, 8],
            [15, 5],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">
              Powerful Features for
              <span className="block text-accent-600">Sales & Recruitment Success</span>
            </h1>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              Discover why thousands of professionals choose PeakAI for their LinkedIn contact discovery needs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Instant Results</h3>
              <p className="text-brand-600 leading-relaxed">Get phone numbers in just 10 seconds. No waiting, no delays - instant access to verified contact information.</p>
            </div>

            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">91% Accuracy Rate</h3>
              <p className="text-brand-600 leading-relaxed">Industry-leading accuracy with 100 credits back guarantee for any incorrect phone numbers.</p>
            </div>

            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Chrome className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Chrome Extension</h3>
              <p className="text-brand-600 leading-relaxed">Works seamlessly within LinkedIn - no separate tools or complex setup required.</p>
            </div>

            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Massive Database</h3>
              <p className="text-brand-600 leading-relaxed">Access to millions of verified phone numbers updated in real-time for maximum coverage.</p>
            </div>

            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Privacy First</h3>
              <p className="text-brand-600 leading-relaxed">Your data stays private. We don't store your LinkedIn information or browsing history.</p>
            </div>

            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Global Coverage</h3>
              <p className="text-brand-600 leading-relaxed">Find phone numbers from LinkedIn profiles worldwide - not limited to specific regions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-brand-50 relative overflow-hidden">
        <GridPattern
          width={50}
          height={50}
          className="fill-gray-200/45 stroke-gray-200/65"
          squares={[
            [2, 1],
            [7, 3],
            [11, 6],
            [16, 2],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              How PeakAI Works
            </h2>
            <p className="text-xl text-brand-600">
              Simple, fast, and reliable - get phone numbers in 3 easy steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Install Extension</h3>
              <p className="text-brand-600 mb-4">Add PeakAI to Chrome in one click. No signup required to start.</p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <Chrome className="w-8 h-8 text-accent-600 mx-auto" />
              </div>
            </div>
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Browse LinkedIn</h3>
              <p className="text-brand-600 mb-4">Visit any LinkedIn profile as you normally would. Our extension works silently.</p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-accent-600 mx-auto" />
              </div>
            </div>
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Get Phone Number</h3>
              <p className="text-brand-600 mb-4">Click to reveal the verified phone number with 100 credits back guarantee.</p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <Phone className="w-8 h-8 text-brand-600 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Advanced Features for Power Users
            </h2>
            <p className="text-xl text-brand-600">
              Everything you need for serious prospecting and recruiting
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Real-time Updates</h3>
                  <p className="text-brand-600">Our database is constantly updated to ensure you get the most current phone numbers available.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Usage Analytics</h3>
                  <p className="text-brand-600">Track your success rate, credits used, and optimize your prospecting strategy with detailed analytics.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Priority Support</h3>
                  <p className="text-brand-600">Get dedicated support from our team to help you maximize your results with PeakAI.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Flexible Pricing</h3>
                  <p className="text-brand-600">Pay only for what you use. No monthly subscriptions or hidden fees - transparent pricing.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Bulk Operations</h3>
                  <p className="text-brand-600">Enterprise features for teams that need to process hundreds of contacts efficiently.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Quality Guarantee</h3>
                  <p className="text-brand-600">100 credits back for any incorrect phone number - we stand behind our accuracy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Join thousands of professionals who trust PeakAI for accurate LinkedIn phone numbers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://studio.thepeakai.com/billing"
              className="bg-white text-accent-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <Chrome className="w-5 h-5" />
              <span>Add to Chrome - Free</span>
            </a>
            <a
              href="https://studio.thepeakai.com/billing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
