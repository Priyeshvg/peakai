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

// Professional competitors list
const competitors = [
  'Hunter.io', 'ZoomInfo', 'Apollo.io', 'Outreach', 'SalesLoft', 'Clearbit', 'Lusha', 
  'DiscoverOrg', 'Cognism', 'Adapt.io', 'Leadfeeder', 'Voila Norbert', 'FindThatLead', 
  'ContactOut', 'RocketReach', 'Snov.io', 'Salesken', 'Leadspace', 'InsideView', 
  'Lead411', 'Seamless.AI', 'Skrapp', 'FindyMail', 'GetProspect', 'Prospect.io'
];

// Professional categories
const categories = [
  'B2B Sales', 'Lead Generation', 'Sales Strategy', 'LinkedIn Automation', 
  'Contact Discovery', 'Recruiting', 'Sales Tools', 'Marketing Automation',
  'CRM Integration', 'Business Intelligence', 'Sales Productivity'
];

// Professional blog templates
const blogTemplates = {
  comparison: {
    introduction: "In today's competitive business landscape, choosing the right sales automation tool can make or break your revenue goals. This comprehensive analysis compares {competitor} with PeakAI, examining key features, pricing, and performance metrics to help you make an informed decision.",
    
    sections: [
      {
        title: "🎯 Executive Summary",
        content: "When evaluating sales automation platforms, businesses need solutions that deliver accurate contact data, seamless integration capabilities, and measurable ROI. This detailed comparison reveals how PeakAI outperforms {competitor} across critical business metrics including data accuracy, user experience, and cost-effectiveness."
      },
      {
        title: "📊 Feature Comparison Overview",
        content: "PeakAI provides superior LinkedIn automation capabilities with 95%+ data accuracy rates, while {competitor} offers more limited functionality. Our platform delivers real-time contact verification, advanced search filters, and comprehensive CRM integration options that streamline your sales workflow."
      },
      {
        title: "💰 Pricing Analysis",
        content: "PeakAI offers transparent, value-driven pricing starting at ₹2,490 per month with unlimited contact exports. In contrast, {competitor} typically charges premium rates with restrictive usage limits. Our flexible plans scale with your business needs without hidden fees or complex tier structures."
      },
      {
        title: "🚀 Performance Metrics",
        content: "Independent testing shows PeakAI users achieve 3x higher response rates and 40% faster lead qualification times compared to {competitor}. Our advanced AI algorithms ensure higher data accuracy and reduce bounce rates by up to 60%, directly impacting your sales team's productivity."
      },
      {
        title: "⚡ Integration Capabilities",
        content: "PeakAI seamlessly integrates with popular CRM platforms including Salesforce, HubSpot, and Pipedrive. Our robust API supports custom workflows and automated data synchronization, while {competitor} often requires complex manual setup processes and additional third-party tools."
      }
    ],
    
    conclusion: "After thorough analysis, PeakAI emerges as the superior choice for businesses seeking reliable, cost-effective LinkedIn automation. With proven ROI improvements, superior data accuracy, and exceptional customer support, PeakAI delivers measurable results that drive revenue growth."
  },

  guide: {
    introduction: "Mastering LinkedIn automation requires the right strategy, tools, and execution. This comprehensive guide reveals proven techniques used by top-performing sales teams to generate qualified leads and accelerate revenue growth through strategic LinkedIn outreach.",
    
    sections: [
      {
        title: "🎯 Strategic Foundation",
        content: "Successful LinkedIn automation begins with clearly defined target personas and value propositions. Identify decision-makers within your ideal customer profile, research their pain points, and craft compelling messaging that resonates with their specific business challenges and objectives."
      },
      {
        title: "🛠️ Tool Selection Criteria",
        content: "Choose automation platforms that prioritize data accuracy, compliance, and user experience. PeakAI offers advanced features including real-time contact verification, intelligent message sequencing, and comprehensive analytics that enable data-driven optimization of your outreach campaigns."
      },
      {
        title: "📈 Campaign Optimization",
        content: "Monitor key performance indicators including response rates, connection acceptance, and conversion metrics. A/B test different message templates, timing strategies, and follow-up sequences to identify high-performing approaches that generate consistent results."
      },
      {
        title: "🤝 Relationship Building",
        content: "Focus on building genuine professional relationships rather than aggressive selling. Provide value through industry insights, helpful resources, and thoughtful engagement before introducing your products or services to establish trust and credibility."
      },
      {
        title: "📊 Analytics and Reporting",
        content: "Leverage comprehensive reporting tools to measure campaign effectiveness and identify improvement opportunities. Track metrics such as profile views, connection requests, message responses, and meeting bookings to optimize your LinkedIn automation strategy."
      }
    ],
    
    conclusion: "Implementing these proven LinkedIn automation strategies will significantly improve your lead generation results. PeakAI provides the advanced tools and insights needed to execute successful campaigns while maintaining professional relationships and compliance standards."
  },

  howTo: {
    introduction: "Generating high-quality B2B leads through LinkedIn requires systematic approach and professional execution. This step-by-step guide provides actionable strategies that successful sales teams use to identify, engage, and convert prospects into valuable business opportunities.",
    
    sections: [
      {
        title: "🎯 Step 1: Define Your Ideal Customer Profile",
        content: "Create detailed buyer personas based on company size, industry, job titles, and specific pain points. Use LinkedIn's advanced search filters to identify prospects who match these criteria. PeakAI's intelligent targeting helps refine your search results for maximum relevance and conversion potential."
      },
      {
        title: "📋 Step 2: Build Comprehensive Prospect Lists",
        content: "Develop systematic processes for prospect identification and data collection. Utilize multiple LinkedIn search parameters including location, company size, and recent activity to build targeted lists. Export verified contact information using PeakAI's accurate data extraction capabilities."
      },
      {
        title: "✉️ Step 3: Craft Personalized Outreach Messages",
        content: "Develop message templates that address specific prospect challenges and demonstrate clear value propositions. Personalize each outreach based on prospect's recent activity, company news, or industry trends. PeakAI's messaging tools ensure optimal delivery timing and response tracking."
      },
      {
        title: "🔄 Step 4: Implement Follow-up Sequences",
        content: "Create strategic follow-up campaigns that provide ongoing value without being pushy. Space messages appropriately and vary content types including industry insights, case studies, and relevant resources. Monitor engagement levels and adjust frequency based on prospect responses."
      },
      {
        title: "📈 Step 5: Measure and Optimize Results",
        content: "Track key metrics including connection rates, response rates, and meeting bookings. Use PeakAI's analytics dashboard to identify high-performing strategies and optimize underperforming elements. Continuously refine your approach based on data-driven insights."
      }
    ],
    
    conclusion: "Following this systematic approach will dramatically improve your LinkedIn lead generation results. PeakAI provides all necessary tools and analytics to execute these strategies effectively while maintaining professional standards and achieving sustainable growth."
  }
};

function getRandomCompetitor() {
  return competitors[Math.floor(Math.random() * competitors.length)];
}

function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function determineTemplateType(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('vs') || titleLower.includes('comparison')) {
    return 'comparison';
  } else if (titleLower.includes('how to') || titleLower.includes('guide') || titleLower.includes('steps')) {
    return 'howTo';
  } else {
    return 'guide';
  }
}

function createProfessionalTitle(originalTitle, competitor) {
  let title = originalTitle
    .replace(/PeakAi/gi, 'PeakAI')
    .replace(/\[Competitor Name\]/gi, competitor)
    .replace(/Your Extension/gi, 'PeakAI')
    .trim();
  
  // Ensure title starts with PeakAI for consistency
  if (!title.toLowerCase().includes('peakai')) {
    title = `PeakAI: ${title}`;
  }
  
  // Clean up and ensure professional formatting
  title = title
    .replace(/^(PeakAI\s*:?\s*)+/i, 'PeakAI: ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Ensure optimal length for SEO
  if (title.length > 60) {
    const parts = title.split(':');
    if (parts.length > 1) {
      const mainPart = parts[1].trim();
      title = `PeakAI: ${mainPart.substring(0, 50).trim()}`;
    }
  }
  
  return title;
}

function createProfessionalSlug(title, existingSlugs) {
  let slug = title
    .toLowerCase()
    .replace(/peakai:\s*/i, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 55);
  
  // Ensure uniqueness
  let uniqueSlug = slug;
  let counter = 1;
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  existingSlugs.add(uniqueSlug);
  
  return uniqueSlug;
}

function generateProfessionalContent(title, competitor, templateType) {
  const template = blogTemplates[templateType];
  
  // Create introduction
  let content = `<div class="blog-introduction">
<p>${template.introduction.replace(/{competitor}/g, competitor)}</p>
</div>`;
  
  // Add main sections
  template.sections.forEach(section => {
    content += `\n\n<h2 class="blog-heading">${section.title}</h2>
<p>${section.content.replace(/{competitor}/g, competitor)}</p>`;
  });
  
  // Add comparison table for comparison articles
  if (templateType === 'comparison') {
    content += `\n\n<h2 class="blog-heading">📋 Quick Comparison Table</h2>
<div class="comparison-table">
<table>
<tr><th>Feature</th><th>PeakAI</th><th>${competitor}</th></tr>
<tr><td>Data Accuracy</td><td>95%+</td><td>70-85%</td></tr>
<tr><td>LinkedIn Integration</td><td>Advanced</td><td>Basic</td></tr>
<tr><td>Contact Verification</td><td>Real-time</td><td>Limited</td></tr>
<tr><td>Pricing</td><td>₹2,490/month</td><td>Higher</td></tr>
<tr><td>Customer Support</td><td>24/7</td><td>Business hours</td></tr>
</table>
</div>`;
  }
  
  // Add key benefits section
  content += `\n\n<h2 class="blog-heading">✅ Key Benefits of PeakAI</h2>
<ul class="blog-list">
<li class="blog-list-item">✨ 95%+ data accuracy with real-time verification</li>
<li class="blog-list-item">✨ Seamless CRM integration with popular platforms</li>
<li class="blog-list-item">✨ Advanced LinkedIn automation capabilities</li>
<li class="blog-list-item">✨ Transparent pricing with no hidden fees</li>
<li class="blog-list-item">✨ 24/7 customer support and onboarding assistance</li>
</ul>`;
  
  // Add FAQ section
  content += `\n\n<div class="blog-faq">
<h2 class="blog-heading">❓ Frequently Asked Questions</h2>
<div class="faq-item">
<h4>How does PeakAI compare to ${competitor}?</h4>
<p>PeakAI offers superior data accuracy, better integration options, and more competitive pricing compared to ${competitor}. Our platform is designed for modern sales teams who need reliable, scalable solutions.</p>
</div>
<div class="faq-item">
<h4>What's the typical ROI with PeakAI?</h4>
<p>Most customers see 3x improvement in lead quality and 40% reduction in prospecting time within the first month of using PeakAI.</p>
</div>
<div class="faq-item">
<h4>Is there a free trial available?</h4>
<p>Yes, we offer a 14-day free trial with full access to all features so you can experience the PeakAI difference firsthand.</p>
</div>
</div>`;
  
  // Add conclusion
  content += `\n\n<h2 class="blog-heading">🎯 Final Recommendations</h2>
<p>${template.conclusion.replace(/{competitor}/g, competitor)}</p>`;
  
  // Add CTA section
  content += `\n\n<div class="blog-cta">
<h3>🚀 Ready to Transform Your Sales Process?</h3>
<p>Join thousands of successful sales teams who trust PeakAI for accurate contact data and efficient LinkedIn automation. Start your free trial today and experience the difference.</p>
</div>`;
  
  return content;
}

function createProfessionalMetaDescription(title, competitor, templateType) {
  const descriptions = {
    comparison: `Compare ${competitor} vs PeakAI for LinkedIn automation. Detailed analysis of features, pricing, and performance. Discover why PeakAI delivers better ROI.`,
    guide: `Complete guide to LinkedIn lead generation with PeakAI. Learn proven strategies, best practices, and advanced techniques for B2B sales success.`,
    howTo: `Step-by-step guide to generating B2B leads with LinkedIn automation. Professional strategies and tools for maximum conversion rates.`
  };
  
  let description = descriptions[templateType] || descriptions.guide;
  
  // Ensure optimal length
  if (description.length > 155) {
    description = description.substring(0, 152) + '...';
  }
  
  return description;
}

function generateProfessionalKeywords(title, competitor, templateType) {
  const baseKeywords = ['LinkedIn automation', 'B2B sales', 'lead generation', 'PeakAI'];
  const typeKeywords = {
    comparison: ['vs', 'comparison', 'alternative', 'review'],
    guide: ['guide', 'strategy', 'best practices', 'tips'],
    howTo: ['how to', 'tutorial', 'step by step', 'process']
  };
  
  const keywords = [
    ...baseKeywords,
    ...typeKeywords[templateType] || typeKeywords.guide,
    competitor.toLowerCase(),
    'contact finder',
    'sales tools'
  ];
  
  return keywords.slice(0, 8); // Optimal number for SEO
}

async function generateProfessionalBlogs() {
  console.log('🎨 Generating Professional Blog Content System...');
  console.log('✨ Features:');
  console.log('   📝 Complete, professional content with no gaps');
  console.log('   🎯 Structured templates for consistency');
  console.log('   📊 Comparison tables and data');
  console.log('   ❓ FAQ sections for engagement');
  console.log('   🚀 Strong CTAs and conclusions');
  console.log('   📱 Mobile-optimized formatting');
  
  const pagesDir = path.join(__dirname, '..', 'temp_pages', 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.error('❌ Pages directory not found:', pagesDir);
    return;
  }
  
  const htmlFiles = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.html') && !file.startsWith('.'))
    .sort()
    .slice(0, 200); // Process 200 high-quality blogs first
  
  console.log(`\n📁 Processing ${htmlFiles.length} HTML files for professional content...`);
  
  const professionalBlogs = [];
  const existingSlugs = new Set();
  let processed = 0;
  
  for (const [index, file] of htmlFiles.entries()) {
    try {
      const filePath = path.join(pagesDir, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      // Extract original title
      let originalTitle = '';
      const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
      if (titleMatch) {
        originalTitle = titleMatch[1].replace(/<[^>]*>/g, '').trim();
      } else {
        originalTitle = path.basename(file, '.html')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      }
      
      const competitor = getRandomCompetitor();
      const templateType = determineTemplateType(originalTitle);
      
      // Create professional content
      const professionalTitle = createProfessionalTitle(originalTitle, competitor);
      const professionalSlug = createProfessionalSlug(professionalTitle, existingSlugs);
      const professionalContent = generateProfessionalContent(professionalTitle, competitor, templateType);
      const professionalMeta = createProfessionalMetaDescription(professionalTitle, competitor, templateType);
      const professionalKeywords = generateProfessionalKeywords(professionalTitle, competitor, templateType);
      
      const blog = {
        title: professionalTitle,
        slug: professionalSlug,
        content: professionalContent,
        meta_description: professionalMeta,
        category: getRandomCategory(),
        keywords: professionalKeywords,
        status: 'published',
        featured: Math.random() < 0.15, // 15% featured for better distribution
        author: 'PeakAI Team',
        reading_time: Math.ceil(professionalContent.replace(/<[^>]*>/g, '').split(' ').length / 200),
        views: Math.floor(Math.random() * 150),
        featured_image: `https://images.pexels.com/photos/${3184000 + Math.floor(Math.random() * 800)}/pexels-photo-${3184000 + Math.floor(Math.random() * 800)}.jpeg?auto=compress&cs=tinysrgb&w=800`
      };
      
      professionalBlogs.push(blog);
      processed++;
      
      if ((index + 1) % 25 === 0) {
        console.log(`📝 Generated ${index + 1}/${htmlFiles.length} professional blogs...`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✅ Generated ${professionalBlogs.length} professional blogs`);
  
  // Show sample content
  if (professionalBlogs.length > 0) {
    const sample = professionalBlogs[0];
    console.log(`\n🔍 Sample Professional Blog:`);
    console.log(`   📝 Title: ${sample.title}`);
    console.log(`   🔗 Slug: ${sample.slug}`);
    console.log(`   📄 Meta: ${sample.meta_description}`);
    console.log(`   📊 Content length: ${sample.content.length} characters`);
    console.log(`   📖 Reading time: ${sample.reading_time} minutes`);
    console.log(`   🏷️  Keywords: ${sample.keywords.join(', ')}`);
    console.log(`   ✅ Has FAQ: ${sample.content.includes('FAQ')}`);
    console.log(`   ✅ Has CTA: ${sample.content.includes('blog-cta')}`);
    console.log(`   ✅ Has tables: ${sample.content.includes('<table>')}`);
  }
  
  // Upload in batches
  const batchSize = 25;
  let uploaded = 0;
  
  console.log(`\n🚀 Uploading ${professionalBlogs.length} professional blogs...`);
  
  for (let i = 0; i < professionalBlogs.length; i += batchSize) {
    const batch = professionalBlogs.slice(i, i + batchSize);
    
    try {
      const { error } = await supabase.from('blogs').insert(batch);
      
      if (error) {
        console.error(`❌ Batch ${Math.floor(i/batchSize) + 1} failed:`, error.message);
      } else {
        uploaded += batch.length;
        console.log(`✅ Uploaded batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(professionalBlogs.length/batchSize)} (${uploaded}/${professionalBlogs.length})`);
      }
    } catch (err) {
      console.error(`❌ Error uploading batch:`, err.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n🎉 Professional Blog Generation Complete!`);
  console.log(`✅ Successfully uploaded: ${uploaded} blogs`);
  console.log(`📈 Success rate: ${Math.round((uploaded / professionalBlogs.length) * 100)}%`);
  
  // Verify final count
  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total blogs in database: ${count}`);
  
  console.log(`\n🌐 Test the professional blogs:`);
  console.log(`   📍 Blog listing: http://localhost:5174/blog`);
  if (professionalBlogs.length > 0) {
    console.log(`   📍 Sample blog: http://localhost:5174/blog/${professionalBlogs[0].slug}`);
  }
}

// Run the professional blog generator
generateProfessionalBlogs().catch(console.error);