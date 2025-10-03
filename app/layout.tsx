import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Layout } from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PeakAI - LinkedIn Phone Number Finder with 91% Accuracy | ₹11/Contact",
  description: "Find verified phone numbers from LinkedIn profiles with 91% accuracy. Only ₹11 for first 100 contacts vs ₹60 competitors. 100% credit refund guarantee. GDPR compliant Chrome extension for sales teams and recruiters.",
  keywords: "LinkedIn phone finder, LinkedIn phone number, contact information, sales prospecting, chrome extension, phone numbers, LinkedIn email finder, sales tools, recruiting tools, lead generation, B2B prospecting, LinkedIn scraper, contact discovery, sales automation, recruitment software",
  authors: [{ name: "PeakAI" }],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    url: "https://thepeakai.com/",
    title: "PeakAI - LinkedIn Phone Number Finder with 91% Accuracy",
    description: "Find verified phone numbers from LinkedIn profiles with 91% accuracy. Only ₹11 for first 100 contacts. 100% credit refund guarantee.",
    images: [
      {
        url: "https://thepeakai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PeakAI LinkedIn Phone Finder"
      }
    ],
    siteName: "PeakAI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeakAI - LinkedIn Phone Number Finder with 91% Accuracy",
    description: "Find verified phone numbers from LinkedIn profiles with 91% accuracy. Only ₹11 for first 100 contacts.",
    images: ["https://thepeakai.com/og-image.jpg"],
    creator: "@PeakAI",
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  metadataBase: new URL("https://thepeakai.com"),
  alternates: {
    canonical: "/",
  },
  themeColor: "#2563EB",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "PeakAI LinkedIn Phone Finder",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Chrome",
              "description": "Chrome extension to find verified phone numbers from LinkedIn profiles with 91% accuracy",
              "url": "https://thepeakai.com",
              "downloadUrl": "https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph",
              "author": {
                "@type": "Organization",
                "name": "PeakAI",
                "url": "https://thepeakai.com",
                "logo": "https://thepeakai.com/favicon.svg",
                "sameAs": [
                  "https://www.linkedin.com/company/thepeakai"
                ]
              },
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
              },
              "featureList": [
                "91% accuracy guarantee",
                "100% credit refund for wrong numbers",
                "10-second phone number discovery",
                "GDPR compliant",
                "Works with LinkedIn profiles",
                "Chrome extension"
              ]
            })
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PeakAI",
              "alternateName": "PeakAI LinkedIn Phone Finder",
              "url": "https://thepeakai.com",
              "logo": "https://thepeakai.com/favicon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "email": "support@thepeakai.com",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/thepeakai",
                "https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph"
              ],
              "description": "PeakAI helps sales teams and recruiters find verified phone numbers from LinkedIn profiles with 91% accuracy and 100% credit refund guarantee."
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rqctpbzdds");
            `,
          }}
        />

        {/* Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17139273262"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17139273262');
            `,
          }}
        />

        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
