'use client'

import React from 'react';
import { Mail, MessageSquare, MapPin, Phone, Clock, Send } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function ContactPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              Contact Us
              <span className="block text-accent-600">We're Here to Help</span>
            </h1>

            <p className="text-xl text-brand-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Have questions about PeakAI? Need support with your account? Our team is ready to assist you.
            </p>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg p-6 max-w-xl mx-auto mb-10">
              <p className="text-lg text-brand-700 font-medium">
                <span className="text-accent-600 font-bold">Wealides Fintech Private Limited</span>
              </p>
              <p className="text-sm text-brand-600 mt-2">
                Your trusted partner in sales intelligence and business growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

            {/* Email Support */}
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Email Support</h3>
              <p className="text-brand-600 mb-4">Get help with your account, billing, or technical issues</p>
              <div className="space-y-2">
                <a
                  href="mailto:studio@thepeakai.com"
                  className="block text-accent-600 hover:text-accent-700 font-semibold text-lg"
                >
                  studio@thepeakai.com
                </a>
                <a
                  href="mailto:purvi@thepeakai.com"
                  className="block text-accent-600 hover:text-accent-700 font-semibold"
                >
                  purvi@thepeakai.com
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Response Time</h3>
              <p className="text-brand-600 mb-4">We typically respond within</p>
              <div className="text-brand-600 font-bold text-2xl">24 Hours</div>
            </div>

            {/* Support Hours */}
            <div className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4">Support Available</h3>
              <p className="text-brand-600 mb-4">Monday - Friday</p>
              <div className="text-accent-600 font-bold text-lg">9:00 AM - 6:00 PM IST</div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Send Us a Message
            </h2>
            <p className="text-xl text-brand-600">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-12">
            <form className="space-y-8">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-900 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-900 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-brand-900 mb-3">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="billing">Billing & Account</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-brand-900 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-brand-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-accent-600 text-white px-8 py-4 rounded-xl hover:bg-accent-700 transition-colors inline-flex items-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-brand-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">

            <div className="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-3">
                How do I get started with PeakAI?
              </h3>
              <p className="text-brand-700">
                Simply install our Chrome extension from the Chrome Web Store, sign in with LinkedIn, and start finding phone numbers instantly. You'll get free credits to try the service.
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-3">
                What if a phone number is incorrect?
              </h3>
              <p className="text-brand-700">
                We offer a 100% credit refund guarantee. If a phone number is incorrect or doesn't belong to the profile, contact us within 24 hours for a full credit refund.
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-3">
                How accurate are the phone numbers?
              </h3>
              <p className="text-brand-700">
                Our AI-powered system maintains a 91% accuracy rate for phone numbers, making us one of the most reliable LinkedIn phone finders available.
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-brand-900 mb-3">
                Do you offer bulk discounts?
              </h3>
              <p className="text-brand-700">
                Yes! We offer enterprise plans and bulk discounts for teams. Contact us at studio@thepeakai.com or purvi@thepeakai.com to discuss custom pricing for your organization.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Company Info Footer */}
      <section className="py-12 bg-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Wealides Fintech Private Limited</h3>
          <p className="text-accent-100 mb-2">Your trusted partner in sales intelligence solutions</p>
          <p className="text-accent-200 text-sm">
            Empowering sales teams worldwide with accurate contact information
          </p>
        </div>
      </section>

    </>
  );
}
