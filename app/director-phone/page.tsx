'use client'

import React from 'react';
import { Crown, Shield, Target, Phone, CheckCircle, Star, TrendingUp, Users, Building, Award, Zap, Chrome, ArrowRight } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function DirectorPhonePage() {
  const features = [
    {
      icon: Crown,
      title: "C-Level Executive Numbers",
      description: "Direct access to CEOs, CTOs, CFOs, and other senior executives on LinkedIn"
    },
    {
      icon: Shield,
      title: "Verified & Accurate",
      description: "95% accuracy rate for director-level contacts with our premium verification process"
    },
    {
      icon: Target,
      title: "Decision Maker Direct",
      description: "Skip gatekeepers and reach decision makers who can actually say yes to your proposals"
    },
    {
      icon: Building,
      title: "Enterprise Contacts",
      description: "Focus on high-value prospects from Fortune 500 and growing companies"
    }
  ];

  const benefits = [
    {
      stat: "3x",
      label: "Higher Response Rate",
      description: "Directors respond 3x more than lower-level contacts"
    },
    {
      stat: "65%",
      label: "Faster Deal Closure",
      description: "Close deals 65% faster when reaching decision makers directly"
    },
    {
      stat: "₹2L+",
      label: "Average Deal Size",
      description: "Director-level contacts generate larger deal values"
    },
    {
      stat: "95%",
      label: "Accuracy Rate",
      description: "Premium verification for executive-level contacts"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "VP Sales, TechCorp",
      avatar: "R",
      content: "Director phone numbers from PeakAI helped us close 3 enterprise deals worth ₹50L+ in just 2 months. The quality is exceptional.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Business Development Head, StartupXYZ",
      avatar: "P",
      content: "Finally, a way to reach CTOs and CEOs directly. Our conversion rate improved by 300% since using director numbers.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Senior Sales Manager, GrowthCo",
      avatar: "V",
      content: "The accuracy of director phone numbers is incredible. 9 out of 10 calls reach the right person. Game-changing for B2B sales.",
      rating: 5
    }
  ];

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
          <div className="text-center">
            <div className="inline-flex items-center bg-accent-50/60 backdrop-blur-sm border border-accent-200/40 text-accent-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Crown className="w-4 h-4 mr-2" />
              <span>Premium Director Contacts • 95% Accuracy</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              Get Director Phone Numbers
              <span className="block text-accent-600">Reach Decision Makers Directly</span>
            </h1>

            <p className="text-xl text-brand-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Access verified phone numbers of <span className="font-semibold text-accent-600">CEOs, CTOs, CFOs</span>, and other <span className="font-semibold text-accent-600">C-level executives</span>. Skip gatekeepers and reach decision makers who can actually approve your deals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="https://studio.thepeakai.com/billing"
                className="bg-accent-600 text-white px-10 py-5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Chrome className="w-6 h-6" />
                <span>Start Finding Directors</span>
                <div className="bg-white/20 text-sm px-3 py-1 rounded-full">Premium</div>
              </a>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-accent-600 mb-2">{benefit.stat}</div>
                  <div className="text-sm text-brand-700 text-center font-medium">{benefit.label}</div>
                  <div className="text-xs text-brand-600 mt-1 text-center">{benefit.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Why Director Phone Numbers Matter
            </h2>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              Stop wasting time on junior employees who can't make decisions. Connect directly with executives who have the authority to approve your proposals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-4">{feature.title}</h3>
                  <p className="text-brand-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
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
              How to Find Director Phone Numbers
            </h2>
            <p className="text-xl text-brand-600">
              Our premium verification process ensures you get accurate executive contacts
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Identify Target Directors</h3>
              <p className="text-brand-600 mb-4">Search for CEOs, CTOs, CFOs and other C-level executives on LinkedIn in your target companies.</p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <Crown className="w-8 h-8 text-accent-600 mx-auto" />
              </div>
            </div>
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Premium Verification</h3>
              <p className="text-brand-600 mb-4">Our advanced algorithms verify executive-level contacts with 95% accuracy through multiple data sources.</p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-brand-600 mx-auto" />
              </div>
            </div>
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-4">Direct Connection</h3>
              <p className="text-brand-600 mb-4">Get the verified phone number instantly and connect directly with decision makers.</p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <Phone className="w-8 h-8 text-accent-600 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Success Stories from Sales Teams
            </h2>
            <p className="text-xl text-brand-600">
              See how director phone numbers transformed their results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-400 fill-current" />
                  ))}
                </div>
                <p className="text-brand-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900 text-lg">{testimonial.name}</p>
                    <p className="text-brand-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-brand-50 relative overflow-hidden">
        <GridPattern
          width={50}
          height={50}
          className="fill-gray-200/45 stroke-gray-200/65"
          squares={[
            [3, 2],
            [8, 5],
            [13, 1],
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Premium Director Pricing
            </h2>
            <p className="text-xl text-brand-600">
              High-value contacts deserve premium pricing
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-lg p-12 rounded-3xl shadow-xl border-2 border-purple-500/50 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-accent-500 text-white px-6 py-2 rounded-full text-sm font-medium">Premium Directors</span>
            </div>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl font-bold text-accent-600">₹50</span>
                <span className="text-brand-600 ml-3 text-xl">per director contact</span>
              </div>
              <p className="text-sm text-brand-600">Worth every rupee for decision makers</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-brand-500 mr-4" />
                <span className="text-brand-700 text-lg">95% accuracy for C-level executives</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-brand-500 mr-4" />
                <span className="text-brand-700 text-lg">Premium verification process</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-brand-500 mr-4" />
                <span className="text-brand-700 text-lg">Direct access to decision makers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-brand-500 mr-4" />
                <span className="text-brand-700 text-lg">100 credits back guarantee</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-6 h-6 text-brand-500 mr-4" />
                <span className="text-brand-700 text-lg">Priority support</span>
              </li>
            </ul>
            <a
              href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors text-center block font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Director Numbers
            </a>
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
            Ready to Reach Decision Makers?
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Stop wasting time on junior employees. Connect directly with CEOs, CTOs, and other executives who can actually approve your deals.
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
              href="mailto:support@thepeakai.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Enterprise Solutions</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
