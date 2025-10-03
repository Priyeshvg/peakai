'use client';

import React from 'react';
import { Shield, Lock, Eye, UserCheck, FileText, Mail } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function PrivacyPolicyPage() {
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
            <div className="inline-flex items-center bg-accent-50/60 backdrop-blur-sm border border-accent-200/40 text-accent-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Shield className="w-4 h-4 mr-2" />
              <span>Your Privacy Matters • Last Updated: May 15, 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              We're committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-12">

            <div className="prose prose-lg max-w-none">
              <p className="text-brand-600 mb-8">
                Thank you for using our Chrome Extension ("we," "us," or "our"). This Privacy Policy explains how we collect, use, and protect your information.
              </p>

              <div className="space-y-12">

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">1. Information We Collect</h2>
                    <p className="text-brand-700 mb-4">We collect the following information:</p>
                    <ul className="space-y-2 text-brand-700 mb-4">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Public LinkedIn profile data (via LinkedIn login)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        LinkedIn URLs you input to fetch contact details
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Email address associated with your LinkedIn account
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Usage statistics (e.g., credits used, time of access)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Payment confirmation data (via Razorpay or equivalent provider)
                      </li>
                    </ul>
                    <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-800 mb-2">We do NOT collect:</h4>
                      <ul className="space-y-1 text-brand-700">
                        <li>• Your LinkedIn password</li>
                        <li>• Private LinkedIn messages</li>
                        <li>• Payment card or UPI credentials</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">2. Platform Acceptance</h2>
                    <p className="text-brand-700">
                      By installing and signing up for our Chrome extension, you automatically accept and agree to become a user of the PeakAI platform. This includes acceptance of our Terms of Service, Privacy Policy, and all platform guidelines. Your continued use of the extension constitutes ongoing acceptance of these terms and any updates made to them.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">3. How We Use Your Information</h2>
                    <p className="text-brand-700 mb-4">We use the data to:</p>
                    <ul className="space-y-2 text-brand-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Authenticate your identity
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Track your credit balance and lookup history
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Provide customer support
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Improve and optimize our service
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Comply with legal or tax obligations
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">4. Sharing of Information</h2>
                    <p className="text-brand-700">
                      We do not sell, rent, or trade your personal data. Contact information revealed through our tool is fetched from third-party or publicly available data sources on a best-effort basis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">5. Payment & Processing</h2>
                    <p className="text-brand-700">
                      Payments are handled securely through Razorpay. We do not store any of your payment credentials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">6. Data Security</h2>
                    <p className="text-brand-700">
                      We use industry-standard security tools and practices. However, no system can guarantee 100% protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">7. Data Retention</h2>
                    <p className="text-brand-700">
                      Your basic account data and usage logs are retained as long as your account is active or as required by law.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">8. Your Rights</h2>
                    <p className="text-brand-700">
                      You can request access to, correction of, or deletion of your data by contacting us at{' '}
                      <a href="mailto:purvi@thepeakai.com" className="text-accent-600 hover:text-accent-700 font-semibold">
                        purvi@thepeakai.com
                      </a>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">9. Updates</h2>
                    <p className="text-brand-700">
                      We may update this policy. Material changes will be posted on our website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">10. Contact</h2>
                    <p className="text-brand-700">
                      If you have questions, contact us at{' '}
                      <a href="mailto:purvi@thepeakai.com" className="text-accent-600 hover:text-accent-700 font-semibold">
                        purvi@thepeakai.com
                      </a>.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-8 mt-12">
                  <p className="text-brand-600 text-center">
                    © 2024 <strong>Wealides Fintech Private Limited</strong>. All rights reserved.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
