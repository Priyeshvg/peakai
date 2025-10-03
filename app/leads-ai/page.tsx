'use client'

import React from 'react';
import { Database, Download, CheckCircle, Users, Chrome, Zap, Shield, Target, Clock, BarChart3, FileSpreadsheet, Settings, Filter, Globe } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function LeadsAiPage() {
  const platforms = [
    {
      name: "Apollo.io",
      status: "Live",
      statusColor: "green",
      icon: Database,
      description: "Export thousands of leads from Apollo.io with comprehensive contact data",
      features: ["Bulk export up to 10,000 leads", "Phone number enrichment", "Email verification", "Real-time processing"],
      formats: ["CSV", "Excel", "JSON"]
    },
    {
      name: "Lusha",
      status: "Coming Soon",
      statusColor: "orange",
      icon: Users,
      description: "Export your Lusha prospect lists with enhanced contact data",
      features: ["Lusha list export", "Contact enrichment", "Data validation", "Multiple formats"],
      formats: ["CSV", "Excel", "CRM Integration"]
    },
    {
      name: "Sales Navigator",
      status: "Coming Soon",
      statusColor: "blue",
      icon: Target,
      description: "Export LinkedIn Sales Navigator search results with complete contact info",
      features: ["Navigator search export", "LinkedIn profile data", "Contact enrichment", "Bulk processing"],
      formats: ["CSV", "Excel", "API Export"]
    }
  ];

  const exportFeatures = [
    {
      icon: Clock,
      title: "Lightning Fast Processing",
      description: "Export thousands of leads in minutes with our optimized processing engine"
    },
    {
      icon: Shield,
      title: "Data Quality Assurance",
      description: "91% accuracy rate with automated verification and validation processes"
    },
    {
      icon: FileSpreadsheet,
      title: "Multiple Export Formats",
      description: "Export to CSV, Excel, JSON, or integrate directly with popular CRMs"
    },
    {
      icon: BarChart3,
      title: "Advanced Filtering",
      description: "Filter by company size, industry, location, job title, and custom criteria"
    },
    {
      icon: Settings,
      title: "Customizable Fields",
      description: "Select exactly which data fields you want to include in your export"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Export leads from any geographic region with international phone formats"
    }
  ];

  const exportSpecs = [
    {
      title: "Export Capacity",
      specs: [
        "Up to 10,000 leads per export",
        "Unlimited daily exports",
        "Batch processing support",
        "Queue management system"
      ]
    },
    {
      title: "Data Fields",
      specs: [
        "Full name and job title",
        "Company name and industry",
        "Email addresses (work/personal)",
        "Phone numbers (mobile/work)",
        "LinkedIn profile URLs",
        "Company size and revenue",
        "Geographic location data"
      ]
    },
    {
      title: "Export Formats",
      specs: [
        "CSV with custom delimiters",
        "Excel with multiple sheets",
        "JSON for API integration",
        "Direct CRM import formats"
      ]
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Connect Platform",
      description: "Securely connect to Apollo.io, Lusha, or Sales Navigator through our extension"
    },
    {
      step: "2",
      title: "Select Data",
      description: "Choose your prospect lists, saved searches, or apply custom filters"
    },
    {
      step: "3",
      title: "Configure Export",
      description: "Select data fields, export format, and quality preferences"
    },
    {
      step: "4",
      title: "Download Results",
      description: "Receive your enriched data file ready for immediate use"
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
              <Database className="w-4 h-4 mr-2" />
              <span>Bulk Lead Export • Apollo.io Live • More Platforms Coming</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              LeadsAI Bulk Export
              <span className="block text-accent-600">From Apollo, Lusha & Sales Navigator</span>
            </h1>

            <p className="text-xl text-brand-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Export thousands of leads from your favorite platforms with <span className="font-semibold text-accent-600">verified phone numbers</span> and <span className="font-semibold text-accent-600">complete contact data</span>. Transform prospect lists into actionable datasets instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="https://chromewebstore.google.com/detail/jbmbaakkgmcjdbncmnikcclljmgeimji?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-600 text-white px-10 py-5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Chrome className="w-6 h-6" />
                <span>Install Export Extension</span>
                <div className="bg-white/20 text-sm px-3 py-1 rounded-full">Free</div>
              </a>
              <a
                href="mailto:support@thepeakai.com?subject=LeadsAI Export Documentation"
                className="border-2 border-accent-600 text-accent-600 px-10 py-5 rounded-xl hover:bg-accent-50 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold"
              >
                <Download className="w-6 h-6" />
                <span>Export Documentation</span>
              </a>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent-600 mb-2">10,000</div>
                <div className="text-sm text-brand-700 text-center font-medium">Leads per Export</div>
                <div className="text-xs text-brand-600 mt-1">Maximum capacity</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-brand-600 mb-2">91%</div>
                <div className="text-sm text-brand-700 text-center font-medium">Data Accuracy</div>
                <div className="text-xs text-brand-600 mt-1">Verified contacts</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-accent-600 mb-2">5min</div>
                <div className="text-sm text-brand-700 text-center font-medium">Processing Time</div>
                <div className="text-xs text-brand-600 mt-1">For 1,000 leads</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-brand-600 mb-2">15+</div>
                <div className="text-sm text-brand-700 text-center font-medium">Data Fields</div>
                <div className="text-xs text-brand-600 mt-1">Per contact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Supported Export Platforms
            </h2>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              Seamlessly export data from your favorite lead generation platforms
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const statusColors = {
                green: 'bg-brand-500 text-white',
                orange: 'bg-brand-500 text-white',
                blue: 'bg-accent-500 text-white'
              };
              return (
                <div key={index} className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[platform.statusColor]}`}>
                      {platform.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-4">{platform.name}</h3>
                  <p className="text-brand-600 mb-6">{platform.description}</p>
                  <div className="space-y-3 mb-6">
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-brand-500 mr-3 flex-shrink-0" />
                        <span className="text-brand-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-brand-200 pt-4">
                    <p className="text-sm text-brand-600 mb-2">Export Formats:</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.formats.map((format, formatIndex) => (
                        <span key={formatIndex} className="bg-accent-100 text-accent-700 px-2 py-1 rounded text-xs font-medium">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export Process */}
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
              How Export Process Works
            </h2>
            <p className="text-xl text-brand-600">
              From data selection to download in 4 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-brand-900 mb-4">{step.title}</h3>
                <p className="text-brand-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Export Capabilities
            </h2>
            <p className="text-xl text-brand-600">
              Powerful features for professional data export
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exportFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-4">{feature.title}</h3>
                  <p className="text-brand-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
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
              Technical Specifications
            </h2>
            <p className="text-xl text-brand-600">
              Detailed export capabilities and data formats
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {exportSpecs.map((spec, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
                <h3 className="text-xl font-bold text-brand-900 mb-6 text-center">{spec.title}</h3>
                <ul className="space-y-3">
                  {spec.specs.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-brand-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-brand-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Quality & Compliance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Data Quality & Compliance
            </h2>
            <p className="text-xl text-brand-600">
              Ensuring accuracy, privacy, and regulatory compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
              <div className="w-16 h-16 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">Data Accuracy</h3>
              <ul className="space-y-3 text-brand-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  91% phone number accuracy rate
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Real-time verification processes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Automated data validation
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Regular database updates
                </li>
              </ul>
            </div>
            
            <div className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">Privacy & Compliance</h3>
              <ul className="space-y-3 text-brand-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Secure data handling
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Secure data transmission
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  No personal data storage
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Industry-standard encryption
                </li>
              </ul>
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
            Start Exporting Leads Today
          </h2>
          <p className="text-xl text-accent-100 mb-8">
            Install LeadsAI extension and transform your prospect lists into actionable datasets with verified contact information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chromewebstore.google.com/detail/jbmbaakkgmcjdbncmnikcclljmgeimji?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-accent-600 px-8 py-4 rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <Chrome className="w-5 h-5" />
              <span>Install Extension</span>
            </a>
            <a 
              href="mailto:support@thepeakai.com?subject=LeadsAI Technical Documentation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Technical Docs</span>
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
