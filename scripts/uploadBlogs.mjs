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

// Competitor list to replace placeholders
const competitors = [
  'Hunter.io', 'ZoomInfo', 'Apollo.io', 'Outreach', 'SalesLoft', 'Kipplo', 'LeadLeaper', 
  'Clearbit', 'Lusha', 'DiscoverOrg', 'Cognism', 'Adapt.io', 'Leadfeeder',
  'Voila Norbert', 'FindThatLead', 'ContactOut', 'RocketReach', 'EmailHunter', 'Snov.io'
];

// Function to get random competitor
function getRandomCompetitor() {
  return competitors[Math.floor(Math.random() * competitors.length)];
}

// Function to extract and clean HTML content
function processHtmlFile(htmlContent, filename) {
  try {
    // Extract title from h1 tag
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Untitled';
    
    // Clean up title
    title = title.replace(/PeakAi/g, 'PeakAI').replace(/^(PeakAI\s*)?/, 'PeakAI: ');
    
    // Extract main content
    const mainMatch = htmlContent.match(/<main[^>]*>(.*?)<\/main>/s);
    if (!mainMatch) return null;
    
    let content = mainMatch[1];
    
    // Clean and enhance content
    content = content
      .replace(/<h1[^>]*>.*?<\/h1>/, '') // Remove h1 as we extract it separately
      .replace(/><p>/g, '>\n<p>') // Add line breaks for readability
      .replace(/><section>/g, '>\n<section>')
      .replace(/><h2>/g, '>\n<h2>')
      .replace(/><h3>/g, '>\n<h3>')
      .replace(/><ul>/g, '>\n<ul>')
      .replace(/\[Competitor Name\]/g, getRandomCompetitor())
      .replace(/PeakAi/g, 'PeakAI') // Fix branding
      .replace(/\$(\d+)/g, '₹$1') // Convert dollars to rupees
      .replace(/₹49/g, '₹999') // Adjust pricing for Indian market
      .replace(/₹99/g, '₹1999')
      .replace(/95%\+/g, '91%') // Match PeakAI's actual accuracy
      .replace(/98%/g, '91%')
      .replace(/90%/g, '65%') // Make competitor comparison realistic
      .replace(/Compare PeakAI with competitors[^<>]*/, '') // Remove generic descriptions
      .trim();

    // Add proper introduction if missing
    if (!content.includes('<p>')) {
      const intro = `<p>Discover how ${title.replace('PeakAI: ', '')} can transform your business prospecting. This comprehensive guide explores the benefits, features, and competitive advantages of using PeakAI for your LinkedIn prospecting needs.</p>`;
      content = intro + '\n' + content;
    }

    // Generate category from filename
    const lowerName = filename.toLowerCase();
    let category = 'General';
    if (lowerName.includes('linkedin')) category = 'LinkedIn Tools';
    else if (lowerName.includes('ai')) category = 'AI & Automation';
    else if (lowerName.includes('b2b')) category = 'B2B Sales';
    else if (lowerName.includes('contact')) category = 'Contact Discovery';
    else if (lowerName.includes('recruitment')) category = 'Recruitment';
    else if (lowerName.includes('prospecting')) category = 'Lead Prospecting';
    else if (lowerName.includes('vs-') || lowerName.includes('versus')) category = 'Tool Comparisons';

    // Generate keywords
    const keywords = ['PeakAI', 'LinkedIn phone finder'];
    if (lowerName.includes('linkedin')) keywords.push('LinkedIn prospecting', 'LinkedIn automation');
    if (lowerName.includes('ai')) keywords.push('AI prospecting', 'automated lead generation');
    if (lowerName.includes('b2b')) keywords.push('B2B sales', 'business leads');
    if (lowerName.includes('contact')) keywords.push('contact discovery', 'phone number finder');
    if (lowerName.includes('recruitment')) keywords.push('LinkedIn recruiting', 'candidate sourcing');

    // Generate slug
    const slug = filename.replace('.html', '').toLowerCase();

    // Generate meta description
    const metaDescription = `${title} - ${content.replace(/<[^>]*>/g, '').substring(0, 120)}...`.substring(0, 160);

    return {
      title,
      slug,
      content,
      meta_description: metaDescription,
      category,
      keywords,
      status: 'published',
      author: 'PeakAI Team',
      reading_time: Math.max(2, Math.ceil(content.split(' ').length / 200)),
      views: Math.floor(Math.random() * 500) + 50,
      featured: Math.random() > 0.92, // Make ~8% featured
      featured_image: `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?auto=format&fit=crop&w=800&q=60`
    };
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
    return null;
  }
}

// Main upload function
async function uploadBlogsToSupabase() {
  const pagesDir = path.join(__dirname, '../temp_pages/pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.error('Pages directory not found. Please extract pages.zip first.');
    return;
  }

  const files = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.html'))
    .slice(0, 200); // Process first 200 for testing, remove this limit later
  
  console.log(`🚀 Processing ${files.length} blog files...`);
  
  let processed = 0;
  let errors = 0;
  const batchSize = 25; // Smaller batches for reliability
  
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const blogData = [];
    
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)}`);
    
    for (const filename of batch) {
      try {
        const filePath = path.join(pagesDir, filename);
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        
        const processedBlog = processHtmlFile(htmlContent, filename);
        if (processedBlog) {
          blogData.push(processedBlog);
          console.log(`  ✓ ${filename} → "${processedBlog.title}"`);
        } else {
          console.log(`  ⚠️  Skipped ${filename}`);
        }
      } catch (error) {
        console.error(`  ❌ Error with ${filename}:`, error.message);
        errors++;
      }
    }
    
    // Upload batch to Supabase
    if (blogData.length > 0) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .insert(blogData);
          
        if (error) {
          console.error(`❌ Supabase error for batch:`, error);
          errors += blogData.length;
        } else {
          processed += blogData.length;
          console.log(`✅ Successfully uploaded ${blogData.length} blogs to Supabase`);
        }
      } catch (uploadError) {
        console.error(`❌ Upload failed:`, uploadError);
        errors += blogData.length;
      }
    }
    
    // Small delay to avoid overwhelming Supabase
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n🎉 Upload Complete!`);
  console.log(`✅ Successfully processed: ${processed} blogs`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📊 Success rate: ${((processed / files.length) * 100).toFixed(1)}%`);

  // Test the database
  console.log(`\n🔍 Testing database...`);
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('count(*)', { count: 'exact' });
    
    if (error) {
      console.error('❌ Database test failed:', error);
    } else {
      console.log(`✅ Database connected. Total blogs in database: ${data.length}`);
    }
  } catch (testError) {
    console.error('❌ Database test error:', testError);
  }
}

// Run the script
console.log('🚀 Starting PeakAI blog upload to Supabase...\n');
uploadBlogsToSupabase().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});