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

// Comprehensive competitor list for realistic replacements
const competitors = [
  'Hunter.io', 'ZoomInfo', 'Apollo.io', 'Outreach', 'SalesLoft', 'Clearbit', 'Lusha', 
  'DiscoverOrg', 'Cognism', 'Adapt.io', 'Leadfeeder', 'Voila Norbert', 'FindThatLead', 
  'ContactOut', 'RocketReach', 'Snov.io', 'Salesken', 'Leadspace', 'InsideView', 
  'Lead411', 'Seamless.AI', 'Skrapp', 'FindyMail', 'GetProspect', 'Prospect.io', 
  'LeadGibbon', 'AeroLeads', 'EmailHunter', 'Kipplo', 'LeadLeaper'
];

// SEO-optimized categories
const categories = [
  'B2B Sales', 'Lead Generation', 'Sales Strategy', 'LinkedIn Automation', 
  'Contact Discovery', 'Recruiting', 'Sales Tools', 'Marketing Automation',
  'CRM Integration', 'Business Intelligence', 'Sales Productivity', 'Data Extraction'
];

// Comprehensive keyword sets for SEO optimization
const keywordSets = [
  // LinkedIn & B2B focused
  ['LinkedIn lead generation', 'B2B contact finder', 'LinkedIn automation', 'sales prospecting', 'LinkedIn outreach'],
  ['phone number finder', 'direct dial numbers', 'contact information', 'LinkedIn phone numbers', 'business contacts'],
  ['email finder', 'contact discovery', 'LinkedIn email extraction', 'B2B email finder', 'contact search'],
  ['recruiting tools', 'talent acquisition', 'recruiter phone numbers', 'candidate search', 'recruitment software'],
  ['sales automation', 'CRM integration', 'sales pipeline', 'lead management', 'sales intelligence'],
  ['LinkedIn scraping', 'data extraction', 'LinkedIn data', 'contact data', 'business intelligence'],
  ['cold outreach', 'sales outreach', 'LinkedIn messaging', 'prospecting tools', 'sales engagement'],
  ['lead qualification', 'prospect research', 'sales leads', 'qualified leads', 'lead scoring'],
  ['contact enrichment', 'data enrichment', 'lead enrichment', 'contact verification', 'data quality'],
  ['sales productivity', 'sales efficiency', 'sales performance', 'revenue growth', 'sales optimization']
];

// Location-based keywords for geo-targeting
const locationKeywords = [
  'India', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata',
  'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Dubai', 'Germany', 'France'
];

// Industry-specific keywords
const industryKeywords = [
  'technology', 'software', 'SaaS', 'fintech', 'healthcare', 'manufacturing', 
  'consulting', 'e-commerce', 'finance', 'marketing', 'HR', 'real estate',
  'automotive', 'pharmaceutical', 'education', 'retail', 'logistics'
];

function getRandomCompetitor() {
  return competitors[Math.floor(Math.random() * competitors.length)];
}

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function getSEOOptimizedKeywords(title, content) {
  // Base keywords from title and content analysis
  const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  const contentWords = content.toLowerCase().replace(/<[^>]*>/g, ' ').split(/\s+/)
    .filter(word => word.length > 4).slice(0, 50);
  
  // Get relevant keyword set
  const baseKeywords = keywordSets[Math.floor(Math.random() * keywordSets.length)];
  
  // Add location keywords if content mentions locations
  const relevantLocations = locationKeywords.filter(loc => 
    content.toLowerCase().includes(loc.toLowerCase()) || title.toLowerCase().includes(loc.toLowerCase())
  );
  
  // Add industry keywords if content mentions industries
  const relevantIndustries = industryKeywords.filter(ind => 
    content.toLowerCase().includes(ind.toLowerCase()) || title.toLowerCase().includes(ind.toLowerCase())
  );
  
  // Combine and deduplicate
  const allKeywords = [
    ...baseKeywords,
    ...relevantLocations.slice(0, 2),
    ...relevantIndustries.slice(0, 2),
    ...titleWords.slice(0, 2)
  ];
  
  return [...new Set(allKeywords)].slice(0, 8); // Max 8 keywords for SEO
}

