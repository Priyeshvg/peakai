import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(supabaseUrl, supabaseKey);

// Site configuration
const SITE_URL = 'https://thepeakai.com';
const currentDate = new Date().toISOString().split('T')[0];

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '', priority: '1.0', changefreq: 'daily' }, // Homepage
  { url: 'features', priority: '0.9', changefreq: 'weekly' },
  { url: 'pricing', priority: '0.9', changefreq: 'weekly' },
  { url: 'unlimited-email', priority: '0.95', changefreq: 'weekly' },
  { url: 'leads-ai', priority: '0.8', changefreq: 'weekly' },
  { url: 'director-phone', priority: '0.8', changefreq: 'weekly' },
  { url: 'partner-program', priority: '0.85', changefreq: 'weekly' },
  { url: 'partners', priority: '0.7', changefreq: 'monthly' },
  { url: 'blog', priority: '0.9', changefreq: 'daily' },
  { url: 'about-us', priority: '0.6', changefreq: 'monthly' },
  { url: 'contact-us', priority: '0.7', changefreq: 'monthly' },
  { url: 'help-center', priority: '0.6', changefreq: 'weekly' },
  { url: 'privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: 'terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { url: 'msme', priority: '0.8', changefreq: 'weekly' }
];

function formatDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

function calculateBlogPriority(blog) {
  let priority = 0.6; // Base priority for blogs
  
  // Increase priority for featured blogs
  if (blog.featured) priority += 0.1;
  
  // Increase priority for popular categories
  const highPriorityCategories = ['B2B Sales', 'Lead Generation', 'LinkedIn Automation'];
  if (highPriorityCategories.includes(blog.category)) priority += 0.05;
  
  // Increase priority based on views (normalized)
  const viewBonus = Math.min(blog.views / 1000, 0.1); // Max 0.1 bonus
  priority += viewBonus;
  
  // Cap at 0.8 for blog posts (keep homepage and main pages higher)
  return Math.min(priority, 0.8).toFixed(1);
}

function getBlogChangeFreq(blog) {
  // Featured and popular blogs change more frequently
  if (blog.featured || blog.views > 100) return 'weekly';
  return 'monthly';
}

async function generateSitemap() {
  console.log('🗺️  Generating comprehensive XML sitemap...');
  
  // Fetch all published blogs
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('slug, created_at, updated_at, featured, category, views')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('❌ Error fetching blogs:', error);
    return;
  }
  
  console.log(`📊 Found ${blogs.length} published blogs`);
  
  // Start building sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Add static pages
  console.log('📝 Adding static pages...');
  staticPages.forEach(page => {
    const url = page.url ? `${SITE_URL}/${page.url}` : SITE_URL;
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });
  
  // Add blog posts
  console.log('📝 Adding blog posts...');
  blogs.forEach(blog => {
    const url = `${SITE_URL}/blog/${blog.slug}`;
    const lastmod = formatDate(blog.updated_at || blog.created_at);
    const priority = calculateBlogPriority(blog);
    const changefreq = getBlogChangeFreq(blog);
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });
  
  // Close sitemap
  sitemap += '</urlset>';
  
  // Write sitemap to public directory
  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📁 Location: ${sitemapPath}`);
  console.log(`🌐 URL: ${SITE_URL}/sitemap.xml`);
  console.log(`📊 Total URLs: ${staticPages.length + blogs.length}`);
  
  // Generate sitemap index if needed (for large sites)
  if (blogs.length > 50000) {
    console.log('📚 Generating sitemap index for large site...');
    generateSitemapIndex(blogs.length);
  }
  
  // Generate robots.txt
  generateRobotsTxt();
  
  // Show statistics
  const stats = {
    'Total URLs': staticPages.length + blogs.length,
    'Static pages': staticPages.length,
    'Blog posts': blogs.length,
    'Featured blogs': blogs.filter(b => b.featured).length,
    'High priority URLs': blogs.filter(b => calculateBlogPriority(b) >= 0.7).length + staticPages.filter(p => parseFloat(p.priority) >= 0.7).length
  };
  
  console.log('\n📈 Sitemap Statistics:');
  Object.entries(stats).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  
  // Sample URLs for testing
  console.log('\n🔗 Sample URLs in sitemap:');
  console.log(`   🏠 Homepage: ${SITE_URL}`);
  console.log(`   📄 Features: ${SITE_URL}/features`);
  console.log(`   📝 Blog: ${SITE_URL}/blog`);
  console.log(`   📰 Sample post: ${SITE_URL}/blog/${blogs[0]?.slug}`);
  if (blogs.find(b => b.featured)) {
    console.log(`   ⭐ Featured post: ${SITE_URL}/blog/${blogs.find(b => b.featured).slug}`);
  }
}

function generateSitemapIndex(totalUrls) {
  const sitemapsNeeded = Math.ceil(totalUrls / 50000);
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  for (let i = 0; i < sitemapsNeeded; i++) {
    sitemapIndex += `  <sitemap>
    <loc>${SITE_URL}/sitemap${i === 0 ? '' : `-${i}`}.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
`;
  }
  
  sitemapIndex += '</sitemapindex>';
  
  const indexPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(indexPath, sitemapIndex, 'utf-8');
}

function generateRobotsTxt() {
  console.log('🤖 Generating robots.txt...');
  
  const robotsTxt = `# Robots.txt for PeakAI
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Allow all major search engine bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# Disallow admin and private areas (if any)
User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /.env
Disallow: /api/private/

# Crawl delay for respectful crawling
Crawl-delay: 1

# Additional sitemap references
Sitemap: ${SITE_URL}/sitemap.xml
`;

  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
  
  console.log('✅ robots.txt generated successfully!');
  console.log(`📁 Location: ${robotsPath}`);
  console.log(`🌐 URL: ${SITE_URL}/robots.txt`);
}

// Run the sitemap generation
generateSitemap().catch(console.error);