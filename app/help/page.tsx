'use client'

import React from 'react';
import { Search, HelpCircle, MessageCircle, FileText, Chrome, Phone, CreditCard, Shield, Users, ArrowRight } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = [
    {
      title: "Getting Started",
      icon: Chrome,
      articles: [
        "How to install the PeakAI Chrome extension",
        "Setting up your account for the first time",
        "Understanding the credit system",
        "Your first phone number lookup"
      ]
    },
    {
      title: "Credits & Pricing",
      icon: CreditCard,
      articles: [
        "How to purchase credits",
        "Understanding pricing tiers",
        "Refund policy and guarantee",
        "Enterprise pricing options"
      ]
    },
    {
      title: "Phone Number Accuracy",
      icon: Phone,
      articles: [
        "Why is accuracy 91% and not 100%?",
        "What to do if a number is incorrect",
        "How we verify phone numbers",
        "Reporting accuracy issues"
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      articles: [
        "How we protect your data",
        "LinkedIn account security",
        "GDPR compliance",
        "Data retention policies"
      ]
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      articles: [
        "Extension not working on LinkedIn",
        "Payment issues and solutions",
        "Browser compatibility",
        "Common error messages"
      ]
    },
    {
      title: "Account Management",
      icon: Users,
      articles: [
        "Managing your subscription",
        "Team accounts and permissions",
        "Usage analytics and reports",
        "Account deletion process"
      ]
    }
  ];

  const faqs = [
    {
      question: "How quickly can I find a phone number?",
      answer: "Phone numbers appear in just 10 seconds after clicking on our extension button on any LinkedIn profile."
    },
    {
      question: "What happens if the phone number is wrong?",
      answer: "We offer a 100% credit refund guarantee. If any number is incorrect, we'll immediately credit your account back."
    },
    {
      question: "Do you store my LinkedIn data?",
      answer: "No, we don't store your LinkedIn data. We only access public profile information temporarily to find the phone number."
    },
    {
      question: "Can I use this for recruiting?",
      answer: "Absolutely! PeakAI is perfect for both sales prospecting and recruiting. Many HR teams use it daily."
    },
    {
      question: "Is there a bulk option for teams?",
      answer: "Yes, we offer enterprise plans with volume discounts for teams needing 500+ contacts monthly."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-50 py-20 relative overflow-hidden">
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
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">
              Help Center
            </h1>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions about PeakAI. Can't find what you're looking for? Contact our support team.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border border-brand-200/50 rounded-xl text-brand-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Browse by Category
            </h2>
            <p className="text-xl text-brand-600">
              Find help articles organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-4 text-center">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <button className="text-left text-brand-600 hover:text-accent-600 transition-colors w-full">
                          {article}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <button className="text-accent-600 hover:text-accent-700 font-semibold flex items-center justify-center space-x-2 mx-auto">
                      <span>View all</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-brand-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
                <h3 className="text-xl font-bold text-brand-900 mb-4 flex items-center">
                  <HelpCircle className="w-6 h-6 text-accent-600 mr-3" />
                  {faq.question}
                </h3>
                <p className="text-brand-700 text-lg leading-relaxed ml-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
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
            Still Need Help?
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Our support team is here to help you get the most out of PeakAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@thepeakai.com"
              className="bg-white text-accent-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </a>
            <a
              href="mailto:support@thepeakai.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <FileText className="w-5 h-5" />
              <span>Submit a Ticket</span>
            </a>
          </div>
          <p className="text-accent-100 mt-4 text-sm">
            Average response time: 2-4 hours during business hours
          </p>
        </div>
      </section>
    </>
  );
}
