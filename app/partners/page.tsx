'use client'

import React from 'react';
import { Handshake, TrendingUp, Users, Award, Chrome, ArrowRight, CheckCircle, Star, DollarSign, Target, Shield, Zap } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function PartnersPage() {
  const partnerBenefits = [
    {
      icon: DollarSign,
      title: "25% Revenue Share",
      description: "Earn 25% commission on all referrals for the first year, then 15% ongoing"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account manager and priority support for all your clients"
    },
    {
      icon: Target,
      title: "Co-Marketing",
      description: "Joint marketing materials, case studies, and promotional support"
    },
    {
      icon: Shield,
      title: "White-Label Option",
      description: "Offer PeakAI under your brand with custom pricing and features"
    }
  ];

  const partnerTypes = [
    {
      title: "Sales Tool Resellers",
      description: "Add PeakAI to your sales tool portfolio",
      features: ["25% commission", "Marketing support", "Training materials"],
      icon: TrendingUp,
      color: "blue"
    },
    {
      title: "Consulting Agencies",
      description: "Offer PeakAI as part of your sales consulting services",
      features: ["White-label option", "Custom pricing", "Dedicated support"],
      icon: Users,
      color: "green"
    },
    {
      title: "Technology Integrators",
      description: "Integrate PeakAI with your existing CRM/sales stack",
      features: ["API access", "Technical support", "Revenue sharing"],
      icon: Zap,
      color: "purple"
    }
  ];

  const testimonials = [
    {
      name: "Amit Gupta",
      role: "Partner, SalesForce Solutions",
      avatar: "A",
      content: "PeakAI has become our top-selling product. Clients love the accuracy and we love the recurring revenue. 25% commission is the best in the industry.",
      rating: 5
    },
    {
      name: "Sneha Patel",
      role: "Director, Growth Consulting",
      avatar: "S",
      content: "White-labeling PeakAI under our brand was seamless. Our clients get accurate phone numbers and we get happy customers and great margins.",
      rating: 5
    },
    {
      name: "Ravi Kumar",
      role: "CEO, TechStack Solutions",
      avatar: "R",
      content: "The API integration was smooth and our customers love having phone numbers directly in their CRM. Partnership team is incredibly supportive.",
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
            <div className="inline-flex items-center bg-brand-50/60 backdrop-blur-sm border border-brand-200/40 text-brand-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Handshake className="w-4 h-4 mr-2" />
              <span>Partner Program • 25% Revenue Share</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              Become a PeakAI Partner
              <span className="block text-brand-600">Grow Your Revenue Together</span>
            </h1>
            
            <p className="text-xl text-brand-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join our partner program and offer the most accurate LinkedIn phone finder to your clients. Earn <span className="font-semibold text-brand-600">25% commission</span> with <span className="font-semibold text-accent-600">dedicated support</span> and <span className="font-semibold text-brand-600">co-marketing opportunities</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="mailto:partners@thepeakai.com?subject=Partnership Inquiry"
                className="bg-accent-600 text-white px-10 py-5 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Handshake className="w-6 h-6" />
                <span>Apply to Partner Program</span>
              </a>
              <a 
                href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-brand-600 text-brand-600 px-10 py-5 rounded-xl hover:bg-brand-50 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold"
              >
                <Chrome className="w-6 h-6" />
                <span>Try PeakAI First</span>
              </a>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-brand-600 mb-2">25%</div>
                <div className="text-sm text-brand-700 text-center font-medium">Commission Rate</div>
                <div className="text-xs text-brand-600 mt-1">First year</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-brand-600 mb-2">91%</div>
                <div className="text-sm text-brand-700 text-center font-medium">Accuracy Rate</div>
                <div className="text-xs text-brand-600 mt-1">Industry leading</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent-600 mb-2">50+</div>
                <div className="text-sm text-brand-700 text-center font-medium">Active Partners</div>
                <div className="text-xs text-brand-600 mt-1">Growing fast</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent-600 mb-2">₹5L+</div>
                <div className="text-sm text-brand-700 text-center font-medium">Avg. Monthly Revenue</div>
                <div className="text-xs text-brand-600 mt-1">Per partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Partner Opportunities
            </h2>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              Multiple ways to partner with PeakAI and create new revenue streams
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => {
              const Icon = type.icon;
              const colorClasses = {
                blue: 'bg-accent-600',
                green: 'bg-brand-600',
                purple: 'bg-accent-600'
              };
              return (
                <div key={index} className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 ${colorClasses[type.color]} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-4 text-center">{type.title}</h3>
                  <p className="text-brand-600 mb-6 text-center">{type.description}</p>
                  <ul className="space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" />
                        <span className="text-brand-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              Why Partner with PeakAI?
            </h2>
            <p className="text-xl text-brand-600">
              Comprehensive support to help you succeed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-4">{benefit.title}</h3>
                  <p className="text-brand-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Partner Success Stories
            </h2>
            <p className="text-xl text-brand-600">
              Hear from our successful partners
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
                  <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mr-4">
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

      {/* How to Apply */}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              How to Become a Partner
            </h2>
            <p className="text-xl text-brand-600">
              Simple 4-step process to get started
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-900 mb-2">Apply</h3>
              <p className="text-brand-600 text-sm">Submit your partnership application with company details</p>
            </div>
            <div className="text-center p-6 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-900 mb-2">Review</h3>
              <p className="text-brand-600 text-sm">Our team reviews your application within 48 hours</p>
            </div>
            <div className="text-center p-6 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-900 mb-2">Onboard</h3>
              <p className="text-brand-600 text-sm">Complete onboarding and receive training materials</p>
            </div>
            <div className="text-center p-6 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-900 mb-2">Earn</h3>
              <p className="text-brand-600 text-sm">Start earning 25% commission on all referrals</p>
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
            [13, 2],
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Partner with PeakAI?
          </h2>
          <p className="text-xl text-brand-100 mb-8">
            Join our growing partner network and create new revenue opportunities for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:partners@thepeakai.com?subject=Partnership Inquiry"
              className="bg-white text-brand-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <Handshake className="w-5 h-5" />
              <span>Apply Now</span>
            </a>
            <a 
              href="mailto:partners@thepeakai.com?subject=Partnership Questions"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Ask Questions</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}