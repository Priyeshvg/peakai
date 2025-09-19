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

// Get existing slugs to avoid duplicates
async function getExistingSlugs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug');
  
  if (error) {
    console.error('Error fetching existing slugs:', error);
    return new Set();
  }
  
  return new Set(data.map(blog => blog.slug));
}

// Fix meta description length
function fixMetaDescription(content) {
  const textContent = content.replace(/<[^>]*>/g, ' ');
  const cleaned = textContent.replace(/\s+/g, ' ').trim();
  
  if (cleaned.length <= 155) {
    return cleaned;
  }
  
  // Try to cut at sentence boundary
  const sentences = cleaned.split(/[.!?]+/);
  let result = sentences[0];
  
  for (let i = 1; i < sentences.length; i++) {
    if ((result + sentences[i]).length > 152) {
      break;
    }
    result += '.' + sentences[i];
  }
  
  if (result.length > 155) {
    result = cleaned.substring(0, 152) + '...';
  }
  
  return result;
}

async function processRemainingBlogs() {
  console.log('🔄 Processing remaining blogs...');
  
  const existingSlugs = await getExistingSlugs();
  console.log(`📊 Found ${existingSlugs.size} existing blogs in database`);
  
  const pagesDir = path.join(__dirname, '..', 'temp_pages', 'pages');
  const htmlFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.html') && !file.startsWith('.'))
    .sort();
  
  console.log(`📁 Processing ${htmlFiles.length} HTML files...`);
  
  const competitors = ['Hunter.io', 'ZoomInfo', 'Apollo.io', 'Outreach', 'SalesLoft'];
  const categories = ['B2B Sales', 'Lead Generation', 'Sales Strategy', 'Technology', 'Recruiting'];
  const keywordSets = [
    ['LinkedIn', 'B2B sales', 'lead generation'],
    ['phone numbers', 'contact finder', 'prospecting'],
    ['recruiting', 'talent acquisition', 'HR tools']
  ];
  
  const newBlogs = [];
  
  for (const file of htmlFiles) {
    try {
      const filePath = path.join(pagesDir, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      // Create slug from filename
      const baseSlug = path.basename(file, '.html')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      // Skip if already exists
      if (existingSlugs.has(baseSlug)) {
        continue;
      }
      
      // Extract title
      const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
      let title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 
                 file.replace(/-/g, ' ').replace('.html', '');
      
      title = title.replace(/PeakAi/gi, 'PeakAI').replace(/^(PeakAI\s*:?\s*)?/i, 'PeakAI: ');
      
      // Extract content
      const mainMatch = htmlContent.match(/<main[^>]*>(.*?)<\/main>/s) ||
                       htmlContent.match(/<body[^>]*>(.*?)<\/body>/s);
      
      if (!mainMatch) continue;
      
      let content = mainMatch[1];
      
      // Replace competitor placeholders
      const competitor = competitors[Math.floor(Math.random() * competitors.length)];
      content = content.replace(/\[Competitor Name\]/gi, competitor);
      title = title.replace(/\[Competitor Name\]/gi, competitor);
      
      // Clean content
      content = content
        .replace(/<h1[^>]*>.*?<\/h1>/g, '')
        .replace(/PeakAi/gi, 'PeakAI')
        .replace(/your extension/gi, 'PeakAI')
        .trim();
      
      // Generate fixed metadata
      const metaDescription = fixMetaDescription(content);
      const category = categories[Math.floor(Math.random() * categories.length)];
      const keywords = keywordSets[Math.floor(Math.random() * keywordSets.length)];
      
      const blog = {
        title: title.substring(0, 250), // Ensure title isn't too long
        slug: baseSlug,
        content,
        meta_description: metaDescription,
        category,
        keywords,
        status: 'published',
        featured: Math.random() < 0.03,
        author: 'PeakAI Team',
        reading_time: Math.max(2, Math.ceil(content.replace(/<[^>]*>/g, '').length / 1000)),
        views: Math.floor(Math.random() * 50),
        featured_image: `https://images.pexels.com/photos/${3184000 + Math.floor(Math.random() * 500)}/pexels-photo-${3184000 + Math.floor(Math.random() * 500)}.jpeg?auto=compress&cs=tinysrgb&w=800`
      };
      
      newBlogs.push(blog);
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`✅ Found ${newBlogs.length} new blogs to upload`);
  
  if (newBlogs.length === 0) {
    console.log('🎉 All blogs already uploaded!');
    return;
  }
  
  // Upload in smaller batches
  const batchSize = 25;
  let uploaded = 0;
  
  for (let i = 0; i < newBlogs.length; i += batchSize) {
    const batch = newBlogs.slice(i, i + batchSize);
    
    try {
      const { error } = await supabase
        .from('blogs')
        .insert(batch);
      
      if (error) {
        console.error(`❌ Batch failed:`, error.message);
        // Try individual uploads for this batch
        for (const blog of batch) {
          try {
            const { error: individualError } = await supabase
              .from('blogs')
              .insert([blog]);
            
            if (!individualError) {
              uploaded++;
              console.log(`✅ Individual upload: ${blog.title.substring(0, 50)}...`);
            } else {
              console.error(`❌ Failed: ${blog.title.substring(0, 30)}... - ${individualError.message}`);
            }
          } catch (err) {
            console.error(`❌ Individual error: ${err.message}`);
          }
        }
      } else {
        uploaded += batch.length;
        console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} uploaded (${uploaded}/${newBlogs.length})`);
      }
    } catch (err) {
      console.error(`❌ Network error:`, err.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n🎉 Upload complete! ${uploaded} new blogs uploaded`);
  
  // Final count
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total blogs in database: ${count}`);
}

processRemainingBlogs().catch(console.error);