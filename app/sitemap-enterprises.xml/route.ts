export async function GET() {
  const baseUrl = 'https://thepeakai.com'

  try {
    const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000'

    // Fetch top 25,000 priority 2 enterprises
    const response = await fetch(
      `${EC2_API_URL}/api/enterprises/top-priority?limit=25000&priority=2`,
      {
        cache: 'no-store',
        signal: AbortSignal.timeout(45000), // 45 second timeout
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch top priority enterprises')
    }

    const data = await response.json()
    const enterprises = data.enterprises || []

    console.log(`Generating sitemap with ${enterprises.length} enterprises`)

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${enterprises.map((ent: any) => `  <url>
    <loc>${baseUrl}${ent.slugs.canonical_url}</loc>
    <lastmod>${ent.seo?.last_modified || '2025-10-02'}</lastmod>
    <changefreq>${ent.seo?.changefreq || 'monthly'}</changefreq>
    <priority>${ent.seo?.priority || 0.8}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hour cache
      },
    })
  } catch (error) {
    console.error('Error generating enterprises sitemap:', error)

    // Return minimal sitemap on error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/msme</loc>
    <lastmod>2025-10-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
}
