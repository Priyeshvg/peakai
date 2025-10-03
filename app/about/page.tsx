'use client'

import React from 'react';
import { Target, Users, Award, TrendingUp, Heart, Zap, Shield, Globe } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function AboutPage() {
  const team = [
    {
      name: "Purvi Shah",
      role: "Founder & CEO",
      avatar: "P",
      description: "Former sales leader with 8+ years experience building high-performing teams."
    },
    {
      name: "Tech Team",
      role: "Engineering",
      avatar: "T",
      description: "Expert developers focused on accuracy, speed, and user experience."
    },
    {
      name: "Support Team",
      role: "Customer Success",
      avatar: "S",
      description: "Dedicated to ensuring every customer succeeds with PeakAI."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Accuracy First",
      description: "We're obsessed with providing the most accurate phone numbers. That's why we offer 100% credit refund guarantee."
    },
    {
      icon: Zap,
      title: "Speed Matters",
      description: "10-second lookups because we know your time is valuable. No waiting, no delays."
    },
    {
      icon: Heart,
      title: "Customer Success",
      description: "Your success is our success. We're here to help you close more deals and find better candidates."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Supporting sales teams and recruiters worldwide with LinkedIn contacts from every industry."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "PeakAI Launched",
      description: "Started with a simple goal: make LinkedIn phone finding accurate and affordable."
    },
    {
      year: "2024",
      title: "1,000+ Users",
      description: "Reached our first 1,000 happy customers across sales and recruiting teams."
    },
    {
      year: "2024",
      title: "91% Accuracy",
      description: "Achieved industry-leading 91% accuracy rate with our verification technology."
    },
    {
      year: "2025",
      title: "Director Numbers",
      description: "Launched premium service for C-level executive contacts with 95% accuracy."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-purple-100/35 stroke-purple-100/45"
          squares={[
            [4, 4],
            [6, 6],
            [8, 2],
            [12, 8],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              About PeakAI
              <span className="block text-accent-600">Built for Sales & Recruiting Success</span>
            </h1>

            <p className="text-xl text-brand-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to help sales professionals and recruiters connect with the right people faster. No more wasted time hunting for contact information.
            </p>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg p-6 max-w-xl mx-auto mb-10">
              <p className="text-lg text-brand-700 font-medium">
                Powered by <span className="text-accent-600 font-bold">Wealides Fintech Private Limited</span>
              </p>
              <p className="text-sm text-brand-600 mt-2">
                Your trusted partner in sales intelligence and business growth
              </p>
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="text-sm text-brand-600 mb-2">Get in touch with us:</p>
                <div className="flex flex-col space-y-1">
                  <a
                    href="mailto:studio@thepeakai.com"
                    className="text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors"
                  >
                    studio@thepeakai.com
                  </a>
                  <a
                    href="mailto:purvi@thepeakai.com"
                    className="text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors"
                  >
                    purvi@thepeakai.com
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl">
                <div className="text-3xl font-bold text-accent-600 mb-2">1,000+</div>
                <div className="text-sm text-brand-700 text-center font-medium">Happy Users</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl">
                <div className="text-3xl font-bold text-accent-600 mb-2">91%</div>
                <div className="text-sm text-brand-700 text-center font-medium">Accuracy Rate</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl">
                <div className="text-3xl font-bold text-brand-600 mb-2">10s</div>
                <div className="text-sm text-brand-700 text-center font-medium">Average Lookup</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl">
                <div className="text-3xl font-bold text-brand-600 mb-2">24/7</div>
                <div className="text-sm text-brand-700 text-center font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              Empowering sales teams and recruiters to focus on what matters most - building relationships and closing deals.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-12 text-center">
            <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-brand-900 mb-6">
              "We believe that finding contact information shouldn't be the hardest part of your job."
            </h3>
            <p className="text-xl text-brand-600 leading-relaxed">
              That's why we built PeakAI - to give you accurate phone numbers instantly, so you can spend your time on what you do best: connecting with people and growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-brand-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-4">{value.title}</h3>
                  <p className="text-brand-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-brand-600">
              The people behind PeakAI's success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">{member.name}</h3>
                <p className="text-accent-600 font-semibold mb-4">{member.role}</p>
                <p className="text-brand-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-brand-600">
              Key milestones in our mission to improve LinkedIn prospecting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-900 mb-2">{milestone.title}</h3>
                  <p className="text-brand-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent-600 relative overflow-hidden">
        <GridPattern
          width={100}
          height={100}
          className="fill-white/25 stroke-white/35"
          squares={[
            [1, 2],
            [5, 1],
            [9, 4],
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Be part of the thousands of professionals who trust PeakAI for their LinkedIn prospecting needs.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-accent-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors inline-flex items-center space-x-2 text-lg font-semibold"
          >
            <span>Get Started Today</span>
          </a>
        </div>
      </section>
    </>
  );
}
