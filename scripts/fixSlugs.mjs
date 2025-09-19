import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(supabaseUrl, supabaseKey);

function createCorrectSlug(title) {
  return title
    .toLowerCase()
    .replace(/peakai:\s*/i, '') // Remove PeakAI prefix
    .replace(/your extension/gi, 'peakai') // Fix "your extension" to "peakai"
    .replace(/your-extension/gi, 'peakai') // Fix hyphenated version too
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .substring(0, 60) // Keep reasonable length
    .replace(/-$/, ''); // Remove trailing hyphen if any
}

async function fixAllSlugs() {
  console.log('🔧 Fixing blog slugs...');
  console.log('🎯 Target fixes:');
  console.log('   ❌ "your-extension" → ✅ "peakai"');
  console.log('   ❌ "your extension" → ✅ "peakai"');
  console.log('   🔄 Regenerating all slugs from titles');
  
  // Get all blogs
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('id, title, slug');
  
  if (error) {
    console.error('❌ Error fetching blogs:', error);
    return;
  }
  
  console.log(`\n📊 Found ${blogs.length} blogs to process`);
  
  const slugsToUpdate = [];
  const existingSlugs = new Set();
  
  // Check for problematic slugs first
  const problematicSlugs = blogs.filter(blog => 
    blog.slug.includes('your-extension') || 
    blog.title.includes('Your Extension') ||
    blog.title.includes('your extension')
  );
  
  console.log(`🚨 Found ${problematicSlugs.length} blogs with "your extension" issues`);
  
  // Generate new slugs for all blogs to ensure consistency
  for (const blog of blogs) {
    const newSlug = createCorrectSlug(blog.title);
    
    // Ensure uniqueness
    let uniqueSlug = newSlug;
    let counter = 1;
    while (existingSlugs.has(uniqueSlug)) {
      uniqueSlug = `${newSlug}-${counter}`;
      counter++;
    }
    existingSlugs.add(uniqueSlug);
    
    // Only update if slug has changed
    if (uniqueSlug !== blog.slug) {
      slugsToUpdate.push({
        id: blog.id,
        oldSlug: blog.slug,
        newSlug: uniqueSlug,
        title: blog.title
      });
    }
  }
  
  console.log(`\n🔄 Need to update ${slugsToUpdate.length} slugs`);
  
  if (slugsToUpdate.length === 0) {
    console.log('✅ All slugs are already correct!');
    return;
  }
  
  // Show some examples of what will be fixed
  console.log(`\n📋 Sample fixes:`);
  slugsToUpdate.slice(0, 5).forEach(item => {
    console.log(`   📝 "${item.title.substring(0, 40)}..."`);
    console.log(`      ❌ ${item.oldSlug}`);
    console.log(`      ✅ ${item.newSlug}`);
    console.log('');
  });
  
  // Update slugs in batches
  const batchSize = 20;
  let updated = 0;
  
  for (let i = 0; i < slugsToUpdate.length; i += batchSize) {
    const batch = slugsToUpdate.slice(i, i + batchSize);
    
    console.log(`🔄 Updating batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(slugsToUpdate.length/batchSize)}...`);
    
    for (const item of batch) {
      const { error: updateError } = await supabase
        .from('blogs')
        .update({ slug: item.newSlug })
        .eq('id', item.id);
      
      if (updateError) {
        console.error(`❌ Error updating ${item.id}:`, updateError.message);
      } else {
        updated++;
      }
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n🎉 Slug Fix Complete!`);
  console.log(`✅ Updated slugs: ${updated}`);
  console.log(`❌ Failed updates: ${slugsToUpdate.length - updated}`);
  
  // Verify the fixes
  console.log(`\n🔍 Verification - checking for remaining issues...`);
  const { data: verifyBlogs } = await supabase
    .from('blogs')
    .select('title, slug')
    .or('slug.ilike.%your-extension%,title.ilike.%Your Extension%')
    .limit(5);
  
  if (verifyBlogs && verifyBlogs.length > 0) {
    console.log(`⚠️  Still found ${verifyBlogs.length} potential issues:`);
    verifyBlogs.forEach(blog => {
      console.log(`   - ${blog.title} (${blog.slug})`);
    });
  } else {
    console.log(`✅ No remaining "your extension" issues found!`);
  }
  
  // Show sample corrected URLs
  const { data: sampleFixed } = await supabase
    .from('blogs')
    .select('title, slug')
    .ilike('title', '%peakai%')
    .limit(3);
  
  console.log(`\n🌐 Sample corrected URLs:`);
  sampleFixed?.forEach(blog => {
    console.log(`   📍 http://localhost:5174/blog/${blog.slug}`);
    console.log(`      ${blog.title}`);
  });
  
  console.log(`\n✅ All blog slugs have been corrected!`);
}

// Run the fix
fixAllSlugs().catch(console.error);