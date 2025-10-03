import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

interface CalculatorResult {
  contacts: number;
  totalCost: number;
  costPerContact: number;
  savings: number;
  competitorCost: number;
  plan: string;
}

export function PricingCalculator() {
  const [contacts, setContacts] = useState(100);
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const calculatePricing = (contactCount: number): CalculatorResult => {
    let totalCost = 0;
    let plan = '';
    
    if (contactCount <= 100) {
      totalCost = contactCount * 11;
      plan = 'Starter (First 100)';
    } else {
      totalCost = (100 * 11) + ((contactCount - 100) * 25);
      plan = contactCount >= 500 ? 'Enterprise' : 'Professional';
    }
    
    // Apply enterprise discounts for 500+ contacts
    if (contactCount >= 500) {
      const regularCost = (100 * 11) + ((contactCount - 100) * 25);
      const discountRate = contactCount >= 1000 ? 0.4 : contactCount >= 750 ? 0.3 : 0.2;
      totalCost = regularCost * (1 - discountRate);
      plan = `Enterprise (${Math.round(discountRate * 100)}% discount)`;
    }
    
    const costPerContact = totalCost / contactCount;
    const competitorCost = contactCount * 60; // ₹60 per contact for competitors
    const savings = competitorCost - totalCost;
    
    return {
      contacts: contactCount,
      totalCost,
      costPerContact,
      savings,
      competitorCost,
      plan
    };
  };

  const result = calculatePricing(contacts);
  const yearlyResult = calculatePricing(contacts * 12);

  return (
    <div className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center mr-4">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-brand-900">Pricing Calculator</h3>
          <p className="text-brand-700">See how much you'll save with PeakAI</p>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div>
          <label htmlFor="contacts" className="block text-sm font-semibold text-brand-700 mb-3">
            Number of contacts needed
          </label>
          <div className="relative">
            <input
              id="contacts"
              type="number"
              min="1"
              max="10000"
              value={contacts}
              onChange={(e) => setContacts(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-4 text-lg font-semibold text-brand-900 bg-white/50 border-2 border-brand-200 rounded-xl focus:border-accent-600 focus:outline-none transition-colors"
              placeholder="100"
            />
            <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-700 mb-3">
            Time period
          </label>
          <div className="flex bg-brand-50 rounded-xl p-1">
            <button
              onClick={() => setPeriod('monthly')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                period === 'monthly'
                  ? 'bg-white text-accent-600 shadow-md'
                  : 'text-brand-700 hover:text-brand-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                period === 'yearly'
                  ? 'bg-white text-accent-600 shadow-md'
                  : 'text-brand-700 hover:text-brand-900'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-accent-50 rounded-2xl p-6 mb-6">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-600 mb-2">
              ₹{Math.round(period === 'monthly' ? result.totalCost : yearlyResult.totalCost).toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-brand-700">
              Total cost ({period === 'monthly' ? 'monthly' : 'yearly'})
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-600 mb-2">
              ₹{Math.round(period === 'monthly' ? result.costPerContact : yearlyResult.costPerContact)}
            </div>
            <div className="text-xs sm:text-sm text-brand-700">Per contact</div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent-600 mb-2">
              ₹{Math.round(period === 'monthly' ? result.savings : yearlyResult.savings).toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-brand-700">You save vs competitors</div>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white/50 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-brand-900">
            Recommended Plan: {period === 'monthly' ? result.plan : yearlyResult.plan}
          </h4>
          <div className="flex items-center text-accent-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">
              {Math.round(((period === 'monthly' ? result.savings : yearlyResult.savings) / (period === 'monthly' ? result.competitorCost : yearlyResult.competitorCost)) * 100)}% savings
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-accent-600 mr-2" />
            <span className="text-brand-700">91% accuracy guarantee</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-accent-600 mr-2" />
            <span className="text-brand-700">100% credit refund for wrong numbers</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-accent-600 mr-2" />
            <span className="text-brand-700">10-second phone number discovery</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-accent-600 mr-2" />
            <span className="text-brand-700">Secure & reliable</span>
          </div>
        </div>
      </div>

      {/* Comparison with Competitors */}
      <div className="bg-brand-50 rounded-2xl p-6 mb-6">
        <h4 className="text-lg font-semibold text-brand-900 mb-4">Cost Comparison</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="font-semibold text-accent-600">PeakAI</span>
            <span className="text-lg font-bold text-accent-600">
              ₹{Math.round(period === 'monthly' ? result.totalCost : yearlyResult.totalCost).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-brand-50 rounded-lg">
            <span className="text-brand-700">Competitors (avg ₹60/contact)</span>
            <span className="text-lg font-bold text-brand-700">
              ₹{Math.round(period === 'monthly' ? result.competitorCost : yearlyResult.competitorCost).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-accent-600 text-white px-8 py-4 rounded-xl hover:bg-accent-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span>Get Started - Add to Chrome</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
        <p className="text-sm text-brand-700 mt-3">
          Install free • No monthly fees • Pay only for verified contacts
        </p>
      </div>
    </div>
  );
}