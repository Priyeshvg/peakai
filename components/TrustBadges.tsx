import React, { useState, useEffect } from 'react';
import { Shield, Lock, CheckCircle, Star, Users, Award, Globe, Zap } from 'lucide-react';

interface TrustBadge {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: boolean;
}

interface CustomerLogo {
  name: string;
  initials: string;
  color: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: Lock,
    title: 'SSL Encrypted',
    description: 'All data transmission protected with 256-bit encryption'
  },
  {
    icon: CheckCircle,
    title: '91% Accuracy',
    description: 'Industry-leading phone number accuracy rate'
  },
  {
    icon: Users,
    title: '100+ Active Users',
    description: 'Trusted by sales teams and recruiters worldwide'
  },
];

const customerLogos: CustomerLogo[] = [
  { name: 'BharatX', initials: 'BX', color: 'from-accent-600 to-accent-700' },
  { name: 'Local Narratives', initials: 'LN', color: 'from-accent-600 to-accent-700' },
  { name: 'Dashloc', initials: 'DL', color: 'from-brand-600 to-brand-700' },
  { name: 'Tophire', initials: 'TH', color: 'from-accent-600 to-accent-700' },
  { name: 'Bitscale.ai', initials: 'BA', color: 'from-brand-600 to-brand-700' },
  { name: 'TechStart', initials: 'TS', color: 'from-accent-600 to-accent-700' },
  { name: 'PropCorp', initials: 'PC', color: 'from-brand-600 to-brand-700' },
  { name: 'FinanceFlow', initials: 'FF', color: 'from-accent-600 to-accent-700' },
  { name: 'Growth Agency', initials: 'GA', color: 'from-brand-600 to-brand-700' },
  { name: 'DataMine', initials: 'DM', color: 'from-accent-600 to-accent-700' }
];

const certifications = [
  {
    name: 'Google Partners',
    badge: '🏆',
    description: 'Verified Google Partners status'
  },
  {
    name: 'Chrome Web Store',
    badge: '🥇',
    description: 'Featured extension with 4.9★ rating'
  },
  {
    name: 'Privacy Shield',
    badge: '🛡️',
    description: 'Privacy framework compliant'
  }
];

function RotatingLogos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + visibleCount) % customerLogos.length
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % customerLogos.length;
      visible.push(customerLogos[index]);
    }
    return visible;
  };
  
  return (
    <div className="text-center">
      <h4 className="text-lg font-semibold text-brand-900 mb-6">Trusted by Sales Teams & Recruiters Worldwide</h4>
      <div className="flex items-center justify-center gap-8 overflow-hidden">
        {getVisibleLogos().map((logo, index) => (
          <div
            key={`${currentIndex}-${index}`}
            className="group relative animate-in fade-in slide-in-from-right-8 duration-500"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${logo.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              {logo.initials}
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                {logo.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(customerLogos.length / visibleCount) }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              Math.floor(currentIndex / visibleCount) === index
                ? 'bg-accent-600'
                : 'bg-brand-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustBadges() {
  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 overflow-hidden">
      {/* Header */}
      <div className="bg-accent-50 px-8 py-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-accent-600 mr-3" />
            <h3 className="text-2xl font-bold text-brand-900">Trusted & Secure</h3>
          </div>
          <p className="text-brand-700 max-w-2xl mx-auto">
            Your data security and privacy are our top priorities. We maintain the highest standards of compliance and security.
          </p>
        </div>
      </div>

      {/* Trust Badges Grid */}
      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  badge.highlight
                    ? 'bg-accent-50 border-accent-200/50'
                    : 'bg-white/50 border-brand-200/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    badge.highlight
                      ? 'bg-accent-600 text-white'
                      : 'bg-accent-50 text-accent-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-900">{badge.title}</h4>
                    {badge.highlight && (
                      <div className="flex items-center text-accent-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-brand-700">{badge.description}</p>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-brand-50 rounded-2xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-brand-900 mb-4 text-center">Certifications & Partnerships</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4 bg-white/60 rounded-xl border border-white/50">
                <div className="text-2xl mb-2">{cert.badge}</div>
                <div className="font-semibold text-brand-900 text-sm">{cert.name}</div>
                <div className="text-xs text-brand-700 mt-1">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-accent-50 rounded-2xl p-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">100+</div>
              <div className="text-sm text-brand-700">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">91%</div>
              <div className="text-sm text-brand-700">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">100%</div>
              <div className="text-sm text-brand-700">Refund Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
              <div className="text-sm text-brand-700">Security Monitoring</div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-brand-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-brand-900">4.9</span>
            <span className="text-brand-700 ml-2">out of 5</span>
          </div>
          <p className="text-brand-700">
            Based on 1,000+ reviews from verified customers
          </p>
        </div>
      </div>
    </div>
  );
}