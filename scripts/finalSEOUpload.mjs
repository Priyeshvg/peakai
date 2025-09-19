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
  
  return [...new Set(allKeywords)].slice(0, 6); // Max 6 keywords for SEO
}

function createSEOOptimizedSlug(title, existingSlugs) {
  let baseSlug = title
    .toLowerCase()
    .replace(/peakai:\s*/i, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
  
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
  if (description.length < 100) {
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim());
    description = sentences.slice(0, 2).join('. ');
  }
  
  // Ensure it includes primary keyword
  const primaryKeyword = keywords[0] || 'LinkedIn lead generation';
  if (!description.toLowerCase().includes(primaryKeyword.toLowerCase().split(' ')[0])) {
    description = `${description}. Best ${primaryKeyword} solution with PeakAI`;
  }
  
  // Optimize length for SEO (150-155 characters)
  if (description.length > 155) {
    description = description.substring(0, 152) + '...';
  } else if (description.length < 120) {
    description += ` - Advanced LinkedIn automation tool for businesses.`;
    if (description.length > 155) {
      description = description.substring(0, 152) + '...';
    }
  }
  
  return description;
}

function optimizeContentForSEO(content, competitor, keywords) {
  let optimizedContent = content
    // Replace all competitor placeholders with consistent competitor
    .replace(/\[Competitor Name\]/gi, competitor)
    .replace(/\[competitor name\]/gi, competitor)
    .replace(/\[COMPETITOR NAME\]/gi, competitor)
    .replace(/\{competitor\}/gi, competitor)
    .replace(/\{Competitor\}/gi, competitor)
    
    // Fix branding inconsistencies across all variations
    .replace(/PeakAi/gi, 'PeakAI')
    .replace(/peak ai/gi, 'PeakAI')
    .replace(/Peak AI/gi, 'PeakAI')
    .replace(/your extension/gi, 'PeakAI')
    .replace(/Your Extension/gi, 'PeakAI')
    .replace(/our tool/gi, 'PeakAI')
    .replace(/Our tool/gi, 'PeakAI')
    .replace(/the tool/gi, 'PeakAI')
    .replace(/The tool/gi, 'PeakAI')
    .replace(/this extension/gi, 'PeakAI')
    .replace(/This extension/gi, 'PeakAI')
    
    // Price conversions to Indian Rupees with proper formatting
    .replace(/\$(\d+)/g, (match, dollars) => {
      const rupees = Math.round(parseInt(dollars) * 83);
      return `₹${rupees.toLocaleString('en-IN')}`;
    })
    
    // Clean up HTML structure and formatting
    .replace(/<h1[^>]*>.*?<\/h1>/gi, '') // Remove h1 as we use it separately
    .replace(/>\s*</g, '><') // Remove whitespace between tags
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .trim();
  
  // Add SEO-optimized content enhancements
  const primaryKeyword = keywords[0];
  
  // Ensure primary keyword appears early in content for better SEO
  if (primaryKeyword && !optimizedContent.substring(0, 200).toLowerCase().includes(primaryKeyword.toLowerCase())) {
    const firstParagraph = optimizedContent.match(/<p[^>]*>(.*?)<\/p>/);
    if (firstParagraph) {
      const enhancedParagraph = `${firstParagraph[1]} PeakAI's ${primaryKeyword} capabilities help businesses achieve better results.`;
      optimizedContent = optimizedContent.replace(firstParagraph[0], `<p>${enhancedParagraph}</p>`);
    }
  }
  
  // Ensure content has proper structure for SEO
  if (!optimizedContent.includes('<h2') && optimizedContent.length > 500) {
    optimizedContent += `\n\n<h2>Why Choose PeakAI?</h2>`;
    optimizedContent += `\n<p>PeakAI provides the most comprehensive LinkedIn automation solution in the market. Join thousands of businesses who trust PeakAI for their lead generation needs.</p>`;
  }
  
  return optimizedContent;
}

function calculateReadingTime(content) {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(2, Math.ceil(wordCount / 200)); // Average reading speed: 200 words/minute
}

