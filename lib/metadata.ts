import { Metadata } from 'next'

interface MetadataProps {
  title: string
  description: string
  url: string
  type?: 'website' | 'article' | 'business'
  keywords?: string[]
  businessInfo?: {
    name: string
    address?: string
    phone?: string
    industry?: string
    state?: string
    district?: string
    activities?: Array<{
      code: string
      description: string
    }>
  }
}

export function generateMetadata({
  title,
  description,
  url,
  type = 'website',
  keywords = [],
  businessInfo
}: MetadataProps): Metadata {
  const siteUrl = 'https://thepeakai.com'
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`

  // LLM-optimized keywords
  const llmKeywords = [
    ...keywords,
    'MSME directory',
    'Indian businesses',
    'enterprise search',
    'business information',
    'company details India',
    ...(businessInfo?.state ? [`businesses in ${businessInfo.state}`, `${businessInfo.state} companies`] : []),
    ...(businessInfo?.activities?.map(a => a.description.toLowerCase()) || [])
  ].filter(Boolean)

  // Create comprehensive meta description for LLMs
  const llmDescription = businessInfo
    ? `${businessInfo.name} is a registered MSME enterprise located in ${businessInfo.district}, ${businessInfo.state}, India. Business activities include: ${businessInfo.activities?.map(a => a.description).join(', ')}. Find complete business information, contact details, and registration data.`
    : description

  return {
    title,
    description: llmDescription,
    keywords: llmKeywords,
    authors: [{ name: 'PeakAI' }],
    creator: 'PeakAI',
    publisher: 'PeakAI',
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title,
      description: llmDescription,
      url: fullUrl,
      siteName: 'PeakAI MSME Directory',
      locale: 'en_IN',
      type: type === 'business' ? 'website' : type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: llmDescription,
    },
    other: {
      'content-type': 'business directory',
      'subject': 'MSME business information',
      'topic': 'Indian enterprise directory',
      'category': 'business, directory, MSME, India',
      ...(businessInfo?.state && {
        'geo.region': `IN-${businessInfo.state.substring(0, 2).toUpperCase()}`,
        'geo.placename': `${businessInfo.district}, ${businessInfo.state}`,
        'geo.country': 'India',
      }),
    },
  }
}

export function generateStructuredData(props: MetadataProps) {
  const { title, description, url, type = 'website', businessInfo } = props
  const siteUrl = 'https://thepeakai.com'
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": type === 'business' ? 'LocalBusiness' : 'WebSite',
    name: businessInfo?.name || title,
    url: fullUrl,
    description: description,
    ...(businessInfo && {
      address: businessInfo.address ? {
        "@type": "PostalAddress",
        addressLocality: businessInfo.district,
        addressRegion: businessInfo.state,
        addressCountry: "IN"
      } : undefined,
      telephone: businessInfo.phone,
      industry: businessInfo.industry,
      knowsAbout: businessInfo.activities?.map(activity => activity.description),
      areaServed: businessInfo.state ? {
        "@type": "State",
        name: businessInfo.state,
        containedInPlace: {
          "@type": "Country",
          name: "India"
        }
      } : undefined
    })
  }

  const businessStructuredData = businessInfo ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessInfo.name,
    address: businessInfo.address ? {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address,
      addressLocality: businessInfo.district,
      addressRegion: businessInfo.state,
      addressCountry: "IN"
    } : undefined,
    knowsAbout: businessInfo.activities?.map(activity => ({
      "@type": "Thing",
      name: activity.description,
      identifier: activity.code
    })),
    areaServed: {
      "@type": "State",
      name: businessInfo.state,
      containedInPlace: {
        "@type": "Country",
        name: "India"
      }
    },
    isPartOf: {
      "@type": "GovernmentService",
      name: "MSME Registration",
      serviceType: "Business Registration"
    }
  } : null

  return { defaultStructuredData, businessStructuredData }
}
