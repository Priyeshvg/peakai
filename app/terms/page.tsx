'use client'

import React from 'react';
import { FileText, Users, CreditCard, RefreshCw, AlertTriangle, Scale, Phone, Mail } from 'lucide-react';
import { GridPattern } from '@/components/GridPattern';

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-50 py-20 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-brand-100/35 stroke-brand-100/45"
          squares={[
            [4, 4],
            [6, 6],
            [8, 2],
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-brand-50/60 backdrop-blur-sm border border-brand-200/40 text-brand-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <FileText className="w-4 h-4 mr-2" />
              <span>Terms of Service • Last Updated: May 15, 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-brand-600 max-w-3xl mx-auto">
              These terms govern your access to and use of our Chrome Extension and services. Please read them carefully.
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
                These Terms of Use ("Terms") govern your access to and use of our Chrome Extension and services ("Service"). By using the Service, you agree to these Terms.
              </p>

              <div className="space-y-12">

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">1. Use of Service</h2>
                    <div className="mb-4">
                      <h4 className="font-semibold text-brand-900 mb-2">You may use the Service to:</h4>
                      <ul className="space-y-2 text-brand-700 mb-4">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Submit LinkedIn profile URLs to discover contact information
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Access this data using prepaid or earned credits
                        </li>
                      </ul>
                    </div>
                    <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-800 mb-2">You agree not to:</h4>
                      <ul className="space-y-1 text-brand-700">
                        <li>• Use data for spam, harassment, or illegal activity</li>
                        <li>• Share your account with others</li>
                        <li>• Attempt to reverse engineer or copy the extension</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">2. Account Authentication</h2>
                    <p className="text-brand-700">
                      You must log in via your LinkedIn account. We do not access or post on your behalf.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">3. Credit System & Payments</h2>
                    <ul className="space-y-2 text-brand-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You must purchase credits to unlock phone/email results.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Credits are prepaid and non-refundable once consumed.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        We use Razorpay or equivalent for secure payments.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">4. Cancellation & Refund Policy</h2>
                    <div className="space-y-3 text-brand-700">
                      <p>Since we offer digital services with instant delivery, we do not offer automatic refunds once a contact has been unlocked.</p>
                      <p>If a phone number or email is missing, incorrect, or doesn't belong to the profile, you may request a credit adjustment or refund within 24 hours.</p>
                      <p>We reserve the right to approve or reject refund claims at our sole discretion.</p>
                      <p>For refund requests, contact: <a href="mailto:purvi@thepeakai.com" className="text-accent-600 hover:text-accent-700 font-semibold">purvi@thepeakai.com</a></p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">5. Shipping & Delivery</h2>
                    <div className="space-y-3 text-brand-700">
                      <p>This is a digital product. No physical shipping is required.</p>
                      <p>Shipping is not applicable for business.</p>
                      <p>Once payment is confirmed, credits are added to your account immediately or within 15 minutes.</p>
                      <p>In case of delay, please contact our support team.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">6. Third-Party Data Sources</h2>
                    <p className="text-brand-700">
                      The contact information is obtained from public and third-party databases. Accuracy and availability are not guaranteed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">7. Limitation of Liability</h2>
                    <p className="text-brand-700">
                      We are not responsible for any damages resulting from use of the Service, including lost leads or failed outreach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">8. Termination</h2>
                    <p className="text-brand-700">
                      We may suspend your account if we detect misuse, fraud, or violations of these Terms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-900 mb-4">9. Governing Law</h2>
                    <p className="text-brand-700">
                      These Terms are governed by the laws of India.
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
                      For support or legal inquiries, email us at{' '}
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
