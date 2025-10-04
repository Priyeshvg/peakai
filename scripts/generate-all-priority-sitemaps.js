#!/usr/bin/env node
/**
 * Generate All Priority Sitemaps
 *
 * This script generates static sitemap files for all priority levels.
 * It automatically splits large sitemaps (>15,000 URLs) into multiple parts.
 *
 * Usage:
 *   node scripts/generate-all-priority-sitemaps.js [priority]
 *
 * Examples:
 *   node scripts/generate-all-priority-sitemaps.js           # Generate all priorities
 *   node scripts/generate-all-priority-sitemaps.js 4         # Generate only priority 4
 *   node scripts/generate-all-priority-sitemaps.js 4-7       # Generate priorities 4 through 7
 *
 * Configuration:
 *   - EC2_API_URL: API endpoint (default: http://3.108.55.217:3000)
 *   - MAX_URLS_PER_FILE: Max URLs per sitemap file (default: 15000)
 *
 * Output:
 *   - Files created in public/sitemap-priority{N}[-part{X}].xml
 *   - Summary report with file sizes and URL counts
 */

const fs = require('fs');
const path = require('path');

// Configuration
const EC2_API_URL = process.env.EC2_API_URL || 'http://3.108.55.217:3000';
const BASE_URL = 'https://thepeakai.com';
const MAX_URLS_PER_FILE = 15000; // Google recommends <50k, we use 15k for faster loading
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

/**
 * Fetch priority counts from API
 */
async function getPriorityCounts() {
  console.log('📊 Fetching priority distribution from API...');
  const response = await fetch(`${EC2_API_URL}/api/enterprises/priority-counts`);
  const data = await response.json();
  return data.priorityCounts || [];
}

/**
 * Fetch enterprises for a specific priority
 */
async function fetchEnterprises(priority, limit = 50000) {
  console.log(`📥 Fetching priority ${priority} enterprises...`);
  const response = await fetch(
    `${EC2_API_URL}/api/enterprises/top-priority?limit=${limit}&priority=${priority}`
  );
  const data = await response.json();
  return data.enterprises || [];
}

/**
 * Generate sitemap XML for a set of enterprises
 */
function generateSitemapXML(enterprises) {
  const today = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${enterprises.map(ent => `  <url>
    <loc>${BASE_URL}${ent.slugs.canonical_url}</loc>
    <lastmod>${ent.seo?.last_modified || today}</lastmod>
    <changefreq>${ent.seo?.changefreq || 'monthly'}</changefreq>
    <priority>${ent.seo?.priority || 0.7}</priority>
  </url>`).join('\n')}
</urlset>`;
}

/**
 * Split enterprises into chunks and write files
 */
function writeSitemapFiles(priority, enterprises) {
  const chunks = [];
  for (let i = 0; i < enterprises.length; i += MAX_URLS_PER_FILE) {
    chunks.push(enterprises.slice(i, i + MAX_URLS_PER_FILE));
  }

  const files = [];

  if (chunks.length === 1) {
    // Single file
    const xml = generateSitemapXML(chunks[0]);
    const filename = `sitemap-priority${priority}.xml`;
    const filepath = path.join(PUBLIC_DIR, filename);
    fs.writeFileSync(filepath, xml);
    files.push({
      filename,
      urls: chunks[0].length,
      size: (xml.length / 1024).toFixed(2) + ' KB',
    });
  } else {
    // Multiple parts
    chunks.forEach((chunk, index) => {
      const xml = generateSitemapXML(chunk);
      const filename = `sitemap-priority${priority}-part${index + 1}.xml`;
      const filepath = path.join(PUBLIC_DIR, filename);
      fs.writeFileSync(filepath, xml);
      files.push({
        filename,
        urls: chunk.length,
        size: (xml.length / 1024).toFixed(2) + ' KB',
      });
    });
  }

  return files;
}

/**
 * Generate sitemap for a specific priority
 */
async function generatePrioritySitemap(priority, count) {
  console.log(`\n🔨 Generating sitemap for Priority ${priority} (${count.toLocaleString()} URLs)`);

  const enterprises = await fetchEnterprises(priority, count + 100);

  if (enterprises.length === 0) {
    console.log(`⚠️  No enterprises found for priority ${priority}`);
    return [];
  }

  const files = writeSitemapFiles(priority, enterprises);

  files.forEach(file => {
    console.log(`  ✅ ${file.filename} - ${file.urls} URLs (${file.size})`);
  });

  return files;
}

/**
 * Parse priority range from command line argument
 */
function parsePriorityRange(arg) {
  if (!arg) return null; // Generate all

  if (arg.includes('-')) {
    const [start, end] = arg.split('-').map(n => parseInt(n.trim()));
    return { start, end };
  }

  const single = parseInt(arg);
  return { start: single, end: single };
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Priority Sitemap Generator\n');

  // Parse command line arguments
  const priorityArg = process.argv[2];
  const range = parsePriorityRange(priorityArg);

  // Get all priority counts
  const priorityCounts = await getPriorityCounts();

  if (priorityCounts.length === 0) {
    console.error('❌ Failed to fetch priority counts from API');
    process.exit(1);
  }

  // Filter priorities based on range
  let priorities = priorityCounts;
  if (range) {
    priorities = priorityCounts.filter(
      p => p.priority >= range.start && p.priority <= range.end
    );
    console.log(`📌 Generating sitemaps for priorities ${range.start}-${range.end}\n`);
  } else {
    console.log('📌 Generating sitemaps for ALL priorities\n');
  }

  console.log('Priority Distribution:');
  priorities.forEach(({ priority, count }) => {
    console.log(`  Priority ${priority}: ${count.toLocaleString()} enterprises`);
  });

  // Generate sitemaps
  const allFiles = [];
  for (const { priority, count } of priorities) {
    const files = await generatePrioritySitemap(priority, count);
    allFiles.push(...files);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Generation Summary');
  console.log('='.repeat(60));
  console.log(`Total sitemaps created: ${allFiles.length}`);
  console.log(`Total URLs: ${allFiles.reduce((sum, f) => sum + f.urls, 0).toLocaleString()}`);
  console.log('\nFiles created:');
  allFiles.forEach(file => {
    console.log(`  - ${file.filename} (${file.urls} URLs, ${file.size})`);
  });

  // Generate robots.txt snippet
  console.log('\n' + '='.repeat(60));
  console.log('📝 Add these to app/robots.ts sitemap array:');
  console.log('='.repeat(60));
  allFiles.forEach(file => {
    console.log(`      'https://thepeakai.com/${file.filename}',`);
  });

  // Generate sitemap index snippet
  console.log('\n' + '='.repeat(60));
  console.log('📝 Add these to app/sitemap-index.xml/route.ts:');
  console.log('='.repeat(60));
  allFiles.forEach(file => {
    console.log(`  <sitemap>
    <loc>\${baseUrl}/${file.filename}</loc>
    <lastmod>\${currentDate}</lastmod>
  </sitemap>`);
  });

  console.log('\n✅ All sitemaps generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Review the files in public/ directory');
  console.log('2. Update app/robots.ts with the sitemap URLs shown above');
  console.log('3. Update app/sitemap-index.xml/route.ts with the entries shown above');
  console.log('4. Commit and push: git add public/sitemap-* app/robots.ts app/sitemap-index.xml/');
  console.log('5. After deployment, submit to Google Search Console');
}

// Run
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { generatePrioritySitemap, getPriorityCounts };