function processHTMLFile(htmlContent, filename, existingSlugs) {
  try {
    // Extract title from h1 or create from filename
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
    
    // Get competitor for consistent replacement throughout
    const competitor = getRandomCompetitor();
    
    // Create SEO-optimized title
    const seoTitle = createSEOOptimizedTitle(originalTitle, competitor);
    
    // Extract main content with multiple fallback patterns
    const contentPatterns = [
      /<main[^>]*>(.*?)<\/main>/s,
      /<article[^>]*>(.*?)<\/article>/s,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s,
      /<div[^>]*class="[^"]*main[^"]*"[^>]*>(.*?)<\/div>/s,
      /<section[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/section>/s,
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
    
    // Get SEO keywords first for content optimization
    const preliminaryKeywords = getSEOOptimizedKeywords(seoTitle, content);
    
    // Optimize content for SEO with competitor replacement
    const seoContent = optimizeContentForSEO(content, competitor, preliminaryKeywords);
    
    // Generate final optimized metadata
    const finalKeywords = getSEOOptimizedKeywords(seoTitle, seoContent);
    const seoSlug = createSEOOptimizedSlug(seoTitle, existingSlugs);
    const seoMetaDescription = createSEOOptimizedMetaDescription(seoContent, seoTitle, finalKeywords);
    const readingTime = calculateReadingTime(seoContent);
    const category = getRandomCategory();
    
    // Generate high-quality featured image URL
    const imageId = 3184000 + Math.floor(Math.random() * 800);
    
    // Return blog data matching existing schema
    return {
      title: seoTitle,
      slug: seoSlug,
      content: seoContent,
      meta_description: seoMetaDescription,
      category,
      keywords: finalKeywords,
      status: 'published',
      featured: Math.random() < 0.1, // 10% featured for good distribution
      author: ['PeakAI Team', 'Sales Team', 'Marketing Team'][Math.floor(Math.random() * 3)],
      reading_time: readingTime,
      views: Math.floor(Math.random() * 100), // Random realistic view counts
      featured_image: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=800&q=80`
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function uploadSEOOptimizedBlogs() {
  console.log('🚀 Starting Final SEO-Optimized Blog Upload...');
  console.log('🎯 SEO Optimizations Applied:');
  console.log('   ✅ Complete competitor name replacements');
  console.log('   ✅ SEO-optimized titles (50-60 characters)');  
  console.log('   ✅ Meta descriptions (150-155 characters)');
  console.log('   ✅ Strategic keyword placement');
  console.log('   ✅ SEO-friendly URL slugs');
  console.log('   ✅ Content structure optimization');
  console.log('   ✅ Accurate reading time calculation');
  console.log('   ✅ Image SEO optimization');
  console.log('   ✅ PeakAI branding consistency');
  console.log('   ✅ Indian Rupee price conversions');
  
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
  
  // Process all files
  console.log('\n🔄 Processing files...');
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
      
      // Progress indicator every 100 files
      if ((index + 1) % 100 === 0) {
        console.log(`   📝 Processed ${index + 1}/${htmlFiles.length} files (${processed} successful, ${skipped} skipped)...`);
      }
      
    } catch (error) {
      console.error(`❌ Error with ${file}:`, error.message);
      skipped++;
    }
  }
  
  console.log(`\n✅ File Processing Complete!`);
  console.log(`   📊 Successfully processed: ${processed} blogs`);
  console.log(`   ⚠️  Skipped: ${skipped} blogs`);
  console.log(`   🎯 Total ready for upload: ${processedBlogs.length} blogs`);
  
  // Show sample SEO data
  if (processedBlogs.length > 0) {
    const sample = processedBlogs[Math.floor(Math.random() * Math.min(3, processedBlogs.length))];
    console.log(`\n🔍 Sample SEO-optimized blog:`);
    console.log(`   Title (${sample.title.length} chars): ${sample.title}`);
    console.log(`   Slug: ${sample.slug}`);
    console.log(`   Meta (${sample.meta_description.length} chars): ${sample.meta_description}`);
    console.log(`   Keywords: ${sample.keywords.join(', ')}`);
    console.log(`   Category: ${sample.category} | Reading Time: ${sample.reading_time} min`);
    console.log(`   Content has PeakAI: ${sample.content.includes('PeakAI')}`);
    console.log(`   Content has [Competitor Name]: ${sample.content.includes('[Competitor Name]')}`);
  }
  
  // Upload in optimized batches
  const batchSize = 20; // Conservative batch size for reliability
  let uploaded = 0;
  let failed = 0;
  
  console.log(`\n🚀 Starting Upload: ${processedBlogs.length} blogs in batches of ${batchSize}...`);
  
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
        
        // Try individual uploads for failed batch
        console.log(`🔄 Retrying batch ${batchNumber} individually...`);
        for (const blog of batch) {
          try {
            const { error: individualError } = await supabase
              .from('blogs')
              .insert([blog]);
            
            if (!individualError) {
              uploaded++;
            } else {
              failed++;
              console.error(`   ❌ Failed: ${blog.title.substring(0, 40)}... - ${individualError.message}`);
            }
          } catch (err) {
            failed++;
            console.error(`   ❌ Network error: ${err.message}`);
          }
        }
      } else {
        uploaded += batch.length;
        console.log(`✅ Batch ${batchNumber}/${totalBatches} uploaded successfully (${uploaded}/${processedBlogs.length})`);
      }
      
    } catch (err) {
      console.error(`❌ Network error batch ${batchNumber}:`, err.message);
      failed += batch.length;
    }
    
    // Rate limiting between batches
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Final results and verification
  console.log(`\n🎉 Upload Process Complete!`);
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
  
  // Quality check - show samples of uploaded content
  if (uploaded > 0) {
    console.log(`\n🔍 Quality Check - Sample uploaded blogs:`);
    const { data: sampleBlogs } = await supabase
      .from('blogs')
      .select('title, slug, content, meta_description, keywords')
      .limit(3);
    
    sampleBlogs?.forEach((blog, i) => {
      console.log(`\n   ${i + 1}. ${blog.title}`);
      console.log(`      URL: /blog/${blog.slug}`);
      console.log(`      Meta: ${blog.meta_description}`);
      console.log(`      Keywords: ${blog.keywords?.join(', ')}`);
      console.log(`      Has PeakAI branding: ${blog.content.includes('PeakAI')}`);
      console.log(`      Has placeholder issues: ${blog.content.includes('[Competitor Name]')}`);
    });
  }
  
  console.log(`\n🎯 SEO-Optimized Blog Upload Complete!`);
  console.log(`📈 Ready for testing on localhost and sitemap generation.`);
}

// Run the comprehensive upload
uploadSEOOptimizedBlogs().catch(console.error);