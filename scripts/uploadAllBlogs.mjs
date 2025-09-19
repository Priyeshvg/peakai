import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(supabaseUrl, supabaseKey);

// Comprehensive competitor list
const competitors = [
  'Hunter.io', 'ZoomInfo', 'Apollo.io', 'Outreach', 'SalesLoft', 'Kipplo', 'LeadLeaper', 
  'Clearbit', 'Lusha', 'DiscoverOrg', 'Cognism', 'Adapt.io', 'Leadfeeder',
  'Voila Norbert', 'FindThatLead', 'ContactOut', 'RocketReach', 'EmailHunter', 'Snov.io',
  'Salesken', 'Leadspace', 'DataSift', 'InsideView', 'Lead411', 'ZoomInfo', 'Seamless.AI',
  'Skrapp', 'FindyMail', 'GetProspect', 'Prospect.io', 'LeadGibbon', 'AeroLeads'
];

// Categories for better organization
const categories = [
  'B2B Sales', 'Lead Generation', 'Sales Strategy', 'Technology', 'Recruiting', 
  'Research', 'LinkedIn Automation', 'Contact Discovery', 'Sales Tools', 'Marketing'
];

// Keywords for SEO
const keywordSets = [
  ['LinkedIn', 'B2B sales', 'lead generation', 'contact finder', 'sales automation'],
  ['phone numbers', 'direct dial', 'contact information', 'prospecting', 'sales leads'],
  ['recruiting', 'talent acquisition', 'candidate search', 'headhunting', 'HR tools'],
  ['email finder', 'contact discovery', 'business intelligence', 'sales intelligence'],
  ['CRM integration', 'sales pipeline', 'conversion optimization', 'sales productivity']
];

function getRandomCompetitor() {
  return competitors[Math.floor(Math.random() * competitors.length)];
}

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomKeywords() {
  const set = keywordSets[Math.floor(Math.random() * keywordSets.length)];
  return [...set].sort(() => 0.5 - Math.random()).slice(0, 3);
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/peakai:\s*/i, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function extractMetaDescription(content) {
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, ' ');
  // Clean up whitespace
  const cleaned = textContent.replace(/\s+/g, ' ').trim();
  // Extract first sentence or 150 chars
  const firstSentence = cleaned.split('.')[0];
  if (firstSentence.length > 160) {
    return cleaned.substring(0, 157) + '...';
  }
  return firstSentence + (cleaned.length > firstSentence.length ? '...' : '');
}