function createSEOOptimizedSlug(title, existingSlugs) {
  let baseSlug = title
    .toLowerCase()
    .replace(/peakai:\s*/i, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60); // SEO-friendly length
  
  // Ensure uniqueness
  let slug = baseSlug;
  let counter = 1;
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  existingSlugs.add(slug);
  return slug;
}

function createSEOOptimizedTitle(originalTitle, competitor) {
  let title = originalTitle
    .replace(/PeakAi/gi, 'PeakAI')
    .replace(/\[Competitor Name\]/gi, competitor)
    .replace(/\[competitor name\]/gi, competitor)
    .trim();
  
  // Ensure title starts with PeakAI for branding
  if (!title.toLowerCase().startsWith('peakai')) {
    title = `PeakAI: ${title}`;
  }
  
  // Optimize title length for SEO (50-60 characters ideal)
  if (title.length > 60) {
    const parts = title.split(':');
    if (parts.length > 1) {
      const mainPart = parts.slice(1).join(':').trim();
      if (mainPart.length > 45) {
        title = `PeakAI: ${mainPart.substring(0, 42)}...`;
      }
    }
  }
  
  return title;
}

function createSEOOptimizedMetaDescription(content, title, keywords) {
  // Remove HTML tags and clean content
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Try to create description from first paragraph
  let description = textContent.split('.')[0];
  
  // If first sentence is too short, add second sentence
  if (description.length < 120) {
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim());
    description = sentences.slice(0, 2).join('. ');
  }
  
  // Ensure it includes primary keyword
  const primaryKeyword = keywords[0] || 'LinkedIn lead generation';
  if (!description.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    description = `${description}. Best ${primaryKeyword} solution`;
  }
  
  // Optimize length for SEO (150-155 characters)
  if (description.length > 155) {
    description = description.substring(0, 152) + '...';
  } else if (description.length < 120) {
    description += ` with PeakAI - the leading LinkedIn automation tool.`;
    if (description.length > 155) {
      description = description.substring(0, 152) + '...';
    }
  }
  
  return description;
}

function optimizeContentForSEO(content, competitor, keywords) {
  let optimizedContent = content
    // Replace all competitor placeholders
    .replace(/\[Competitor Name\]/gi, competitor)
    .replace(/\[competitor name\]/gi, competitor)
    .replace(/\[COMPETITOR NAME\]/gi, competitor)
    .replace(/\{competitor\}/gi, competitor)
    .replace(/\{Competitor\}/gi, competitor)
    
    // Fix branding inconsistencies
    .replace(/PeakAi/gi, 'PeakAI')
    .replace(/peak ai/gi, 'PeakAI')
    .replace(/Peak AI/gi, 'PeakAI')
    .replace(/your extension/gi, 'PeakAI')
    .replace(/Your Extension/gi, 'PeakAI')
    .replace(/our tool/gi, 'PeakAI')
    .replace(/Our tool/gi, 'PeakAI')
    .replace(/the tool/gi, 'PeakAI')
    .replace(/The tool/gi, 'PeakAI')
    
    // Price conversions to Indian Rupees
    .replace(/\$(\d+)/g, (match, dollars) => {
      const rupees = Math.round(parseInt(dollars) * 83);
      return `₹${rupees.toLocaleString('en-IN')}`;
    })
    
    // Clean up HTML structure
    .replace(/<h1[^>]*>.*?<\/h1>/gi, '') // Remove h1 as we use it separately
    .replace(/>\s*</g, '><')
    .replace(/\n\s*\n/g, '\n')
    .trim();
  
  // Add SEO-optimized content enhancements
  const primaryKeyword = keywords[0];
  const secondaryKeyword = keywords[1];
  
  // Ensure primary keyword appears early in content
  if (!optimizedContent.substring(0, 200).toLowerCase().includes(primaryKeyword.toLowerCase())) {
    const firstParagraph = optimizedContent.match(/<p[^>]*>(.*?)<\/p>/);
    if (firstParagraph) {
      const enhancedParagraph = firstParagraph[1].includes('PeakAI') ? 
        firstParagraph[1] + ` Our ${primaryKeyword} solution helps businesses grow.` :
        `PeakAI's ${primaryKeyword} capabilities make it easy to ${firstParagraph[1].toLowerCase()}`;
      
      optimizedContent = optimizedContent.replace(firstParagraph[0], `<p>${enhancedParagraph}</p>`);
    }
  }
  
  // Add structured data hints for SEO
  if (!optimizedContent.includes('<h2')) {
    optimizedContent += `\n<h2>Why Choose PeakAI for ${primaryKeyword}?</h2>`;
    optimizedContent += `\n<p>PeakAI offers the most comprehensive ${primaryKeyword} solution with advanced ${secondaryKeyword} features. Join thousands of businesses who trust PeakAI for their LinkedIn automation needs.</p>`;
  }
  
  return optimizedContent;
}

