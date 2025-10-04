const fs = require('fs');
const https = require('https');

async function generateSitemap() {
  const baseUrl = 'https://thepeakai.com';

  console.log('Fetching priority 3 enterprises from API...');

  const url = 'http://3.108.55.217:3000/api/enterprises/top-priority?limit=50000&priority=3';

  const response = await fetch(url);
  const data = await response.json();
  const enterprises = data.enterprises || [];

  console.log(`Received ${enterprises.length} enterprises`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${enterprises.map(ent => `  <url>
    <loc>${baseUrl}${ent.slugs.canonical_url}</loc>
    <lastmod>${ent.seo?.last_modified || '2025-10-04'}</lastmod>
    <changefreq>${ent.seo?.changefreq || 'monthly'}</changefreq>
    <priority>${ent.seo?.priority || 0.7}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap-priority3.xml', xml);
  console.log(`✅ Generated sitemap with ${enterprises.length} URLs`);
  console.log(`📁 File size: ${(xml.length / 1024).toFixed(2)} KB`);
}

generateSitemap().catch(console.error);