function processHtmlFile(htmlContent, filename) {
  try {
    // Extract title from h1 tag or filename
    let title = '';
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    } else {
      // Create title from filename
      title = path.basename(filename, '.html')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Ensure title starts with PeakAI and clean it up
    title = title.replace(/PeakAi/gi, 'PeakAI').replace(/^(PeakAI\s*:?\s*)?/i, 'PeakAI: ');
    
    // Extract main content
    const mainMatch = htmlContent.match(/<main[^>]*>(.*?)<\/main>/s) ||
                     htmlContent.match(/<body[^>]*>(.*?)<\/body>/s) ||
                     htmlContent.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s);
    
    if (!mainMatch) {
      console.log(`⚠️  No main content found in ${filename}`);
      return null;
    }
    
    let content = mainMatch[1];
    
    // Replace competitor placeholders FIRST
    const competitor = getRandomCompetitor();
    content = content
      .replace(/\[Competitor Name\]/gi, competitor)
      .replace(/\[competitor name\]/gi, competitor)
      .replace(/\[COMPETITOR NAME\]/gi, competitor)
      .replace(/\{competitor\}/gi, competitor)
      .replace(/\{Competitor\}/gi, competitor);
    
    title = title
      .replace(/\[Competitor Name\]/gi, competitor)
      .replace(/\[competitor name\]/gi, competitor)
      .replace(/vs \[Competitor Name\]/gi, `vs ${competitor}`);
    
    // Clean and enhance content
    content = content
      .replace(/<h1[^>]*>.*?<\/h1>/g, '') // Remove h1 as we extract it separately
      .replace(/PeakAi/gi, 'PeakAI') // Consistent branding
      .replace(/your extension/gi, 'PeakAI')
      .replace(/Your Extension/gi, 'PeakAI')
      .replace(/our tool/gi, 'PeakAI')
      .replace(/Our tool/gi, 'PeakAI')
      .replace(/the tool/gi, 'PeakAI')
      .replace(/The tool/gi, 'PeakAI')
      // Price conversions to Indian Rupees (approximate)
      .replace(/\$(\d+)/g, (match, dollars) => {
        const rupees = Math.round(parseInt(dollars) * 83);
        return `₹${rupees.toLocaleString('en-IN')}`;
      })
      // Clean up HTML structure
      .replace(/>[\s\n\r]*</g, '><')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    // Generate metadata
    const slug = createSlug(title);
    const metaDescription = extractMetaDescription(content);
    const category = getRandomCategory();
    const keywords = getRandomKeywords();
    const readingTime = Math.max(2, Math.ceil(content.replace(/<[^>]*>/g, '').length / 1000));
    
    return {
      title,
      slug,
      content,
      meta_description: metaDescription,
      category,
      keywords,
      status: 'published',
      featured: Math.random() < 0.05, // 5% chance of being featured
      author: Math.random() < 0.5 ? 'PeakAI Team' : 'Sales Team',
      reading_time: readingTime,
      views: Math.floor(Math.random() * 100), // Random initial views
      featured_image: `https://images.pexels.com/photos/${3184000 + Math.floor(Math.random() * 1000)}/pexels-photo-${3184000 + Math.floor(Math.random() * 1000)}.jpeg?auto=compress&cs=tinysrgb&w=800`
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function uploadBlogsToSupabase() {
  console.log('🚀 Starting comprehensive blog upload to Supabase...');
  
  const pagesDir = path.join(__dirname, '..', 'temp_pages', 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.error('❌ Pages directory not found:', pagesDir);
    return;
  }
  
  const htmlFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.html') && !file.startsWith('.'))
    .sort();
  
  console.log(`📁 Found ${htmlFiles.length} HTML files to process...`);
  
  const blogs = [];
  const processedSlugs = new Set();
  let skipped = 0;
  
  for (const [index, file] of htmlFiles.entries()) {
    try {
      const filePath = path.join(pagesDir, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      const processedBlog = processHtmlFile(htmlContent, file);
      
      if (processedBlog) {
        // Ensure unique slugs
        let uniqueSlug = processedBlog.slug;
        let counter = 1;
        while (processedSlugs.has(uniqueSlug)) {
          uniqueSlug = `${processedBlog.slug}-${counter}`;
          counter++;
        }
        processedBlog.slug = uniqueSlug;
        processedSlugs.add(uniqueSlug);
        
        blogs.push(processedBlog);
        
        // Show progress every 50 files
        if ((index + 1) % 50 === 0) {
          console.log(`📝 Processed ${index + 1}/${htmlFiles.length} files...`);
        }
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      skipped++;
    }
  }
  
  console.log(`\n✅ Successfully processed ${blogs.length} blogs (${skipped} skipped)`);
  console.log(`📊 Sample processed content:`);
  console.log(`   Title: ${blogs[0]?.title}`);
  console.log(`   Slug: ${blogs[0]?.slug}`);
  console.log(`   Category: ${blogs[0]?.category}`);
  console.log(`   Meta: ${blogs[0]?.meta_description?.substring(0, 100)}...`);
  console.log(`   Content preview: ${blogs[0]?.content?.replace(/<[^>]*>/g, '').substring(0, 100)}...`);
  
  // Upload in batches to avoid timeouts
  const batchSize = 50;
  let uploaded = 0;
  let failed = 0;
  
  console.log(`\n🔄 Uploading ${blogs.length} blogs in batches of ${batchSize}...`);
  
  for (let i = 0; i < blogs.length; i += batchSize) {
    const batch = blogs.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert(batch);
      
      if (error) {
        console.error(`❌ Batch ${Math.floor(i/batchSize) + 1} failed:`, error.message);
        failed += batch.length;
      } else {
        uploaded += batch.length;
        console.log(`✅ Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(blogs.length/batchSize)} uploaded (${uploaded}/${blogs.length})`);
      }
    } catch (err) {
      console.error(`❌ Network error for batch ${Math.floor(i/batchSize) + 1}:`, err.message);
      failed += batch.length;
    }
    
    // Brief delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n🎉 Upload complete!`);
  console.log(`✅ Successfully uploaded: ${uploaded} blogs`);
  console.log(`❌ Failed uploads: ${failed} blogs`);
  console.log(`📈 Success rate: ${Math.round((uploaded / blogs.length) * 100)}%`);
  
  // Show some sample results
  if (uploaded > 0) {
    console.log(`\n📋 Sample uploaded blogs:`);
    const { data: sampleBlogs } = await supabase
      .from('blogs')
      .select('title, slug, category, views')
      .limit(5);
    
    sampleBlogs?.forEach((blog, i) => {
      console.log(`   ${i + 1}. ${blog.title} (${blog.category}) - ${blog.views} views`);
    });
  }
}

// Run the upload
uploadBlogsToSupabase().catch(console.error);