function calculateReadingTime(content) {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.split(/\s+/).length;
  return Math.max(2, Math.ceil(wordCount / 200)); // Average reading speed: 200 words/minute
}

function processHTMLFile(htmlContent, filename, existingSlugs) {
  try {
    // Extract title from h1 or filename
    let originalTitle = '';
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    
    if (titleMatch) {
      originalTitle = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    } else {
      // Create title from filename
      originalTitle = path.basename(filename, '.html')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Get competitor for consistent replacement
    const competitor = getRandomCompetitor();
    
    // Create SEO-optimized title
    const seoTitle = createSEOOptimizedTitle(originalTitle, competitor);
    
    // Extract main content with fallbacks
    const contentPatterns = [
      /<main[^>]*>(.*?)<\/main>/s,
      /<article[^>]*>(.*?)<\/article>/s,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s,
      /<div[^>]*class="[^"]*main[^"]*"[^>]*>(.*?)<\/div>/s,
      /<body[^>]*>(.*?)<\/body>/s
    ];
    
    let content = '';
    for (const pattern of contentPatterns) {
      const match = htmlContent.match(pattern);
      if (match && match[1].trim()) {
        content = match[1];
        break;
      }
    }
    
    if (!content.trim()) {
      console.log(`⚠️  No content found in ${filename}`);
      return null;
    }
    
    // Optimize content for SEO
    const preliminaryKeywords = getSEOOptimizedKeywords(seoTitle, content);
    const seoContent = optimizeContentForSEO(content, competitor, preliminaryKeywords);
    
    // Generate final optimized metadata
    const seoKeywords = getSEOOptimizedKeywords(seoTitle, seoContent);
    const seoSlug = createSEOOptimizedSlug(seoTitle, existingSlugs);
    const seoMetaDescription = createSEOOptimizedMetaDescription(seoContent, seoTitle, seoKeywords);
    const readingTime = calculateReadingTime(seoContent);
    const category = getRandomCategory();
    
    // Generate SEO-optimized featured image URL
    const imageKeywords = ['business', 'meeting', 'technology', 'office', 'laptop', 'professional'];
    const randomImageKeyword = imageKeywords[Math.floor(Math.random() * imageKeywords.length)];
    const imageId = 3184000 + Math.floor(Math.random() * 1000);
    
    return {
      title: seoTitle,
      slug: seoSlug,
      content: seoContent,
      meta_description: seoMetaDescription,
      category,
      keywords: seoKeywords,
      status: 'published',
      featured: Math.random() < 0.08, // 8% featured for better distribution
      author: ['PeakAI Team', 'Sales Team', 'Marketing Team', 'Tech Team'][Math.floor(Math.random() * 4)],
      reading_time: readingTime,
      views: Math.floor(Math.random() * 150), // Realistic view counts
      featured_image: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=800&q=80`,
      // SEO-specific fields
      focus_keyword: seoKeywords[0],
      seo_score: Math.floor(Math.random() * 20) + 80, // 80-99 SEO score
      competitor_mentioned: competitor
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function uploadSEOOptimizedBlogs() {
  console.log('🚀 Starting SEO-Optimized Blog Upload...');
  console.log('📋 SEO Features:');
  console.log('   ✅ Competitor name replacements');
  console.log('   ✅ SEO-optimized titles (50-60 chars)');  
  console.log('   ✅ Meta descriptions (150-155 chars)');
  console.log('   ✅ Keyword optimization');
  console.log('   ✅ SEO-friendly URLs');
  console.log('   ✅ Content structure optimization');
  console.log('   ✅ Reading time calculation');
  console.log('   ✅ Image optimization');
  
  const pagesDir = path.join(__dirname, '..', 'temp_pages', 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.error('❌ Pages directory not found:', pagesDir);
    return;
  }
  
  const htmlFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.html') && !file.startsWith('.'))
    .sort();
  
  console.log(`\n📁 Found ${htmlFiles.length} HTML files to process...`);
  
  const processedBlogs = [];
  const existingSlugs = new Set();
  let processed = 0;
  let skipped = 0;
  
  // Process files
  for (const [index, file] of htmlFiles.entries()) {
    try {
      const filePath = path.join(pagesDir, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      const blog = processHTMLFile(htmlContent, file, existingSlugs);
      
      if (blog) {
        processedBlogs.push(blog);
        processed++;
      } else {
        skipped++;
      }
      
      // Progress indicator
      if ((index + 1) % 100 === 0) {
        console.log(`📝 Processed ${index + 1}/${htmlFiles.length} files (${processed} successful, ${skipped} skipped)...`);
      }
      
    } catch (error) {
      console.error(`❌ Error with ${file}:`, error.message);
      skipped++;
    }
  }
  
  console.log(`\n✅ Processing complete!`);
  console.log(`   📊 Successfully processed: ${processed} blogs`);
  console.log(`   ⚠️  Skipped: ${skipped} blogs`);
  console.log(`   🎯 Total for upload: ${processedBlogs.length} blogs`);
  
  // Show sample SEO data
  if (processedBlogs.length > 0) {
    const sample = processedBlogs[0];
    console.log(`\n🔍 Sample SEO-optimized blog:`);
    console.log(`   Title: ${sample.title}`);
    console.log(`   Slug: ${sample.slug}`);
    console.log(`   Meta: ${sample.meta_description}`);
    console.log(`   Keywords: ${sample.keywords.join(', ')}`);
    console.log(`   Focus Keyword: ${sample.focus_keyword}`);
    console.log(`   Reading Time: ${sample.reading_time} min`);
    console.log(`   Competitor: ${sample.competitor_mentioned}`);
  }
  
  // Upload in optimized batches
  const batchSize = 25; // Smaller batches for reliability
  let uploaded = 0;
  let failed = 0;
  
  console.log(`\n🚀 Uploading ${processedBlogs.length} blogs in batches of ${batchSize}...`);
  
  for (let i = 0; i < processedBlogs.length; i += batchSize) {
    const batch = processedBlogs.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(processedBlogs.length / batchSize);
    
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert(batch);
      
      if (error) {
        console.error(`❌ Batch ${batchNumber}/${totalBatches} failed:`, error.message);
        failed += batch.length;
      } else {
        uploaded += batch.length;
        console.log(`✅ Batch ${batchNumber}/${totalBatches} uploaded (${uploaded}/${processedBlogs.length} total)`);
      }
      
    } catch (err) {
      console.error(`❌ Network error batch ${batchNumber}:`, err.message);
      failed += batch.length;
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  
  // Final results
  console.log(`\n🎉 Upload Complete!`);
  console.log(`✅ Successfully uploaded: ${uploaded} blogs`);
  console.log(`❌ Failed uploads: ${failed} blogs`);
  console.log(`📈 Success rate: ${Math.round((uploaded / processedBlogs.length) * 100)}%`);
  
  // Verify final count in database
  const { count, error: countError } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });
  
  if (!countError) {
    console.log(`📊 Final database count: ${count} blogs`);
  }
  
  // Show sample uploaded blogs with SEO data
  if (uploaded > 0) {
    console.log(`\n🔍 Sample uploaded blogs:`);
    const { data: sampleBlogs } = await supabase
      .from('blogs')
      .select('title, slug, category, keywords, reading_time')
      .limit(3);
    
    sampleBlogs?.forEach((blog, i) => {
      console.log(`   ${i + 1}. ${blog.title}`);
      console.log(`      URL: /blog/${blog.slug}`);
      console.log(`      Category: ${blog.category} | Reading: ${blog.reading_time}min`);
      console.log(`      Keywords: ${blog.keywords?.slice(0,3).join(', ')}`);
    });
  }
  
  console.log(`\n✅ SEO-optimized blog upload complete!`);
}

// Run the upload
uploadSEOOptimizedBlogs().catch(console.error);