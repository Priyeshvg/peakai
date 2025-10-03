'use client'

import React from 'react';
import { Mail, Check, Star, Zap, Shield, Clock, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function UnlimitedEmailPage() {
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
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-brand-100 text-brand-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Mail className="w-4 h-4 mr-2" />
              <span>🔥 Early Bird Offer - Limited Time!</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              Unlimited Work Emails
              <span className="block text-brand-600">Just $19/month</span>
            </h1>
            
            <p className="text-xl text-brand-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get unlimited professional email addresses from LinkedIn profiles. Perfect for sales teams, recruiters, and business development professionals.
            </p>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              
              {/* Early Bird Offer */}
              <div className="relative p-8 bg-accent-600 text-white rounded-3xl shadow-2xl border border-green-400">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-400 text-brand-800 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 EARLY BIRD SPECIAL
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold mb-4">Limited Time Offer</h3>
                  <div className="mb-6">
                    <div className="text-5xl font-bold">$19</div>
                    <div className="text-brand-100">/month</div>
                  </div>
                  <div className="space-y-3 text-left mb-8">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-200" />
                      <span>Unlimited work emails</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-200" />
                      <span>1,500 emails/month fair usage</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-200" />
                      <span>95% accuracy guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-200" />
                      <span>24/7 support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-200" />
                      <span>Chrome extension included</span>
                    </div>
                  </div>
                  <button className="w-full bg-white text-brand-600 py-4 rounded-2xl font-bold text-lg hover:bg-brand-50 transition-colors shadow-xl">
                    Get Early Access - $19/month
                  </button>
                  <p className="text-brand-100 text-sm mt-4">⏰ Offer expires soon!</p>
                </div>
              </div>

              {/* Standard Pricing */}
              <div className="relative p-8 bg-white border border-brand-200 rounded-3xl shadow-xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-brand-900">Standard Pricing</h3>
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-brand-900">$39</div>
                    <div className="text-brand-600">/month</div>
                  </div>
                  <div className="space-y-3 text-left mb-8">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-600" />
                      <span className="text-brand-700">Unlimited work emails</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-600" />
                      <span className="text-brand-700">1,500 emails/month fair usage</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-600" />
                      <span className="text-brand-700">95% accuracy guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-600" />
                      <span className="text-brand-700">24/7 support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-3 text-brand-600" />
                      <span className="text-brand-700">Chrome extension included</span>
                    </div>
                  </div>
                  <button className="w-full bg-gray-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-700 transition-colors">
                    Regular Price - $39/month
                  </button>
                  <p className="text-brand-500 text-sm mt-4">Available after early bird period</p>
                </div>
              </div>

            </div>

            <div className="bg-brand-50 border border-yellow-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-brand-600 mt-1" />
                <div>
                  <h4 className="font-bold text-brand-800 mb-2">Fair Usage Policy</h4>
                  <p className="text-brand-700 text-sm">
                    Unlimited emails with a fair usage limit of 1,500 emails per month to ensure optimal service quality for all users.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Why Choose PeakAI Unlimited Emails?
            </h2>
            <p className="text-xl text-brand-600">
              The most advanced email finder with unbeatable accuracy and speed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">95% Accuracy</h3>
              <p className="text-brand-600">Industry-leading accuracy rate with verified email addresses and real-time validation.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Lightning Fast</h3>
              <p className="text-brand-600">Get email addresses in seconds, not minutes. Bulk processing available for large lists.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Team Ready</h3>
              <p className="text-brand-600">Perfect for sales teams, marketing agencies, and recruiting firms of all sizes.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">24/7 Support</h3>
              <p className="text-brand-600">Round-the-clock customer support to help you maximize your email outreach success.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-brand-600">
              Three simple steps to unlimited professional emails
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
              <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Install Extension</h3>
              <p className="text-brand-600">Add PeakAI Chrome extension and sign up for unlimited email plan.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
              <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Browse LinkedIn</h3>
              <p className="text-brand-600">Navigate to any LinkedIn profile or search results page you want to extract emails from.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg">
              <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Get Emails Instantly</h3>
              <p className="text-brand-600">Click our extension button and get verified work emails instantly with 95% accuracy.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Perfect For Every Professional
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Sales Teams</h3>
              <p className="text-brand-600">Reach prospects directly with verified work emails. Boost your outreach success rates and close more deals.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Recruiters</h3>
              <p className="text-brand-600">Connect with top talent faster. Find work emails of potential candidates and hiring managers.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Marketers</h3>
              <p className="text-brand-600">Build targeted email lists for your campaigns. Reach decision-makers directly with personalized messages.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-600 relative overflow-hidden">
        <GridPattern
          width={100}
          height={100}
          className="fill-white/25 stroke-white/35"
          squares={[
            [1, 2],
            [5, 1],
            [9, 4],
            [13, 2]
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Unlimited Work Emails?
          </h2>
          <p className="text-xl text-brand-100 mb-8">
            Join thousands of sales professionals who trust PeakAI for their email prospecting needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <a 
              href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-brand-600 px-8 py-4 rounded-2xl hover:bg-brand-50 transition-colors inline-flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl"
            >
              <span>Start Free Trial</span>
            </a>
            <a 
              href="https://studio.thepeakai.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-700 text-white px-8 py-4 rounded-2xl hover:bg-brand-800 transition-colors inline-flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl border-2 border-green-500"
            >
              <span>Upgrade to Unlimited - $19</span>
            </a>
          </div>
          <p className="text-brand-200 text-sm mt-6">
            🔥 Early bird pricing ends soon. Regular price will be $39/month.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Wealides Fintech Private Limited</h3>
          <p className="text-gray-300 mb-2">Your trusted partner in sales intelligence solutions</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="mailto:studio@thepeakai.com" className="text-brand-400 hover:text-brand-300">studio@thepeakai.com</a>
            <a href="mailto:purvi@thepeakai.com" className="text-brand-400 hover:text-brand-300">purvi@thepeakai.com</a>
          </div>
        </div>
      </section>

    </>
  );
}