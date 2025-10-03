'use client'

import React from 'react';
import { Chrome, Zap, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GridPattern } from './GridPattern';
import { Breadcrumbs } from './Breadcrumbs';
import { EarlyAccessPopup } from './EarlyAccessPopup';
import { useUserTracking } from '@/hooks/useUserTracking';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { shouldShowPopup, hidePopup } = useUserTracking();

  const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'LeadsAI', href: '/leads-ai' },
    { name: 'Director Phone', href: '/director-phone' },
    { name: 'Unlimited Email', href: '/unlimited-email' },
    { name: 'Partners', href: '/partners' },
    { name: 'Dashboard', href: null, onClick: () => window.open('https://studio.thepeakai.com', '_blank') },
  ];

  const handleLimitedOfferClick = () => {
    window.open('https://cal.com/peakai-demo/15min', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div
        onClick={handleLimitedOfferClick}
        className="bg-brand-900 text-white text-center py-3 relative overflow-hidden cursor-pointer hover:bg-brand-800 transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-semibold hover:scale-105 transition-transform duration-300">
            <span className="bg-white text-brand-900 px-3 py-1 rounded-full mx-1 font-bold">LIMITED TIME</span>
            First 100 contacts for just ₹11 each (56% off) - <span className="bg-accent-100 text-brand-900 px-3 py-1 rounded-full font-bold">Only 47 spots left!</span>
            <span className="ml-2 text-xs opacity-75">Click to claim →</span>
          </p>
        </div>
      </div>

      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-brand-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50/30 via-white/40 to-brand-50/30"></div>
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-brand-100/20 stroke-brand-200/30 absolute inset-0"
          squares={[
            [1, 1],
            [3, 3],
            [5, 1],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Zap className="w-7 h-7 text-accent-600 group-hover:text-accent-700 transition-colors duration-200" />
              <span className="text-2xl font-bold text-brand-900">PeakAI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-1 justify-end space-x-1" role="navigation">
              {navigation.map((item) => {
                if (item.onClick) {
                  return (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-brand-600 hover:text-brand-900 hover:bg-brand-50"
                    >
                      {item.name}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'text-accent-600 bg-accent-50'
                        : 'text-brand-600 hover:text-brand-900 hover:bg-brand-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-brand-700 hover:text-accent-600 hover:bg-brand-50 transition-all duration-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-brand-200/50">
              <nav className="space-y-3" role="navigation" aria-label="Mobile navigation">
                {navigation.map((item) => {
                  if (item.onClick) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-brand-700 hover:text-accent-600 hover:bg-brand-50"
                      >
                        {item.name}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        pathname === item.href
                          ? 'text-accent-600 bg-accent-50/80 backdrop-blur-sm'
                          : 'text-brand-700 hover:text-accent-600 hover:bg-brand-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-brand-200/50">
                  <a
                    href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-accent-600 text-white px-8 py-4 rounded-2xl text-center text-sm font-semibold shadow-xl hover:bg-accent-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Chrome className="w-5 h-5" />
                      <span>Add to Chrome - Free</span>
                    </div>
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Main Content */}
      <main role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">PeakAI</span>
              </div>
              <p className="text-brand-300">
                The most accurate LinkedIn phone number finder with 100% credit refund guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <nav>
                <ul className="space-y-2 text-brand-300">
                  <li><a href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chrome Extension</a></li>
                  <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/unlimited-email" className="hover:text-white transition-colors">Unlimited Email</Link></li>
                  <li><Link href="/leads-ai" className="hover:text-white transition-colors">LeadsAI</Link></li>
                  <li><Link href="/director-phone" className="hover:text-white transition-colors">Director Numbers</Link></li>
                  <li><Link href="/msme" className="hover:text-white transition-colors">MSME Directory</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <nav>
                <ul className="space-y-2 text-brand-300">
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <nav>
                <ul className="space-y-2 text-brand-300">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/partner-program" className="hover:text-white transition-colors">Partner Program</Link></li>
                  <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                  <li><a href="mailto:careers@thepeakai.com" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="border-t border-brand-800 mt-8 pt-8 text-center text-brand-300">
            <p>&copy; 2024 PeakAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <EarlyAccessPopup isOpen={shouldShowPopup} onClose={hidePopup} />

      {/* Floating Add to Chrome Button */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
        <a
          href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-600 text-white px-6 py-3 rounded-full hover:bg-accent-700 transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-xl transform hover:scale-105 group"
          aria-label="Add PeakAI Chrome extension"
        >
          <Chrome className="w-5 h-5" />
          <span className="font-semibold text-sm">Add to Chrome</span>
          <div className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Free</div>
        </a>
      </div>
    </div>
  );
}