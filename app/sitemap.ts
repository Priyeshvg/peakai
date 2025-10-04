import { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thepeakai.com'
  const currentDate = new Date()

  // ============================================
  // CORE PAGES (Highest Priority)
  // ============================================
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // ============================================
  // PRODUCT PAGES (High Priority)
  // ============================================
  const productPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/leads-ai`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/director-phone`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/unlimited-email`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/msme`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // ============================================
  // CONTENT PAGES (Content Marketing)
  // ============================================
  const contentPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // ============================================
  // PARTNERSHIP & BUSINESS PAGES
  // ============================================
  const businessPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partner-program`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // ============================================
  // SUPPORT & COMPANY PAGES
  // ============================================
  const supportPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // ============================================
  // LEGAL PAGES (Low Priority)
  // ============================================
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ============================================
  // DYNAMIC BLOG POSTS
  // ============================================
  let blogRoutes: MetadataRoute.Sitemap = []

  try {
    const blogs = await getBlogs()

    if (blogs && blogs.length > 0) {
      blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.created_at),
        changeFrequency: 'weekly' as const,
        priority: blog.featured ? 0.75 : 0.7, // Featured posts get higher priority
      }))
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
    // Continue without blog routes if there's an error
  }

  // ============================================
  // MSME DIRECTORY PAGES (Static list to avoid timeout)
  // ============================================
  const msmeStates = [
    'andhra-pradesh', 'arunachal-pradesh', 'assam', 'bihar', 'chhattisgarh',
    'goa', 'gujarat', 'haryana', 'himachal-pradesh', 'jharkhand',
    'karnataka', 'kerala', 'madhya-pradesh', 'maharashtra', 'manipur',
    'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab',
    'rajasthan', 'sikkim', 'tamil-nadu', 'telangana', 'tripura',
    'uttar-pradesh', 'uttarakhand', 'west-bengal', 'delhi', 'jammu-kashmir',
    'ladakh', 'andaman-nicobar', 'chandigarh', 'dadra-nagar-haveli', 'lakshadweep', 'puducherry'
  ]

  const msmeRoutes: MetadataRoute.Sitemap = msmeStates.map(state => ({
    url: `${baseUrl}/${state}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // ============================================
  // COMBINE ALL ROUTES
  // ============================================
  return [
    ...corePages,
    ...productPages,
    ...contentPages,
    ...blogRoutes,
    ...msmeRoutes,
    ...businessPages,
    ...supportPages,
    ...legalPages,
  ]
}
