'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/features': 'Features',
  '/pricing': 'Pricing',
  '/leads-ai': 'LeadsAI',
  '/director-phone': 'Director Phone Numbers',
  '/partners': 'Partners',
  '/partner-program': 'Partner Program',
  '/blog': 'Blog',
  '/about': 'About',
  '/help': 'Help Center',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/contact': 'Contact Us',
  '/unlimited-email': 'Unlimited Email',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathname === '/') {
    return null; // Don't show breadcrumbs on home page
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, href: currentPath });
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              {index === 0 && (
                <Home className="w-4 h-4 text-gray-500 mr-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      
      {/* Structured Data for Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": breadcrumb.label,
            "item": `https://thepeakai.com${breadcrumb.href}`
          }))
        })}
      </script>
    </nav>
  );
}