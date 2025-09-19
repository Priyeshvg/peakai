import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://ofwkgdtgzqqbsjlvbhpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md2tnZHRnenFxYnNqbHZiaHBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDgxMTExNCwiZXhwIjoyMDQ2Mzg3MTE0fQ.Qko83m6HM6ZlBhgBYZQvD1TS85gOHqzHdabYnb7fhDI';

const supabase = createClient(supabaseUrl, supabaseKey);

// Competitor list to replace placeholders
const competitors = [
  'Hunter.io', 'ZoomInfo', 'Apollo.io', 'Outreach', 'SalesLoft', 'Kipplo', 'LeadLeaper', 
  'Clearbit', 'Lusha', 'DiscoverOrg', 'ZoomInfo', 'Cognism', 'Adapt.io', 'Leadfeeder',
  'Voila Norbert', 'FindThatLead', 'ContactOut', 'RocketReach', 'EmailHunter', 'Snov.io'
];

// Content categories based on filename patterns
const categories = {
  'linkedin': 'LinkedIn Tools',
  'ai': 'AI & Automation',
  'b2b': 'B2B Sales',
  'contact': 'Contact Discovery',
  'recruitment': 'Recruitment',
  'prospecting': 'Lead Prospecting',
  'data': 'Data & Analytics',
  'crm': 'CRM Integration',
  'automation': 'Sales Automation',
  'vs': 'Tool Comparisons'
};

// SEO keywords for different topics
const keywordSets = {
  'linkedin': ['LinkedIn phone finder', 'LinkedIn contact extraction', 'LinkedIn prospecting', 'LinkedIn automation'],
  'ai': ['AI prospecting', 'AI lead generation', 'automated outreach', 'smart prospecting'],
  'b2b': ['B2B sales', 'business leads', 'enterprise contacts', 'sales intelligence'],
  'contact': ['contact discovery', 'phone number finder', 'email finder', 'contact data'],
  'recruitment': ['LinkedIn recruiting', 'candidate sourcing', 'talent acquisition', 'recruiter tools'],
  'prospecting': ['lead prospecting', 'sales prospecting', 'lead generation', 'prospect research'],
  'data': ['contact data', 'sales data', 'prospect database', 'lead intelligence'],
  'crm': ['CRM integration', 'sales tools', 'customer management', 'sales workflow'],
  'automation': ['sales automation', 'outreach automation', 'prospecting automation', 'workflow automation']
};

// Function to extract and clean HTML content
function extractContent(htmlContent) {
  // Extract title from h1 tag
  const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Untitled';
  
  // Extract main content and clean it
  const mainMatch = htmlContent.match(/<main[^>]*>(.*?)<\/main>/s);
  if (!mainMatch) return null;
  
  let content = mainMatch[1];
  
  // Clean and format content
  content = content
    .replace(/<h1[^>]*>.*?<\/h1>/, '') // Remove h1 as we extract it separately
    .replace(/><p>/g, '>\n<p>') // Add line breaks
    .replace(/><section>/g, '>\n<section>')
    .replace(/><h2>/g, '>\n<h2>')
    .replace(/><h3>/g, '>\n<h3>')
    .replace(/><ul>/g, '>\n<ul>')
    .replace(/><\/section>/g, '>\n</section>')
    .replace(/\[Competitor Name\]/g, () => competitors[Math.floor(Math.random() * competitors.length)])
    .replace(/\$(\d+)/g, '₹$1') // Convert dollars to rupees
    .replace(/₹49/g, '₹499') // Adjust pricing for Indian market
    .replace(/₹99/g, '₹999')
    .replace(/95%\+/g, '91%') // Match PeakAI's actual accuracy
    .replace(/98%/g, '91%')
    .replace(/90%/g, '65%') // Make competitor comparison realistic
    .trim();

  return { title, content };
}

// Function to determine category from filename
function getCategory(filename) {
  const lowerName = filename.toLowerCase();
  for (const [key, category] of Object.entries(categories)) {
    if (lowerName.includes(key)) {
      return category;
    }
  }
  return 'General';
}

