const fs = require('fs');

async function splitSitemap() {
  const baseUrl = 'https://thepeakai.com';

  console.log('Fetching priority 3 enterprises from API...');

  const url = 'http://3.108.55.217:3000/api/enterprises/top-priority?limit=50000&priority=3';

  const response = await fetch(url);
  const data = await response.json();
  const enterprises = data.enterprises || [];

  console.log(`Received ${enterprises.length} enterprises`);

  // Split into 3 files of ~13,700 each
  const chunkSize = 14000;
  const chunks = [];

  for (let i = 0; i < enterprises.length; i += chunkSize) {
    chunks.push(enterprises.slice(i, i + chunkSize));
  }

  console.log(`Splitting into ${chunks.length} files...`);

  chunks.forEach((chunk, index) => {
    const fileNum = index + 1;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(ent => `  <url>
    <loc>${baseUrl}${ent.slugs.canonical_url}</loc>
    <lastmod>${ent.seo?.last_modified || '2025-10-04'}</lastmod>
    <changefreq>${ent.seo?.changefreq || 'monthly'}</changefreq>
    <priority>${ent.seo?.priority || 0.7}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(`public/sitemap-priority3-part${fileNum}.xml`, xml);
    console.log(`✅ Part ${fileNum}: ${chunk.length} URLs (${(xml.length / 1024).toFixed(2)} KB)`);
  });

  console.log(`\n✅ All files generated successfully!`);
}

splitSitemap().catch(console.error);
