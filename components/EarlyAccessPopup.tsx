import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Star, Zap } from 'lucide-react';

interface EarlyAccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarlyAccessPopup({ isOpen, onClose }: EarlyAccessPopupProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !phone) {
      alert('Please fill in both email and phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://automation.sayf.in/webhook/early_access', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({
          email: email,
          phone: phone,
          product: 'PeakAI',
          type: 'early_access',
          source: 'landing_page',
          message: 'PeakAI early access signup - LinkedIn phone number finder'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setEmail('');
          setPhone('');
        }, 3000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-2xl font-bold text-brand-900 mb-2">
            Thank You!
          </h3>
          <p className="text-brand-700">
            We'll be in touch soon with your special offer details!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-500 hover:text-brand-700 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-brand-900 mb-2">
            🔥 Exclusive Early Access
          </h3>
          <p className="text-brand-700 mb-4">
            Get your first <span className="font-bold text-accent-600">100 contacts for just ₹11</span> each!
          </p>
          <div className="flex items-center justify-center space-x-1 mb-4">
            <div className="flex text-brand-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-brand-700 ml-2">4.9/5 from 1,000+ users</span>
          </div>
          <p className="text-sm text-accent-600 font-semibold">
            ⏰ Limited time offer - Only 47 spots left!
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-500 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 border border-brand-200 rounded-xl focus:ring-2 focus:ring-accent-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-brand-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-500 w-5 h-5" />
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full pl-12 pr-4 py-3 border border-brand-200 rounded-xl focus:ring-2 focus:ring-accent-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-600 text-white py-4 rounded-xl hover:bg-accent-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Claiming Your Spot...' : 'Claim My ₹11 Offer 🚀'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-brand-500">
            By signing up, you agree to our Terms of Service and Privacy Policy.
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}