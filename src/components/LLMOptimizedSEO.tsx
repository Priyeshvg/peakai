import { Helmet } from 'react-helmet-async'

interface LLMOptimizedSEOProps {
  title: string
  description: string
  url: string
  type?: 'website' | 'article' | 'business'
  structuredData?: any
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

export function LLMOptimizedSEO({
  title,
  description,
  url,
  type = 'website',
  structuredData,
  keywords = [],
  businessInfo
}: LLMOptimizedSEOProps) {
  const siteUrl = 'https://thepeakai.com'
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`

  // Create LLM-friendly structured data
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

  const finalStructuredData = structuredData || defaultStructuredData

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

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={llmDescription} />
      <meta name="keywords" content={llmKeywords.join(', ')} />
      
      {/* LLM-specific meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      <meta name="slurp" content="index, follow" />
      
      {/* Content classification for AI */}
      <meta name="content-type" content="business directory" />
      <meta name="subject" content="MSME business information" />
      <meta name="topic" content="Indian enterprise directory" />
      <meta name="category" content="business, directory, MSME, India" />
      
      {/* Geographic information for location-based AI queries */}
      {businessInfo?.state && (
        <>
          <meta name="geo.region" content={`IN-${businessInfo.state.substring(0, 2).toUpperCase()}`} />
          <meta name="geo.placename" content={`${businessInfo.district}, ${businessInfo.state}`} />
          <meta name="geo.country" content="India" />
        </>
      )}
      
      {/* Open Graph for social AI */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={llmDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type === 'business' ? 'business.business' : 'website'} />
      <meta property="og:site_name" content="PeakAI MSME Directory" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={llmDescription} />
      
      {/* LLM Training Data Friendly Tags */}
      <meta name="author" content="PeakAI" />
      <meta name="publisher" content="PeakAI" />
      <meta name="copyright" content="PeakAI" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data for LLMs */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData, null, 2)}
      </script>
      
      {/* Additional business-specific structured data */}
      {businessInfo && (
        <script type="application/ld+json">
          {JSON.stringify({
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
          }, null, 2)}
        </script>
      )}
    </Helmet>
  )
}