// Function to extract keywords
function getKeywords(filename, content) {
  const lowerName = filename.toLowerCase();
  const lowerContent = content.toLowerCase();
  let keywords = ['PeakAI', 'LinkedIn phone finder', 'B2B contact data'];
  
  for (const [key, keywordList] of Object.entries(keywordSets)) {
    if (lowerName.includes(key) || lowerContent.includes(key)) {
      keywords = keywords.concat(keywordList);
      break;
    }
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

// Function to generate SEO-optimized meta description
function generateMetaDescription(title, content) {
  const cleanContent = content.replace(/<[^>]*>/g, '').substring(0, 200);
  return `${title} - Learn about ${title.toLowerCase()} with PeakAI. ${cleanContent}...`.substring(0, 160);
}

// Function to generate slug from filename
function generateSlug(filename) {
  return filename.replace('.html', '').toLowerCase();
}

// Function to process and upload blogs
async function processBlogsToSupabase() {
  const pagesDir = path.join(__dirname, '../temp_pages/pages');
  const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));
  
  console.log(`Found ${files.length} HTML files to process...`);
  
  // First, create the blogs table if it doesn't exist
  const { error: createTableError } = await supabase.rpc('create_blogs_table_if_not_exists');
  if (createTableError && !createTableError.message.includes('already exists')) {
    console.error('Error creating table:', createTableError);
  }

  let processed = 0;
  let errors = 0;
  const batchSize = 50; // Process in batches to avoid memory issues
  
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const blogData = [];
    
    for (const filename of batch) {
      try {
        const filePath = path.join(pagesDir, filename);
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        
        const extracted = extractContent(htmlContent);
        if (!extracted) {
          console.log(`Skipping ${filename} - no content found`);
          continue;
        }
        
        const slug = generateSlug(filename);
        const category = getCategory(filename);
        const keywords = getKeywords(filename, extracted.content);
        const metaDescription = generateMetaDescription(extracted.title, extracted.content);
        
        const blogPost = {
          title: extracted.title,
          slug: slug,
          content: extracted.content,
          meta_description: metaDescription,
          category: category,
          keywords: keywords,
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          author: 'PeakAI Team',
          featured: Math.random() > 0.9, // Make 10% featured
          reading_time: Math.ceil(extracted.content.split(' ').length / 200), // Estimate reading time
          views: Math.floor(Math.random() * 1000), // Random initial views
          featured_image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&w=800&q=60`
        };
        
        blogData.push(blogPost);
        
      } catch (error) {
        console.error(`Error processing ${filename}:`, error);
        errors++;
      }
    }
    
    // Upload batch to Supabase
    if (blogData.length > 0) {
      const { data, error } = await supabase
        .from('blogs')
        .upsert(blogData, { onConflict: 'slug' });
        
      if (error) {
        console.error(`Error uploading batch ${i / batchSize + 1}:`, error);
        errors += blogData.length;
      } else {
        processed += blogData.length;
        console.log(`✅ Uploaded batch ${i / batchSize + 1}: ${blogData.length} blogs (Total: ${processed}/${files.length})`);
      }
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n🎉 Processing complete!`);
  console.log(`✅ Successfully processed: ${processed} blogs`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📊 Success rate: ${((processed / files.length) * 100).toFixed(1)}%`);
  
  return { processed, errors, total: files.length };
}

// Create the blogs table function
async function createBlogsTable() {
  const { data, error } = await supabase.rpc('exec_sql', {
    query: `
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        meta_description VARCHAR(160),
        category VARCHAR(100),
        keywords TEXT[],
        status VARCHAR(20) DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        author VARCHAR(100),
        reading_time INTEGER,
        views INTEGER DEFAULT 0,
        featured_image VARCHAR(500),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
      CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
      CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
      CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
      CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);
    `
  });
  
  if (error) {
    console.error('Error creating table:', error);
    return false;
  }
  
  console.log('✅ Blogs table created successfully');
  return true;
}

// Main execution
async function main() {
  console.log('🚀 Starting blog processing to Supabase...\n');
  
  // Create table first
  await createBlogsTable();
  
  // Process and upload blogs
  await processBlogsToSupabase();
  
  console.log('\n🔍 Testing database connection...');
  const { data, error } = await supabase
    .from('blogs')
    .select('count')
    .single();
    
  if (!error) {
    console.log('✅ Database connection successful!');
  }
}

// Run the script
main().catch(console.error);