import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xradhqxopmrtnenivixw.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Function to create a slug from enterprise name and pincode
function createSlug(enterpriseName, pincode) {
  if (!enterpriseName) return null;
  
  const baseSlug = enterpriseName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .trim();
  
  // Add pincode if present
  if (pincode && pincode !== null && pincode !== '') {
    return `${baseSlug}-${pincode}`;
  }
  
  return baseSlug;
}

// Function to handle duplicate slugs by adding a numeric suffix
function createUniqueSlug(baseSlug, existingSlugs, pincode) {
  let uniqueSlug = baseSlug;
  let counter = 1;
  
  // Keep trying until we find a unique slug
  while (existingSlugs.has(uniqueSlug)) {
    if (pincode) {
      // Remove the pincode, add counter, then add pincode back
      const nameOnly = baseSlug.replace(`-${pincode}`, '');
      uniqueSlug = `${nameOnly}-${counter}-${pincode}`;
    } else {
      uniqueSlug = `${baseSlug}-${counter}`;
    }
    counter++;
  }
  
  return uniqueSlug;
}

// Function to normalize state name
function normalizeStateName(stateName) {
  if (!stateName) return null;
  
  return stateName.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function fetchAllEntries() {
  console.log('🔍 Fetching ALL MSME entries with pagination...');
  let allEntries = [];
  let from = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    console.log(`📄 Fetching page starting from ${from}...`);
    
    const { data: pageEntries, error, count } = await supabase
      .from('enterprises')
      .select('*', { count: 'exact' })
      .range(from, from + pageSize - 1)
      .order('id');

    if (error) {
      console.error('❌ Error fetching entries:', error);
      break;
    }

    if (pageEntries && pageEntries.length > 0) {
      allEntries = allEntries.concat(pageEntries);
      console.log(`✅ Fetched ${pageEntries.length} entries (Total so far: ${allEntries.length})`);
      
      if (count !== null) {
        console.log(`📊 Database contains ${count} total entries`);
      }
      
      // Check if we've reached the end
      if (pageEntries.length < pageSize) {
        hasMore = false;
      } else {
        from += pageSize;
      }
    } else {
      hasMore = false;
    }
  }

  return allEntries;
}

async function fixAllMSMEEntries() {
  console.log('🚀 Starting comprehensive MSME entries fix...');
  
  try {
    // Fetch all entries with pagination
    const allEntries = await fetchAllEntries();
    console.log(`📝 Total entries found: ${allEntries.length}`);

    // Analyze current state
    const entriesWithoutSlugs = allEntries.filter(entry => !entry.slug);
    const entriesWithCapitalStates = allEntries.filter(entry => 
      entry.state_name && entry.state_name === entry.state_name.toUpperCase()
    );

    console.log(`🔍 Analysis:`);
    console.log(`   - Total entries: ${allEntries.length}`);
    console.log(`   - Entries without slugs: ${entriesWithoutSlugs.length}`);
    console.log(`   - Entries with ALL CAPS states: ${entriesWithCapitalStates.length}`);

    // Create a set of existing slugs to handle duplicates
    const existingSlugs = new Set();
    allEntries.forEach(entry => {
      if (entry.slug) {
        existingSlugs.add(entry.slug);
      }
    });

    // Process entries in batches
    const BATCH_SIZE = 100;
    let processedCount = 0;
    let updatedCount = 0;

    for (let i = 0; i < allEntries.length; i += BATCH_SIZE) {
      const batch = allEntries.slice(i, i + BATCH_SIZE);
      console.log(`📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allEntries.length / BATCH_SIZE)} (${batch.length} entries)...`);

      for (const entry of batch) {
        try {
          const updates = {};
          let needsUpdate = false;

          // Generate slug if missing
          if (!entry.slug && entry.enterprise_name) {
            const baseSlug = createSlug(entry.enterprise_name, entry.pincode);
            if (baseSlug) {
              const uniqueSlug = createUniqueSlug(baseSlug, existingSlugs, entry.pincode);
              updates.slug = uniqueSlug;
              existingSlugs.add(uniqueSlug); // Add to set to prevent future duplicates
              needsUpdate = true;
            }
          }

          // Normalize state name if it's all caps
          if (entry.state_name && entry.state_name === entry.state_name.toUpperCase()) {
            updates.state_name = normalizeStateName(entry.state_name);
            needsUpdate = true;
          }

          // Update if changes are needed
          if (needsUpdate) {
            const { error: updateError } = await supabase
              .from('enterprises')
              .update(updates)
              .eq('id', entry.id);

            if (updateError) {
              console.error(`❌ Error updating entry ${entry.id}:`, updateError);
            } else {
              updatedCount++;
              if (updatedCount % 500 === 0) {
                console.log(`✅ Updated ${updatedCount} entries so far...`);
              }
            }
          }

          processedCount++;
        } catch (error) {
          console.error(`❌ Error processing entry ${entry.id}:`, error);
        }
      }

      // Add a small delay between batches to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`🎉 MSME entries fix completed!`);
    console.log(`📊 Final Summary:`);
    console.log(`   - Total entries processed: ${processedCount}`);
    console.log(`   - Total entries updated: ${updatedCount}`);

    // Verify the fix by checking a few examples from different states
    console.log(`🔍 Verification - checking sample entries from different states:`);
    
    const { data: sampleEntries, error: sampleError } = await supabase
      .from('enterprises')
      .select('*')
      .limit(10);

    if (sampleError) {
      console.error('❌ Error fetching sample entries:', sampleError);
    } else {
      sampleEntries.forEach((entry, index) => {
        console.log(`   ${index + 1}. ${entry.enterprise_name}`);
        console.log(`      - State: ${entry.state_name}`);
        console.log(`      - Slug: ${entry.slug || 'NO SLUG'}`);
        console.log(`      - URL: https://thepeakai.com/${entry.state_name?.toLowerCase()}/${entry.slug}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

// Test the specific example mentioned
async function testSpecificEntry() {
  console.log('\n🧪 Testing specific entry: D S FOLDING WORKS');
  
  const { data: entry, error } = await supabase
    .from('enterprises')
    .select('*')
    .eq('enterprise_name', 'D S FOLDING WORKS')
    .single();

  if (error) {
    console.error('❌ Error fetching test entry:', error);
    return;
  }

  if (entry) {
    console.log('📋 Entry details:');
    console.log(`   - Name: ${entry.enterprise_name}`);
    console.log(`   - State: ${entry.state_name}`);
    console.log(`   - Slug: ${entry.slug}`);
    console.log(`   - Pincode: ${entry.pincode}`);
    console.log(`   - Expected URL: https://thepeakai.com/${entry.state_name?.toLowerCase()}/${entry.slug}`);
  } else {
    console.log('❌ Entry not found');
  }
}

// Run the comprehensive fix
fixAllMSMEEntries()
  .then(() => testSpecificEntry())
  .then(() => {
    console.log('\n✅ All operations completed!');
    console.log('🌐 The MSME URLs should now work properly in the format:');
    console.log('   https://thepeakai.com/[state]/[enterprise-name-pincode]');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });