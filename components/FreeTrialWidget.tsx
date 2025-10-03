import React, { useState } from 'react';
import { Play, CheckCircle, AlertCircle, Loader2, Gift, Star, ArrowRight } from 'lucide-react';

interface TrialState {
  status: 'idle' | 'processing' | 'success' | 'error';
  message: string;
  phoneNumber?: string;
}

export function FreeTrialWidget() {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [trial, setTrial] = useState<TrialState>({ status: 'idle', message: '' });
  const [email, setEmail] = useState('');

  const isValidLinkedInUrl = (url: string) => {
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/;
    return linkedinRegex.test(url);
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidLinkedInUrl(linkedinUrl)) {
      setTrial({
        status: 'error',
        message: 'Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)'
      });
      return;
    }

    // Track trial attempt
    if (window.gtag) {
      window.gtag('event', 'trial_attempt', {
        send_to: 'AW-17139273262/conversion',
        value: 11,
        currency: 'INR'
      });
    }
    
    // Redirect to Chrome Web Store directly
    window.open('https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=trial-form', '_blank');
  };

  const handleGetFullAccess = () => {
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17139273262/conversion',
        value: 11,
        currency: 'INR'
      });
    }
    
    // Redirect to Chrome Web Store
    window.open('https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=trial-widget', '_blank');
  };

  return (
    <div className="bg-brand-50 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-accent-50 text-accent-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Gift className="w-4 h-4 mr-2" />
            Try now with 10 free credits
          </div>
          <h3 className="text-3xl font-bold text-brand-900 mb-4">
            Try PeakAI Right Now
          </h3>
          <p className="text-lg text-brand-700 max-w-2xl mx-auto">
            Test our phone number finder with any LinkedIn profile. See the accuracy for yourself before installing.
          </p>
        </div>

        {/* Trial Form */}
        <form onSubmit={handleTrialSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <label htmlFor="linkedin-url" className="block text-sm font-semibold text-brand-700 mb-3">
              Enter any LinkedIn profile URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="linkedin-url"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="flex-1 p-4 text-base sm:text-lg border-2 border-brand-200 rounded-xl focus:border-accent-600 focus:outline-none transition-colors"
                disabled={trial.status === 'processing'}
              />
              <button
                type="submit"
                disabled={trial.status === 'processing' || !linkedinUrl}
                className="bg-accent-600 text-white px-6 sm:px-8 py-4 rounded-xl hover:bg-accent-700 transition-all duration-200 font-semibold disabled:bg-brand-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {trial.status === 'processing' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                {trial.status === 'processing' ? 'Finding...' : 'Find Phone'}
              </button>
            </div>
          </div>

          {/* Trial Status */}
          {trial.status !== 'idle' && (
            <div className={`rounded-2xl p-6 mb-6 ${
              trial.status === 'success' ? 'bg-accent-50 border border-accent-200' :
              trial.status === 'error' ? 'bg-brand-50 border border-brand-200' :
              'bg-accent-50 border border-accent-200'
            }`}>
              <div className="flex items-center mb-4">
                {trial.status === 'success' && <CheckCircle className="w-6 h-6 text-accent-600 mr-3" />}
                {trial.status === 'error' && <AlertCircle className="w-6 h-6 text-brand-700 mr-3" />}
                {trial.status === 'processing' && <Loader2 className="w-6 h-6 text-accent-600 mr-3 animate-spin" />}
                <span className={`font-semibold text-lg ${
                  trial.status === 'success' ? 'text-accent-600' :
                  trial.status === 'error' ? 'text-brand-700' :
                  'text-accent-600'
                }`}>
                  {trial.message}
                </span>
              </div>

              {trial.status === 'success' && trial.phoneNumber && (
                <div className="bg-white/80 rounded-xl p-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-900 mb-2">{trial.phoneNumber}</div>
                    <div className="text-sm text-brand-700">✓ Verified phone number</div>
                  </div>
                </div>
              )}

              {trial.status === 'success' && (
                <div className="text-center">
                  <p className="text-accent-600 mb-4">
                    This is just a demo! Install PeakAI to get real phone numbers from any LinkedIn profile.
                  </p>
                  <button
                    onClick={handleGetFullAccess}
                    className="bg-accent-600 text-white px-8 py-3 rounded-xl hover:bg-accent-700 transition-all duration-200 font-semibold flex items-center gap-2 mx-auto"
                  >
                    <span>Get Full Access - First 100 for ₹11</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {trial.status === 'processing' && (
                <div className="text-center">
                  <p className="text-accent-600">
                    Searching through our database of verified contacts...
                  </p>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent-600" />
            </div>
            <h4 className="font-semibold text-brand-900 mb-2">91% Accuracy</h4>
            <p className="text-sm text-brand-700">Highest accuracy rate in the industry</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-accent-600" />
            </div>
            <h4 className="font-semibold text-brand-900 mb-2">₹11/Contact</h4>
            <p className="text-sm text-brand-700">First 100 contacts at special price</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-accent-600" />
            </div>
            <h4 className="font-semibold text-brand-900 mb-2">10 Seconds</h4>
            <p className="text-sm text-brand-700">Find phone numbers instantly</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-brand-50 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div className="flex items-center">
              <div className="flex text-brand-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-brand-700">4.9/5 rating</span>
            </div>
            <div className="text-sm text-brand-700">1,000+ happy users</div>
            <div className="text-sm text-brand-700">GDPR compliant</div>
          </div>
          <p className="text-xs text-brand-500">
            10 free credits available • Install extension for full access • 100% credit refund guarantee
          </p>
        </div>
      </div>
    </div>
  );
}