import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

const defaultSEO: SEOData = {
  title: 'PeakAI - LinkedIn Phone Number Finder with 91% Accuracy | ₹11/Contact',
  description: 'Find verified phone numbers from LinkedIn profiles with 91% accuracy. Only ₹11 for first 100 contacts vs ₹60 competitors. 100% credit refund guarantee.',
  keywords: 'LinkedIn phone finder, LinkedIn phone number, contact information, sales prospecting, chrome extension, phone numbers',
};

const pageSpecificSEO: Record<string, SEOData> = {
  '/': {
    title: 'PeakAI - LinkedIn Phone Number Finder with 91% Accuracy | ₹11/Contact',
    description: 'Find verified phone numbers from LinkedIn profiles with 91% accuracy. Only ₹11 for first 100 contacts. Perfect for sales teams and recruiters. 100% credit refund guarantee.',
    keywords: 'LinkedIn phone finder, LinkedIn phone number, contact information, sales prospecting, chrome extension, phone numbers, sales tools, recruiting tools',
    canonical: 'https://thepeakai.com/',
  },
  '/features': {
    title: 'PeakAI Features - 91% Accuracy, 10s Lookup, 100% Refund Guarantee',
    description: 'Discover PeakAI features: 91% accuracy rate, 10-second phone number lookup, 100% credit refund guarantee, Chrome extension, GDPR compliance, and global coverage.',
    keywords: 'PeakAI features, LinkedIn phone finder features, phone number accuracy, fast lookup, Chrome extension features',
    canonical: 'https://thepeakai.com/features',
  },
  '/pricing': {
    title: 'PeakAI Pricing - First 100 Contacts ₹11 Each | No Monthly Fees',
    description: 'Transparent pricing: First 100 contacts for ₹11 each (56% off), then ₹25/contact. No monthly fees, no hidden costs. Enterprise discounts available.',
    keywords: 'PeakAI pricing, LinkedIn phone finder cost, contact discovery pricing, sales tools pricing, recruiting tools cost',
    canonical: 'https://thepeakai.com/pricing',
  },
  '/leads-ai': {
    title: 'LeadsAI - Bulk Export Leads from Apollo.io, Lusha & Sales Navigator',
    description: 'Export thousands of leads from Apollo.io, Lusha, and Sales Navigator with verified phone numbers. 91% accuracy, ₹2/lead, up to 10,000 leads per export.',
    keywords: 'bulk lead export, Apollo.io export, Lusha export, Sales Navigator export, lead generation, prospect export, phone number enrichment',
    canonical: 'https://thepeakai.com/leads-ai',
  },
  '/director-phone': {
    title: 'Director Phone Numbers - CEO, CTO, CFO Contacts | 95% Accuracy',
    description: 'Get verified phone numbers of CEOs, CTOs, CFOs and C-level executives. 95% accuracy rate for director contacts. Skip gatekeepers, reach decision makers directly.',
    keywords: 'director phone numbers, CEO phone numbers, CTO contacts, CFO contacts, executive phone numbers, C-level contacts',
    canonical: 'https://thepeakai.com/director-phone',
  },
  '/partners': {
    title: 'PeakAI Partner Program - 25% Commission, White-Label Options',
    description: 'Join PeakAI partner program. Earn 25% commission, get white-label options, dedicated support, and co-marketing opportunities. Perfect for agencies and consultants.',
    keywords: 'PeakAI partners, partner program, affiliate program, white-label phone finder, sales tools partnership',
    canonical: 'https://thepeakai.com/partners',
  },
  '/blog': {
    title: 'PeakAI Blog - Sales & Recruiting Insights, LinkedIn Strategies',
    description: 'Expert insights on sales prospecting, recruiting strategies, LinkedIn optimization, and contact discovery best practices. Learn from industry experts.',
    keywords: 'sales blog, recruiting blog, LinkedIn strategies, prospecting tips, B2B sales insights, recruitment best practices',
    canonical: 'https://thepeakai.com/blog',
  },
  '/about': {
    title: 'About PeakAI - Mission, Team, and Values | LinkedIn Phone Finder',
    description: 'Learn about PeakAI mission to help sales teams and recruiters succeed. Meet our team, discover our values, and see our journey to 1,000+ happy users.',
    keywords: 'about PeakAI, company mission, team, values, LinkedIn phone finder company',
    canonical: 'https://thepeakai.com/about',
  },
  '/help-center': {
    title: 'PeakAI Help Center - Support, FAQs, and Documentation',
    description: 'Get help with PeakAI Chrome extension. Find answers to common questions, troubleshooting guides, and contact our support team.',
    keywords: 'PeakAI help, support, FAQ, troubleshooting, Chrome extension help, customer support',
    canonical: 'https://thepeakai.com/help-center',
  },
  '/privacy-policy': {
    title: 'PeakAI Privacy Policy - Data Protection and Security',
    description: 'Learn how PeakAI protects your privacy and data. Our comprehensive privacy policy covers data collection, usage, and security measures.',
    keywords: 'privacy policy, data protection, GDPR compliance, data security, PeakAI privacy',
    canonical: 'https://thepeakai.com/privacy-policy',
  },
  '/terms-of-service': {
    title: 'PeakAI Terms of Service - Usage Terms and Conditions',
    description: 'Read PeakAI terms of service covering usage rights, responsibilities, refund policy, and legal terms for our Chrome extension.',
    keywords: 'terms of service, usage terms, legal terms, refund policy, PeakAI terms',
    canonical: 'https://thepeakai.com/terms-of-service',
  },
};

export function useSEO(customSEO?: Partial<SEOData>) {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const pageSEO = pageSpecificSEO[pathname] || defaultSEO;
    const finalSEO = { ...pageSEO, ...customSEO };

    // Update title
    document.title = finalSEO.title;

    // Update meta description
    updateMetaTag('description', finalSEO.description);

    // Update keywords
    if (finalSEO.keywords) {
      updateMetaTag('keywords', finalSEO.keywords);
    }

    // Update canonical URL
    updateCanonical(finalSEO.canonical || `https://thepeakai.com${pathname}`);

    // Update Open Graph tags
    updateMetaProperty('og:title', finalSEO.title);
    updateMetaProperty('og:description', finalSEO.description);
    updateMetaProperty('og:url', `https://thepeakai.com${pathname}`);

    // Update Twitter tags
    updateMetaProperty('twitter:title', finalSEO.title);
    updateMetaProperty('twitter:description', finalSEO.description);

    // Add structured data if provided
    if (finalSEO.structuredData) {
      addStructuredData(finalSEO.structuredData);
    }
  }, [location.pathname, customSEO]);
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateCanonical(href: string) {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = href;
}

function addStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"][data-dynamic]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}