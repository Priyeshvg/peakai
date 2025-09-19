const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTE5NzAsImV4cCI6MjA3MTA4Nzk3MH0.1XOxMLdCsH8Co7ahLFlMlHIzBB1LjxNm44jrYDhi_ms';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteUrl = 'https://thepeakai.com';

// Create sitemap directory
const sitemapDir = path.join(__dirname, '..', 'public', 'sitemaps');
if (!fs.existsSync(sitemapDir)) {
  fs.mkdirSync(sitemapDir, { recursive: true });
}

// Generate XML header
function generateXMLHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
}

// Generate XML footer
function generateXMLFooter() {
  return '</urlset>';
}

// Generate URL entry
function generateURL(url, lastmod, changefreq = 'monthly', priority = '0.7') {
  const modDate = lastmod ? new Date(lastmod).toISOString() : new Date().toISOString();
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Generate sitemap index
function generateSitemapIndex(sitemaps) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  sitemaps.forEach(sitemap => {
    xml += `
  <sitemap>
    <loc>${siteUrl}/sitemaps/${sitemap.filename}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
  });
  
  xml += '\n</sitemapindex>';
  return xml;
}

async function generateSitemaps() {
  try {
    console.log('🚀 Starting sitemap generation...');
    
    // Get all enterprises with pagination (Supabase has max 1000 per query)
    let allEnterprises = [];
    let page = 0;
    const pageSize = 1000;
    
    while (true) {
      const { data: pageData, error } = await supabase
        .from('enterprises')
        .select('id, enterprise_name, state_name, district_name, pincode, created_at')
        .order('id', { ascending: true })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) {
        console.error('Error fetching enterprises:', error);
        break;
      }
      
      if (!pageData || pageData.length === 0) break;
      
      allEnterprises = [...allEnterprises, ...pageData];
      page++;
      
      console.log(`📄 Loaded page ${page}: ${pageData.length} enterprises (Total: ${allEnterprises.length})`);
      
      if (pageData.length < pageSize) break; // Last page
    }
    
    const enterprises = allEnterprises;

    console.log(`📊 Found ${enterprises.length} enterprises`);

    // Group enterprises by state
    const stateGroups = {};
    enterprises.forEach(enterprise => {
      const stateName = enterprise.state_name;
      if (!stateGroups[stateName]) {
        stateGroups[stateName] = [];
      }
      stateGroups[stateName].push(enterprise);
    });

    const states = Object.keys(stateGroups);
    console.log(`🏛️ Found ${states.length} states: ${states.slice(0, 5).join(', ')}${states.length > 5 ? '...' : ''}`);

    // Function to create slug
    const createSlug = (enterprise) => {
      const stateName = enterprise.state_name.toLowerCase().replace(/\s+/g, '-');
      const companySlug = enterprise.enterprise_name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      const pincode = enterprise.pincode || '000000';
      
      return `${stateName}/${companySlug}-${pincode}`;
    };

    // Generate main sitemap with static pages
    let mainSitemap = generateXMLHeader();
    
    // Add static pages
    const staticPages = [
      { url: siteUrl, changefreq: 'daily', priority: '1.0' },
      { url: `${siteUrl}/features`, changefreq: 'weekly', priority: '0.8' },
      { url: `${siteUrl}/pricing`, changefreq: 'weekly', priority: '0.8' },
      { url: `${siteUrl}/leads-ai`, changefreq: 'weekly', priority: '0.8' },
      { url: `${siteUrl}/director-phone`, changefreq: 'weekly', priority: '0.8' },
      { url: `${siteUrl}/msme`, changefreq: 'daily', priority: '0.9' },
      { url: `${siteUrl}/partners`, changefreq: 'monthly', priority: '0.6' },
      { url: `${siteUrl}/blog`, changefreq: 'weekly', priority: '0.7' },
      { url: `${siteUrl}/about`, changefreq: 'monthly', priority: '0.6' },
      { url: `${siteUrl}/help-center`, changefreq: 'weekly', priority: '0.7' },
      { url: `${siteUrl}/privacy-policy`, changefreq: 'yearly', priority: '0.3' },
      { url: `${siteUrl}/terms-of-service`, changefreq: 'yearly', priority: '0.3' },
    ];

    staticPages.forEach(page => {
      mainSitemap += '\n' + generateURL(page.url, null, page.changefreq, page.priority);
    });

    mainSitemap += '\n' + generateXMLFooter();
    
    // Write main sitemap
    fs.writeFileSync(path.join(sitemapDir, 'main-sitemap.xml'), mainSitemap);
    console.log('✅ Generated main-sitemap.xml');

    // Generate state-wise sitemaps
    const generatedSitemaps = [{ filename: 'main-sitemap.xml' }];
    
    for (const [stateName, stateEnterprises] of Object.entries(stateGroups)) {
      const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
      const filename = `${stateSlug}-sitemap.xml`;
      
      let stateSitemap = generateXMLHeader();
      
      // Add state overview page
      stateSitemap += '\n' + generateURL(
        `${siteUrl}/${stateSlug}`, 
        null, 
        'weekly', 
        '0.8'
      );

      // Add enterprises for this state
      stateEnterprises.forEach(enterprise => {
        const slug = createSlug(enterprise);
        const lastmod = enterprise.created_at;
        stateSitemap += '\n' + generateURL(`${siteUrl}/${slug}`, lastmod);
      });
      
      stateSitemap += '\n' + generateXMLFooter();
      
      // Write state sitemap
      fs.writeFileSync(path.join(sitemapDir, filename), stateSitemap);
      generatedSitemaps.push({ filename });
      
      console.log(`✅ Generated ${filename} (${stateEnterprises.length} enterprises)`);
    }

    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex(generatedSitemaps);
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemapIndex);
    
    console.log('✅ Generated sitemap index');
    console.log(`📈 Total sitemaps: ${generatedSitemaps.length}`);
    console.log(`📊 Total enterprises: ${enterprises.length}`);
    console.log(`🎯 Sitemap URLs:`);
    console.log(`   Main: ${siteUrl}/sitemap.xml`);
    console.log(`   Directory: ${siteUrl}/sitemaps/`);
    
    // Generate summary stats
    const stats = {
      totalEnterprises: enterprises.length,
      totalStates: states.length,
      totalSitemaps: generatedSitemaps.length,
      generatedAt: new Date().toISOString(),
      topStates: Object.entries(stateGroups)
        .sort(([,a], [,b]) => b.length - a.length)
        .slice(0, 10)
        .map(([state, enterprises]) => ({ state, count: enterprises.length }))
    };
    
    fs.writeFileSync(
      path.join(sitemapDir, 'sitemap-stats.json'), 
      JSON.stringify(stats, null, 2)
    );
    
    console.log('🏆 Top 5 States by Enterprise Count:');
    stats.topStates.slice(0, 5).forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.state}: ${item.count.toLocaleString()}`);
    });
    
    console.log('🎉 Sitemap generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
  }
}

// Run the sitemap generation
generateSitemaps();