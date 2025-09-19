import React from 'react';
import { Chrome, Shield, Target, Zap, CheckCircle, Star, Users, ArrowRight, Phone, DollarSign, TrendingUp, Lock, ChevronDown, ChevronUp, Crown } from 'lucide-react';
import { GridPattern } from '../components/GridPattern';
import { ContactModal } from '../components/ContactModal';
import { DetailedCaseStudies } from '../components/DetailedCaseStudies';
import { FreeTrialWidget } from '../components/FreeTrialWidget';
import { TrustBadges } from '../components/TrustBadges';

const customerLogos = [
  { name: 'BharatX', initials: 'BX', color: 'from-green-500 to-emerald-600' },
  { name: 'Local Narratives', initials: 'LN', color: 'from-blue-500 to-cyan-600' },
  { name: 'Dashloc', initials: 'DL', color: 'from-purple-500 to-indigo-600' },
  { name: 'Tophire', initials: 'TH', color: 'from-red-500 to-pink-600' },
  { name: 'Bitscale.ai', initials: 'BA', color: 'from-cyan-500 to-blue-600' },
  { name: 'TechStart', initials: 'TS', color: 'from-orange-500 to-red-600' },
  { name: 'PropCorp', initials: 'PC', color: 'from-pink-500 to-rose-600' },
  { name: 'FinanceFlow', initials: 'FF', color: 'from-teal-500 to-green-600' },
  { name: 'Growth Agency', initials: 'GA', color: 'from-indigo-500 to-purple-600' },
  { name: 'DataMine', initials: 'DM', color: 'from-yellow-500 to-orange-600' }
];

