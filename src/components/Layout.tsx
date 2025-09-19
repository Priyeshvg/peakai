import React from 'react';
import { Chrome, Shield, Zap, Star, Menu, X, ExternalLink, Mail, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GridPattern } from './GridPattern';
import { Breadcrumbs } from './Breadcrumbs';
import { EarlyAccessPopup } from './EarlyAccessPopup';
import { LiveChatSupport } from './LiveChatSupport';
import { useUserTracking } from '../hooks/useUserTracking';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { shouldShowPopup, hidePopup } = useUserTracking();

  const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'LeadsAI', href: '/leads-ai' },
    { name: 'Director Phone', href: '/director-phone' },
    { name: 'Partners', href: '/partners' },
  ];

  const handleDashboardClick = () => {
    window.open('https://studio.thepeakai.com', '_blank');
  };

  const handleLimitedOfferClick = () => {
    window.open('https://cal.com/peakai-demo/15min', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div 
        onClick={handleLimitedOfferClick}
        className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-3 relative overflow-hidden cursor-pointer hover:from-red-700 hover:to-orange-700 transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-semibold animate-pulse hover:scale-105 transition-transform duration-300">
            🔥 <span className="bg-white text-red-600 px-2 py-1 rounded-full mx-1 font-bold">LIMITED TIME</span> 
            First 100 contacts for just ₹11 each (56% off) - <span className="bg-yellow-400 text-red-800 px-2 py-1 rounded-full font-bold">Only 47 spots left!</span>
            <span className="ml-2 text-xs opacity-75">Click to claim →</span>
          </p>
        </div>
      </div>

      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white/40 to-purple-50/30"></div>
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-gray-100/20 stroke-gray-100/30 absolute inset-0"
          squares={[
            [1, 1],
            [3, 3],
            [5, 1],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-6">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  PeakAI
                </span>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-500 font-medium">4.9 • 100+ users</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Moved to Floating Island */}

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={handleDashboardClick}
                className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 text-sm font-semibold shadow-lg hover:shadow-xl"
                aria-label="Access Dashboard"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>
              <a 
                href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 text-sm font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                aria-label="Add PeakAI Chrome extension"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Chrome className="w-5 h-5" />
                  <span>Add to Chrome</span>
                  <div className="bg-white/20 text-xs px-3 py-1 rounded-full backdrop-blur-sm">Free</div>
                </div>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 transition-all duration-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-gray-100/50">
              <nav className="space-y-3" role="navigation" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      location.pathname === item.href
                        ? 'text-blue-600 bg-blue-50/80 backdrop-blur-sm'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/60'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100/50 space-y-3">
                  <button
                    onClick={() => {
                      handleDashboardClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-center text-sm font-semibold shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Dashboard</span>
                    </div>
                  </button>
                  <a 
                    href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-center text-sm font-semibold shadow-xl"
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
      <footer className="bg-gray-900 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">PeakAI</span>
              </div>
              <p className="text-gray-400">
                The most accurate LinkedIn phone number finder with 100% credit refund guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <nav>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chrome Extension</a></li>
                  <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/unlimited-email" className="hover:text-white transition-colors">Unlimited Email</Link></li>
                  <li><Link to="/leads-ai" className="hover:text-white transition-colors">LeadsAI</Link></li>
                  <li><Link to="/director-phone" className="hover:text-white transition-colors">Director Numbers</Link></li>
                  <li><Link to="/msme" className="hover:text-white transition-colors">MSME Directory</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <nav>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <nav>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/partner-program" className="hover:text-white transition-colors">Partner Program</Link></li>
                  <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                  <li><a href="mailto:careers@thepeakai.com" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PeakAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <EarlyAccessPopup isOpen={shouldShowPopup} onClose={hidePopup} />
      <LiveChatSupport />

      {/* Floating Left Side Navigation with Text Labels */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {/* Dashboard */}
        <button
          onClick={handleDashboardClick}
          className="group flex items-center gap-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Access Dashboard"
        >
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">Dashboard</span>
        </button>

        {/* Features */}
        <Link
          to="/features"
          className="group flex items-center gap-3 bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Features"
        >
          <Star className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">Features</span>
        </Link>

        {/* Pricing */}
        <Link
          to="/pricing"
          className="group flex items-center gap-3 bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Pricing"
        >
          <span className="text-sm font-bold">₹</span>
          <span className="text-sm font-medium whitespace-nowrap">Pricing</span>
        </Link>

        {/* LeadsAI */}
        <Link
          to="/leads-ai"
          className="group flex items-center gap-3 bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="LeadsAI"
        >
          <Zap className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">LeadsAI</span>
        </Link>

        {/* Director Phone */}
        <Link
          to="/director-phone"
          className="group flex items-center gap-3 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Find Company Directors Phone Numbers"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">Director Phone</span>
        </Link>

        {/* Unlimited Work Email */}
        <Link
          to="/unlimited-email"
          className="group flex items-center gap-3 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Unlimited Work Email"
        >
          <Mail className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">Unlimited Email</span>
        </Link>

        {/* Partners */}
        <Link
          to="/partners"
          className="group flex items-center gap-3 bg-gradient-to-br from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Partners"
        >
          <ExternalLink className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap">Partners</span>
        </Link>
      </div>
    </div>
  );
}