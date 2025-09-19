import React from 'react';
import { CheckCircle, Star, Chrome, ArrowRight, DollarSign, Shield, Target, Users, Zap, Crown } from 'lucide-react';
import { GridPattern } from '../components/GridPattern';
import { ContactModal } from '../components/ContactModal';

export function PricingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-green-100/35 stroke-green-100/45"
          squares={[
            [3, 2],
            [8, 5],
            [13, 1],
            [18, 7],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Credit-Based Pricing
              <span className="block text-green-600">Get More Data for Less</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Phone numbers, emails, director contacts & more. Email enrichment & verification included in all plans.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8 max-w-8xl mx-auto">
            
            {/* Trial Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border-2 border-blue-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Trial</span>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trial Plan</h3>
                <p className="text-gray-600">Perfect for testing</p>
              </div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-5xl font-bold text-green-600">₹1,100</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">500 Credits</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Phone numbers:</strong> 5 credits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Secondary email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>100% credit refund</strong> for wrong numbers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email enrichment included</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors text-center block font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>

            {/* Standard Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border-2 border-green-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard Plan</h3>
                <p className="text-gray-600">For growing teams</p>
              </div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-5xl font-bold text-green-600">₹7,500</span>
                </div>
                <p className="text-sm text-green-600 font-medium">1,250 Credits</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Phone numbers:</strong> 5 credits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Secondary email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>100% credit refund</strong> for wrong numbers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bulk operations & email verification</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors text-center block font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border-2 border-purple-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">Pro</span>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Plan</h3>
                <p className="text-gray-600">For professionals</p>
              </div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-5xl font-bold text-purple-600">₹12,500</span>
                </div>
                <p className="text-sm text-purple-600 font-medium">2,500 Credits</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Phone numbers:</strong> 5 credits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Director phone:</strong> 7 credits</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>100% credit refund</strong> for wrong numbers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited users & priority support</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors text-center block font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border-2 border-orange-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Enterprise</span>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">For large teams</p>
              </div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-5xl font-bold text-orange-600">Custom</span>
                </div>
                <p className="text-sm text-orange-600 font-medium">5,000+ Credits/month</p>
                <p className="text-xs text-gray-500 mt-1">Volume discounts</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Phone numbers:</strong> 5 credits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Director phone:</strong> 7 credits</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>100% credit refund</strong> for wrong numbers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API access & dedicated manager</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange-600 text-white py-4 rounded-xl hover:bg-orange-700 transition-colors text-center block font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Guarantee Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 lg:p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                100% Credit Refund Guarantee
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Wrong number? We'll immediately refund your credits. No questions asked, no verification process needed.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">📞</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Numbers</h3>
                  <p className="text-gray-600">5 credits<br/>Instant refund for wrong numbers</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">📧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">1 credit<br/>Verified and enriched</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">👨‍💼</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Director Phone</h3>
                  <p className="text-gray-600">7 credits<br/>Premium executive contacts</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-2xl">
                <p className="text-lg font-semibold">
                  🛡️ Our 91% accuracy rate is backed by instant credit refunds for any incorrect data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <GridPattern
          width={50}
          height={50}
          className="fill-gray-200/45 stroke-gray-200/65"
          squares={[
            [2, 1],
            [7, 3],
            [11, 6],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Trial</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Standard</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Total Price</td>
                    <td className="px-6 py-4 text-center text-sm text-blue-600 font-bold">₹1,100</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 font-bold">₹7,500</td>
                    <td className="px-6 py-4 text-center text-sm text-purple-600 font-bold">₹12,500</td>
                    <td className="px-6 py-4 text-center text-sm text-orange-600 font-bold">Custom</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Credits Included</td>
                    <td className="px-6 py-4 text-center text-sm text-blue-600">500</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600">1,250</td>
                    <td className="px-6 py-4 text-center text-sm text-purple-600">2,500</td>
                    <td className="px-6 py-4 text-center text-sm text-orange-600">5,000+</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Phone Numbers</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">5 credits</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">5 credits</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">5 credits</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">5 credits</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Email</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">1 credit</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">1 credit</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">1 credit</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">1 credit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Director Phone</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">-</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">-</td>
                    <td className="px-6 py-4 text-center text-sm text-purple-600">7 credits</td>
                    <td className="px-6 py-4 text-center text-sm text-orange-600">7 credits</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Unlimited Users</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">-</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">-</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Bulk Operations</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">-</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">Email Enrichment & Verification</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pricing FAQs
            </h2>
            <p className="text-xl text-gray-600">Common questions about our pricing</p>
          </div>
          <div className="grid gap-6">
            <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                Are there any hidden fees?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">No hidden fees, no monthly subscriptions, no setup costs. You only pay for the verified phone numbers you successfully retrieve.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                What happens if a phone number is wrong?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">We'll immediately refund your credits back to your account. No questions asked, no complicated verification process. We stand behind our 91% accuracy rate.</p>
              <div className="bg-white/80 p-4 rounded-xl border border-blue-200">
                <p className="text-blue-800 font-semibold">
                  🔄 <strong>Instant Refund Policy:</strong> Wrong phone number = Credits back immediately
                </p>
              </div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-6 h-6 text-orange-600 mr-3" />
                How do I purchase credits?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">Credits are purchased directly through the Chrome extension. We accept all major payment methods and provide instant credit top-up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
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
            Start Finding Contacts Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get 500 credits for just ₹1,100. Phone numbers, emails & more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <Chrome className="w-5 h-5" />
              <span>Add to Chrome - Free</span>
            </a>
            <a 
              href="https://cal.com/peakai-demo/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Enterprise Pricing</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}