function TrustedLogos() {
  return (
    <div className="text-center mb-16">
      <h4 className="text-lg font-semibold text-gray-900 mb-6">Trusted by Sales Teams & Recruiters Worldwide</h4>
      <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
        <div className="flex animate-pulse hover:animate-none">
          {customerLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-none mx-8 text-center transition-all duration-300 hover:scale-110"
            >
              <div className={`px-6 py-4 bg-gradient-to-br ${logo.color} rounded-2xl shadow-lg mx-auto mb-3 transition-all duration-300 hover:shadow-xl`}>
                <p className="text-sm font-bold text-white whitespace-nowrap">{logo.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "PeakAI saved our team 10 hours per week. The accuracy is great - most numbers work perfectly.",
    author: "Vaishnavi",
    position: "Founder, Local Narratives",
    avatar: "V",
    color: "bg-blue-500"
  },
  {
    quote: "Great tool for building our sales pipeline. Helps us connect with prospects efficiently.",
    author: "Tophire Team",
    position: "Founder, Tophire",
    avatar: "T",
    color: "bg-green-500"
  },
  {
    quote: "Perfect for finding company directors' phone numbers instantly from company names. Very efficient.",
    author: "Director",
    position: "CA Firm",
    avatar: "D",
    color: "bg-orange-500"
  }
];

function RotatingTestimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              index === currentIndex
                ? 'opacity-100 transform translate-x-0'
                : 'opacity-0 transform translate-x-4 absolute top-0 left-0 right-0'
            }`}
          >
            <article className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <div className="flex items-center mb-4 justify-center" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed text-center">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-lg">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`Show testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  
  const rotatingTexts = [
    "Lightning Fast & Reliably",
    "Instantly & Accurately"
  ];

  // Add structured data for the home page
  React.useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PeakAI LinkedIn Phone Finder",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Chrome",
      "description": "Chrome extension to find verified phone numbers from LinkedIn profiles with 91% accuracy",
      "url": "https://thepeakai.com",
      "downloadUrl": "https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph",
      "offers": {
        "@type": "Offer",
        "price": "11",
        "priceCurrency": "INR",
        "description": "First 100 contacts for ₹11 each"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1000",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Rotate text every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      question: "How does the 100% credit refund guarantee work?",
      answer: "If any phone number we provide is incorrect, we'll credit back 100% refund to your account immediately. No questions asked, no complicated process.",
      icon: Shield
    },
    {
      question: "Can recruiters use this to find candidate phone numbers?",
      answer: "Absolutely! PeakAI works perfectly for both sales teams reaching prospects and recruiters contacting potential candidates on LinkedIn. Many HR teams use it daily.",
      icon: Users
    },
    {
      question: "How does the credit system work?",
      answer: "Our plans are credit-based: Trial (₹1,100 for 500 credits), Standard (₹7,500 for 1,250 credits), Pro (₹12,500 for 2,500 credits). Phone numbers: 5 credits, Email: 1 credit, Director phones: 7 credits. 100% credit refund for wrong numbers.",
      icon: DollarSign
    },
    {
      question: "How fast can I find phone numbers?",
      answer: "Phone numbers appear in just 10 seconds! Simply visit any LinkedIn profile and click on the PeakAI extension. No manual searching or data exports needed.",
      icon: Target
    },
    {
      question: "Is my data safe and secure?",
      answer: "Yes, we prioritize your privacy and security. We don't store your LinkedIn data, and all communications are encrypted. Your usage remains completely private.",
      icon: Lock
    },
    {
      question: "Do I need to install any software?",
      answer: "Just install our Chrome extension - it's completely free and takes less than 30 seconds. No additional software, downloads, or complex setup required.",
      icon: Chrome
    },
    {
      question: "What if I need bulk phone numbers?",
      answer: "Bulk operations are available on Standard plans and above (₹7,500+). Enterprise clients get advanced bulk features, volume discounts, and API access.",
      icon: TrendingUp
    },
    {
      question: "How accurate are the phone numbers?",
      answer: "We maintain 91% accuracy rate, which is significantly higher than competitors. That's why we're confident enough to offer 100% credit refund guarantee for any incorrect numbers.",
      icon: CheckCircle
    },
    {
      question: "Can I use this for director-level contacts?",
      answer: "Yes! Director phone numbers are available on Pro and Enterprise plans for 7 credits each (available on request). These include C-level executives with enhanced verification.",
      icon: Crown
    },
    {
      question: "Do you offer white-label or partner programs?",
      answer: "Yes! We offer a comprehensive partner program with 25% revenue share, white-label options, and dedicated support. Perfect for agencies and consultants looking to add phone finding to their services.",
      icon: Users
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-blue-100/35 stroke-blue-100/45"
          squares={[
            [4, 4],
            [6, 6],
            [8, 2],
            [12, 8],
            [15, 5],
            [18, 12],
            [20, 3],
            [22, 9],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Shield className="w-4 h-4 mr-2" />
              <span>100% Credit Refund Guarantee • Secure & Private</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find LinkedIn Phone Numbers
              <span className="block text-blue-600 relative h-[1.2em] overflow-hidden">
                <span 
                  className="absolute inset-0 transition-all duration-700 ease-in-out transform"
                  style={{
                    transform: `translateY(${currentTextIndex === 0 ? '0%' : '-100%'})`,
                    opacity: currentTextIndex === 0 ? 1 : 0
                  }}
                >
                  Lightning Fast & Reliably
                </span>
                <span 
                  className="absolute inset-0 transition-all duration-700 ease-in-out transform"
                  style={{
                    transform: `translateY(${currentTextIndex === 1 ? '0%' : '100%'})`,
                    opacity: currentTextIndex === 1 ? 1 : 0
                  }}
                >
                  Instantly & Accurately
                </span>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Perfect for <span className="font-semibold text-blue-600">sales teams</span> and <span className="font-semibold text-purple-600">recruiters</span>. Get verified phone numbers from LinkedIn profiles starting at just <span className="font-semibold text-green-600">₹11/contact</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-10 py-5 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                aria-label="Add PeakAI Chrome extension - 1,000+ users"
              >
                <Chrome className="w-6 h-6" />
                <span>Add to Chrome - Free</span>
                <div className="bg-white/20 text-sm px-3 py-1 rounded-full">1,000+ users</div>
              </a>
            </div>
            
            {/* Trusted by Companies Section */}
            <TrustedLogos />
            
            {/* Video Demo Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Watch How PeakAI Works</h2>
              <div className="max-w-5xl mx-auto relative">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 p-1 rounded-2xl">
                    <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/Ys-nkZLgj9w"
                        title="PeakAI LinkedIn Phone Finder Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-xl -z-10"></div>
                </div>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-blue-600 mb-2">10s</div>
                <div className="text-sm text-gray-700 text-center font-medium">Find instantly</div>
                <div className="text-xs text-gray-600 mt-1">No manual search</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-green-600 mb-2">₹11</div>
                <div className="text-sm text-gray-700 text-center font-medium">First 100</div>
                <div className="text-xs text-gray-600 mt-1">vs ₹60 competitors</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-700 text-center font-medium">Refund Back</div>
                <div className="text-xs text-gray-600 mt-1">Wrong numbers</div>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-orange-600 mb-2">1,000+</div>
                <div className="text-sm text-gray-700 text-center font-medium">Happy Users</div>
                <div className="text-xs text-gray-600 mt-1">Growing daily</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-500 mr-2" />
                <span>100% Credit Refund Guarantee</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 from 1,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className="fill-green-100/30 stroke-green-100/40"
          squares={[
            [3, 2],
            [8, 5],
            [13, 1],
            [18, 7],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Credit-Based Pricing Plans
              <span className="block text-green-600">Phone Numbers, Emails & More!</span>
            </h2>
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl text-gray-600 mb-6">
                Email enrichment & verification included in all plans. Higher plans include everything from lower tiers.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">💰 Clear Credit Costs</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-2">📞</div>
                    <p className="font-semibold text-gray-900">Phone Numbers</p>
                    <p className="text-blue-600 font-bold">5 credits</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600 mb-2">📧</div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-green-600 font-bold">1 credit</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-2">👨‍💼</div>
                    <p className="font-semibold text-gray-900">Director Phone</p>
                    <p className="text-purple-600 font-bold">7 credits</p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    🛡️ <strong>100% credit refund guarantee</strong> for any wrong numbers
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-8xl mx-auto">
            
            {/* Trial Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-6 rounded-3xl shadow-xl border-2 border-blue-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Trial</span>
              </div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trial Plan</h3>
                <p className="text-gray-600 text-sm">Perfect for testing</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-blue-600">₹1,100</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">500 Credits</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Phone numbers:</strong> 5 credits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Email:</strong> 1 credit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email enrichment included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">History access</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors text-center block font-semibold shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>

            {/* Standard Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-6 rounded-3xl shadow-xl border-2 border-green-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Plan</h3>
                <p className="text-gray-600 text-sm">For growing teams</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-green-600">₹7,500</span>
                </div>
                <p className="text-sm text-green-600 font-medium">1,250 Credits</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Everything in Trial +</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bulk operations available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email verification included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors text-center block font-semibold shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-6 rounded-3xl shadow-xl border-2 border-purple-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">Pro</span>
              </div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Plan</h3>
                <p className="text-gray-600 text-sm">For professionals</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-purple-600">₹12,500</span>
                </div>
                <p className="text-sm text-purple-600 font-medium">2,500 Credits</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Everything in Standard +</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Director phone:</strong> 7 credits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited users</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">All enrichment features</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors text-center block font-semibold shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/40 backdrop-blur-lg p-6 rounded-3xl shadow-xl border-2 border-orange-500/50 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Enterprise</span>
              </div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 text-sm">For large teams</p>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-orange-600">Custom</span>
                </div>
                <p className="text-sm text-orange-600 font-medium">5,000+ Credits/month</p>
                <p className="text-xs text-gray-500">Volume discounts</p>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Everything in Pro +</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Advanced bulk operations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Premium support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API access</span>
                </li>
              </ul>
              <a 
                href="https://cal.com/peakai-demo/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors text-center block font-semibold shadow-lg hover:shadow-xl"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Free Trial Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FreeTrialWidget />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <GridPattern
          width={50}
          height={50}
          className="fill-gray-200/45 stroke-gray-200/65"
          squares={[
            [2, 1],
            [7, 3],
            [11, 6],
            [16, 2],
            [19, 8],
          ]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Stop Losing Deals & Top Candidates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sales teams waste 40% of their time hunting for contact info. Recruiters lose top candidates to faster competitors.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="text-center p-8 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Time Wasted</h3>
              <p className="text-gray-600">Sales reps spend 2-3 hours daily searching for contact information manually</p>
            </article>
            <article className="text-center p-8 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Low Accuracy</h3>
              <p className="text-gray-600">Competitors deliver 40-60% accuracy, leading to wasted calls</p>
            </article>
            <article className="text-center p-8 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">High Costs</h3>
              <p className="text-gray-600">Expensive tools charging ₹60/contact with no accuracy guarantee</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about PeakAI</p>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <article
                  key={index}
                  className="bg-white/30 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                    aria-expanded={openFAQ === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 pr-4">{faq.question}</h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-6 h-6 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-8 pb-8" id={`faq-answer-${index}`}>
                      <div className="ml-14">
                        <p className="text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Case Studies */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Success Stories That Speak Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how companies like yours transformed their prospecting with PeakAI
            </p>
          </div>
          <DetailedCaseStudies />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Customer Feedback
            </h2>
          </div>
          <RotatingTestimonials />
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Security & Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security and privacy are our highest priorities. We maintain industry-leading standards.
            </p>
          </div>
          <TrustBadges />
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
            [13, 2],
            [17, 6],
          ]}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Phone Numbers Instantly?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of sales professionals and recruiters who trust PeakAI for accurate contact information.
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
              href="https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph?utm_source=item-share-cb"
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Get First 100 for ₹11</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <p className="text-blue-100 mt-4 text-sm">
            <Lock className="w-4 h-4 inline mr-1" />
            100% Credit Refund Guarantee • Secure & Private • No monthly fees
          </p>
        </div>
      </section>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}