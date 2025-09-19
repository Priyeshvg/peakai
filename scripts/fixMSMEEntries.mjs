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

// Function to normalize state name
function normalizeStateName(stateName) {
  if (!stateName) return null;
  
  return stateName.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function fixMSMEEntries() {
  console.log('🚀 Starting MSME entries fix...');
  
  try {
    // First, get all entries to see the current state
    console.log('📊 Fetching all MSME entries...');
    const { data: allEntries, error: fetchError } = await supabase
      .from('enterprises')
      .select('*')
      .order('id');

    if (fetchError) {
      console.error('❌ Error fetching entries:', fetchError);
      return;
    }

    console.log(`📝 Found ${allEntries.length} total entries`);

    // Analyze current state
    const entriesWithoutSlugs = allEntries.filter(entry => !entry.slug);
    const entriesWithCapitalStates = allEntries.filter(entry => 
      entry.state_name && entry.state_name === entry.state_name.toUpperCase()
    );

    console.log(`🔍 Analysis:`);
    console.log(`   - Entries without slugs: ${entriesWithoutSlugs.length}`);
    console.log(`   - Entries with ALL CAPS states: ${entriesWithCapitalStates.length}`);

    // Process entries in batches
    const BATCH_SIZE = 50;
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
            const newSlug = createSlug(entry.enterprise_name, entry.pincode);
            if (newSlug) {
              updates.slug = newSlug;
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
              if (updatedCount % 100 === 0) {
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
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`🎉 MSME entries fix completed!`);
    console.log(`📊 Summary:`);
    console.log(`   - Total entries processed: ${processedCount}`);
    console.log(`   - Total entries updated: ${updatedCount}`);

    // Verify the fix by checking a few examples
    console.log(`🔍 Verification - checking sample entries:`);
    
    const { data: sampleEntries, error: sampleError } = await supabase
      .from('enterprises')
      .select('*')
      .limit(5);

    if (sampleError) {
      console.error('❌ Error fetching sample entries:', sampleError);
    } else {
      sampleEntries.forEach((entry, index) => {
        console.log(`   ${index + 1}. ${entry.enterprise_name}`);
        console.log(`      - State: ${entry.state_name}`);
        console.log(`      - Slug: ${entry.slug || 'NO SLUG'}`);
        console.log(`      - URL: https://thepeakai.com/${entry.state_name?.toLowerCase()}/${entry.slug}`);
      });
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

// Test the URL formation for the specific example
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

// Run the fix
fixMSMEEntries()
  .then(() => testSpecificEntry())
  .then(() => {
    console.log('\n✅ All operations completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });