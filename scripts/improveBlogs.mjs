import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(supabaseUrl, supabaseKey);

// Emojis for different sections to make content more engaging
const sectionEmojis = {
  'Why': '🤔',
  'How': '⚡',
  'What': '📋',
  'Best': '⭐',
  'Top': '🔥',
  'Guide': '📖',
  'Tips': '💡',
  'Benefits': '✅',
  'Features': '🚀',
  'Comparison': '⚔️',
  'Strategy': '🎯',
  'Tools': '🛠️',
  'Results': '📈',
  'Success': '🏆',
  'Process': '🔄',
  'Steps': '👣',
  'Quick': '⚡',
  'Ultimate': '🚀',
  'Complete': '📋',
  'Advanced': '🎓',
  'Professional': '💼',
  'Expert': '👨‍💼',
  'Beginner': '🌟',
  'LinkedIn': '💼',
  'Sales': '💰',
  'Marketing': '📢',
  'Business': '🏢',
  'Data': '📊',
  'Analytics': '📈',
  'Automation': '🤖',
  'Integration': '🔗',
  'Optimization': '⚡',
  'Performance': '🚀'
};

function addEngagingStructure(content, title) {
  // Extract key topic for emoji selection
  const titleWords = title.split(' ');
  let sectionEmoji = '📝';
  
  for (const word of titleWords) {
    if (sectionEmojis[word]) {
      sectionEmoji = sectionEmojis[word];
      break;
    }
  }
  
  // Start with an engaging introduction
  let improvedContent = content;
  
  // Add better paragraph breaks and structure
  improvedContent = improvedContent
    .replace(/\. ([A-Z])/g, '.\n\n<p>$1') // Better paragraph breaks
    .replace(/<p>\s*<p>/g, '<p>') // Remove empty paragraphs
    .replace(/(<\/p>\s*){2,}/g, '</p>\n\n'); // Clean up multiple closing tags
  
  // Improve headings with emojis and better formatting
  improvedContent = improvedContent
    .replace(/<h2>([^<]+)<\/h2>/g, (match, heading) => {
      const emoji = getHeadingEmoji(heading);
      return `\n\n<h2 class="blog-heading">${emoji} ${heading.trim()}</h2>\n`;
    })
    .replace(/<h3>([^<]+)<\/h3>/g, (match, heading) => {
      const emoji = getSubheadingEmoji(heading);
      return `\n<h3 class="blog-subheading">${emoji} ${heading.trim()}</h3>\n`;
    });
  
  // Add engaging lists with better formatting
  improvedContent = improvedContent
    .replace(/<ul>/g, '\n<ul class="blog-list">')
    .replace(/<ol>/g, '\n<ol class="blog-ordered-list">')
    .replace(/<li>([^<]+)<\/li>/g, '<li class="blog-list-item">✨ $1</li>');
  
  // Add call-to-action sections
  if (!improvedContent.includes('Ready to')) {
    improvedContent += `\n\n<div class="blog-cta">
<h3>🚀 Ready to Transform Your Sales Process?</h3>
<p>Join thousands of professionals who use PeakAI to find accurate contact information and close more deals. Get started today and experience the difference!</p>
</div>`;
  }
  
  // Add key takeaways section for longer content
  if (improvedContent.length > 2000 && !improvedContent.includes('Key Takeaways')) {
    const keyPoint = extractKeyPoint(improvedContent);
    improvedContent += `\n\n<div class="blog-takeaways">
<h3>🎯 Key Takeaways</h3>
<ul class="blog-list">
<li class="blog-list-item">✨ PeakAI provides superior LinkedIn automation capabilities</li>
<li class="blog-list-item">✨ ${keyPoint}</li>
<li class="blog-list-item">✨ Results-driven approach with measurable ROI</li>
</ul>
</div>`;
  }
  
  // Add FAQ section for comparison articles
  if (title.includes('vs') || title.includes('Comparison')) {
    improvedContent += `\n\n<div class="blog-faq">
<h3>❓ Frequently Asked Questions</h3>
<div class="faq-item">
<h4>Is PeakAI better than competitors?</h4>
<p>PeakAI offers superior accuracy, better integration, and more comprehensive features at competitive pricing.</p>
</div>
<div class="faq-item">
<h4>How quickly can I see results?</h4>
<p>Most users see improved lead generation results within the first week of using PeakAI.</p>
</div>
</div>`;
  }
  
  return improvedContent.trim();
}

function getHeadingEmoji(heading) {
  const headingLower = heading.toLowerCase();
  
  if (headingLower.includes('why')) return '🤔';
  if (headingLower.includes('how')) return '⚡';
  if (headingLower.includes('what')) return '📋';
  if (headingLower.includes('benefit')) return '✅';
  if (headingLower.includes('feature')) return '🚀';
  if (headingLower.includes('comparison') || headingLower.includes('vs')) return '⚔️';
  if (headingLower.includes('tip')) return '💡';
  if (headingLower.includes('strategy')) return '🎯';
  if (headingLower.includes('result')) return '📈';
  if (headingLower.includes('step')) return '👣';
  if (headingLower.includes('guide')) return '📖';
  if (headingLower.includes('tool')) return '🛠️';
  if (headingLower.includes('peakai')) return '🚀';
  
  return '📝';
}

function getSubheadingEmoji(heading) {
  const headingLower = heading.toLowerCase();
  
  if (headingLower.includes('advantage')) return '⭐';
  if (headingLower.includes('price') || headingLower.includes('cost')) return '💰';
  if (headingLower.includes('time')) return '⏱️';
  if (headingLower.includes('easy')) return '✨';
  if (headingLower.includes('fast')) return '⚡';
  if (headingLower.includes('accurate')) return '🎯';
  if (headingLower.includes('integration')) return '🔗';
  if (headingLower.includes('support')) return '🛡️';
  
  return '▶️';
}

function extractKeyPoint(content) {
  const sentences = content.replace(/<[^>]*>/g, ' ').split(/[.!?]+/);
  const meaningfulSentences = sentences.filter(s => 
    s.length > 50 && 
    s.includes('PeakAI') && 
    (s.includes('help') || s.includes('provide') || s.includes('offer'))
  );
  
  if (meaningfulSentences.length > 0) {
    return meaningfulSentences[0].trim().substring(0, 80) + '...';
  }
  
  return 'Advanced features designed for modern sales teams';
}

function improveTitle(title) {
  // Make titles more engaging and less truncated
  let improved = title;
  
  // Fix common truncation issues
  improved = improved
    .replace(/\.\.\.$/, '') // Remove trailing dots
    .replace(/^PeakAI:\s*/, '') // Remove PeakAI prefix temporarily
    .replace(/Your Extension/gi, 'PeakAI')
    .trim();
  
  // Ensure it's not too long but complete
  if (improved.length > 55) {
    // Find a good breaking point
    const words = improved.split(' ');
    let newTitle = '';
    for (const word of words) {
      if ((newTitle + ' ' + word).length > 55) break;
      newTitle += (newTitle ? ' ' : '') + word;
    }
    improved = newTitle;
  }
  
  // Add PeakAI back if not present
  if (!improved.toLowerCase().includes('peakai')) {
    improved = `PeakAI: ${improved}`;
  }
  
  return improved;
}

async function improveBlogPresentation() {
  console.log('🎨 Starting Blog Presentation Improvement...');
  console.log('🔄 Enhancements:');
  console.log('   ✨ Better content structure & formatting');
  console.log('   🎯 Engaging headings with emojis');
  console.log('   📋 Improved lists and bullet points');
  console.log('   🚀 Call-to-action sections');
  console.log('   ❓ FAQ sections for comparisons');
  console.log('   📝 Key takeaways summaries');
  console.log('   🔧 Fixed title truncation issues');
  
  // Get all blogs in batches
  const batchSize = 50;
  let offset = 0;
  let totalImproved = 0;
  let hasMore = true;
  
  while (hasMore) {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('id, title, content')
      .range(offset, offset + batchSize - 1);
    
    if (error) {
      console.error('❌ Error fetching blogs:', error);
      break;
    }
    
    if (!blogs || blogs.length === 0) {
      hasMore = false;
      break;
    }
    
    console.log(`\n📝 Processing batch ${Math.floor(offset / batchSize) + 1} (${blogs.length} blogs)...`);
    
    // Process each blog in the batch
    for (const blog of blogs) {
      try {
        // Improve title
        const improvedTitle = improveTitle(blog.title);
        
        // Improve content structure
        const improvedContent = addEngagingStructure(blog.content, improvedTitle);
        
        // Update in database
        const { error: updateError } = await supabase
          .from('blogs')
          .update({
            title: improvedTitle,
            content: improvedContent
          })
          .eq('id', blog.id);
        
        if (updateError) {
          console.error(`❌ Error updating blog ${blog.id}:`, updateError.message);
        } else {
          totalImproved++;
        }
        
      } catch (error) {
        console.error(`❌ Error processing blog ${blog.id}:`, error.message);
      }
    }
    
    console.log(`✅ Batch completed. Total improved so far: ${totalImproved}`);
    offset += batchSize;
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n🎉 Blog Improvement Complete!`);
  console.log(`✅ Total blogs improved: ${totalImproved}`);
  
  // Show sample of improved content
  const { data: sample } = await supabase
    .from('blogs')
    .select('title, content')
    .limit(2);
  
  console.log(`\n🔍 Sample Improved Content:`);
  sample?.forEach((blog, i) => {
    console.log(`\n   Blog ${i + 1}:`);
    console.log(`   📝 Title: ${blog.title}`);
    console.log(`   📄 Has emojis: ${blog.content.includes('🚀') ? '✅' : '❌'}`);
    console.log(`   📋 Has structure: ${blog.content.includes('class=') ? '✅' : '❌'}`);
    console.log(`   🎯 Has CTA: ${blog.content.includes('Ready to') ? '✅' : '❌'}`);
    console.log(`   ❓ Has FAQ: ${blog.content.includes('FAQ') ? '✅' : '❌'}`);
  });
  
  console.log(`\n🌐 Test the improvements:`);
  console.log(`   📍 Blog listing: http://localhost:5174/blog`);
  console.log(`   📍 Sample post: http://localhost:5174/blog/${sample?.[0]?.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').substring(0, 50)}`);
}

// Run the improvement
improveBlogPresentation().catch(console.error);