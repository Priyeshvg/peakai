'use client'

import React, { useState } from 'react';
import { Handshake, DollarSign, TrendingUp, Users, Star, Award, Send, Mail, Phone, Building, Globe } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function PartnerProgramPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    experience: '',
    audience: '',
    promotion_method: '',
    expected_referrals: '',
    additional_info: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = 'Application for PeakAI Partner Program';
    const body = `Dear PeakAI Team,

I would like to apply for the PeakAI Partner Program. Here are my details:

Name: ${formData.name}
Company: ${formData.company}
Website: ${formData.website}
Phone: ${formData.phone}
Email: ${formData.email}

Experience in sales/marketing: ${formData.experience}
Target audience: ${formData.audience}
How I plan to promote PeakAI: ${formData.promotion_method}
Expected monthly referrals: ${formData.expected_referrals}

Additional Information:
${formData.additional_info}

Best regards,
${formData.name}`;

    const mailtoLink = `mailto:purvi@thepeakai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

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
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-accent-100 text-accent-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Handshake className="w-4 h-4 mr-2" />
              <span>💰 Partner Program - Earn 25% Revenue Share</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              PeakAI Partner Program
              <span className="block text-accent-600">Earn 25% Commission</span>
            </h1>
            
            <p className="text-xl text-brand-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our exclusive partner program and earn substantial commissions by promoting the world's most accurate LinkedIn phone number finder. Perfect for agencies, consultants, and sales professionals.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6">
                <div className="text-3xl font-bold text-accent-600 mb-2">25%</div>
                <div className="text-sm text-brand-700 font-medium">Revenue Share</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6">
                <div className="text-3xl font-bold text-brand-600 mb-2">$50+</div>
                <div className="text-sm text-brand-700 font-medium">Per Referral</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6">
                <div className="text-3xl font-bold text-accent-600 mb-2">91%</div>
                <div className="text-sm text-brand-700 font-medium">Accuracy Rate</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6">
                <div className="text-3xl font-bold text-brand-600 mb-2">1000+</div>
                <div className="text-sm text-brand-700 font-medium">Happy Users</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Why Partner With PeakAI?
            </h2>
            <p className="text-xl text-brand-600">
              Industry-leading product with unmatched earning potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">High Commissions</h3>
              <p className="text-brand-600">Earn 25% recurring revenue share on all referrals. Our premium pricing means higher earnings for you.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Growing Market</h3>
              <p className="text-brand-600">LinkedIn prospecting tools are in high demand. Ride the wave of the growing sales automation market.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Premium Product</h3>
              <p className="text-brand-600">91% accuracy rate and 100% refund guarantee make PeakAI easy to sell and promote to your audience.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Dedicated Support</h3>
              <p className="text-brand-600">Get priority support, marketing materials, and dedicated account management for your success.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Performance Bonuses</h3>
              <p className="text-brand-600">Top-performing partners get additional bonuses, exclusive perks, and early access to new features.</p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Global Opportunity</h3>
              <p className="text-brand-600">Promote PeakAI worldwide. Our product works for sales teams and recruiters across all industries and regions.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Perfect for These Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-8 bg-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-brand-900 mb-4">Sales Agencies</h3>
              <p className="text-brand-600 mb-4">Marketing agencies, sales consultants, and business development firms looking to add value for clients.</p>
              <div className="text-brand-600 font-semibold">Potential: $2,000-10,000/month</div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-brand-900 mb-4">Sales Trainers</h3>
              <p className="text-brand-600 mb-4">Sales coaches, trainers, and consultants who educate sales professionals on modern prospecting tools.</p>
              <div className="text-brand-600 font-semibold">Potential: $1,500-8,000/month</div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-brand-900 mb-4">Content Creators</h3>
              <p className="text-brand-600 mb-4">YouTubers, bloggers, and social media influencers in the sales and business development space.</p>
              <div className="text-brand-600 font-semibold">Potential: $1,000-5,000/month</div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-brand-900 mb-4">SaaS Resellers</h3>
              <p className="text-brand-600 mb-4">Technology resellers and solution providers who serve sales teams and recruiting firms.</p>
              <div className="text-brand-600 font-semibold">Potential: $3,000-15,000/month</div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-brand-900 mb-4">Business Networks</h3>
              <p className="text-brand-600 mb-4">Professional networks, mastermind groups, and business communities with sales-focused members.</p>
              <div className="text-brand-600 font-semibold">Potential: $2,500-12,000/month</div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold text-brand-900 mb-4">Industry Experts</h3>
              <p className="text-brand-600 mb-4">Sales professionals, recruiters, and industry experts with engaged audiences and credibility.</p>
              <div className="text-brand-600 font-semibold">Potential: $1,000-6,000/month</div>
            </div>

          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Apply for PeakAI Partner Program
            </h2>
            <p className="text-xl text-brand-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-900 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-900 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-brand-900 mb-3">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-brand-900 mb-3">
                    Website/Social Media
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-brand-900 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-brand-900 mb-3">
                  Experience in Sales/Marketing *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your experience level</option>
                  <option value="less-than-1-year">Less than 1 year</option>
                  <option value="1-3-years">1-3 years</option>
                  <option value="3-5-years">3-5 years</option>
                  <option value="5-10-years">5-10 years</option>
                  <option value="more-than-10-years">More than 10 years</option>
                </select>
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-semibold text-brand-900 mb-3">
                  Target Audience *
                </label>
                <textarea
                  id="audience"
                  name="audience"
                  required
                  rows={3}
                  value={formData.audience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                  placeholder="Describe your target audience (e.g., sales professionals, recruiters, business owners)"
                ></textarea>
              </div>

              <div>
                <label htmlFor="promotion_method" className="block text-sm font-semibold text-brand-900 mb-3">
                  How will you promote PeakAI? *
                </label>
                <textarea
                  id="promotion_method"
                  name="promotion_method"
                  required
                  rows={3}
                  value={formData.promotion_method}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                  placeholder="Describe your promotion strategy (e.g., social media, email marketing, content creation, webinars)"
                ></textarea>
              </div>

              <div>
                <label htmlFor="expected_referrals" className="block text-sm font-semibold text-brand-900 mb-3">
                  Expected Monthly Referrals
                </label>
                <select
                  id="expected_referrals"
                  name="expected_referrals"
                  value={formData.expected_referrals}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select expected referrals</option>
                  <option value="1-5">1-5 referrals</option>
                  <option value="5-10">5-10 referrals</option>
                  <option value="10-25">10-25 referrals</option>
                  <option value="25-50">25-50 referrals</option>
                  <option value="50+">50+ referrals</option>
                </select>
              </div>

              <div>
                <label htmlFor="additional_info" className="block text-sm font-semibold text-brand-900 mb-3">
                  Additional Information
                </label>
                <textarea
                  id="additional_info"
                  name="additional_info"
                  rows={4}
                  value={formData.additional_info}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                  placeholder="Tell us anything else relevant to your application..."
                ></textarea>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-accent-600 text-white px-12 py-4 rounded-2xl hover:bg-accent-700 transition-colors inline-flex items-center space-x-3 text-lg font-semibold shadow-xl hover:shadow-2xl"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>
                <p className="text-brand-600 text-sm mt-4">
                  Application will be sent to: <span className="font-medium text-accent-600">purvi@thepeakai.com</span>
                </p>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Questions About Our Partner Program?</h3>
          <p className="text-accent-100 mb-6">Get in touch with our partnership team</p>
          <div className="flex justify-center space-x-8">
            <a 
              href="mailto:purvi@thepeakai.com" 
              className="inline-flex items-center space-x-2 text-white hover:text-accent-200 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">purvi@thepeakai.com</span>
            </a>
          </div>
          <p className="text-accent-200 text-sm mt-6">
            <strong>Wealides Fintech Private Limited</strong> - Your trusted partner in sales intelligence
          </p>
        </div>
      </section>

    </>
  );
}