import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: [
      'https://thepeakai.com/sitemap.xml',
      'https://thepeakai.com/sitemap-msme.xml',
      'https://thepeakai.com/sitemap-priority2.xml',
      'https://thepeakai.com/sitemap-priority3-part1.xml',
      'https://thepeakai.com/sitemap-priority3-part2.xml',
      'https://thepeakai.com/sitemap-priority3-part3.xml',
    ],
  }
}
