import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xradhqxopmrtnenivixw.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkCurrentSlugStatus() {
  console.log('🔍 Checking current slug status...');
  
  try {
    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('enterprises')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error getting total count:', countError);
      return;
    }

    // Get count of entries with slugs
    const { count: withSlugsCount, error: slugsError } = await supabase
      .from('enterprises')
      .select('*', { count: 'exact', head: true })
      .not('slug', 'is', null)
      .neq('slug', '');

    if (slugsError) {
      console.error('❌ Error getting slugs count:', slugsError);
      return;
    }

    // Get count of entries without slugs
    const { count: withoutSlugsCount, error: noSlugsError } = await supabase
      .from('enterprises')
      .select('*', { count: 'exact', head: true })
      .or('slug.is.null,slug.eq.');

    if (noSlugsError) {
      console.error('❌ Error getting no-slugs count:', noSlugsError);
      return;
    }

    // Get count of entries with ALL CAPS states
    const { count: capsStatesCount, error: capsError } = await supabase
      .from('enterprises')
      .select('*', { count: 'exact', head: true })
      .like('state_name', '*%');

    console.log('📊 Current Database Status:');
    console.log(`   - Total entries: ${totalCount}`);
    console.log(`   - Entries with slugs: ${withSlugsCount}`);
    console.log(`   - Entries without slugs: ${withoutSlugsCount}`);
    console.log(`   - Progress: ${Math.round((withSlugsCount / totalCount) * 100)}%`);

    // Get sample of recent entries with slugs
    console.log('\n📝 Sample of recent entries with slugs:');
    const { data: sampleWithSlugs, error: sampleError } = await supabase
      .from('enterprises')
      .select('enterprise_name, state_name, slug, pincode')
      .not('slug', 'is', null)
      .neq('slug', '')
      .order('id', { ascending: false })
      .limit(5);

    if (sampleError) {
      console.error('❌ Error fetching sample:', sampleError);
    } else {
      sampleWithSlugs?.forEach((entry, index) => {
        console.log(`   ${index + 1}. ${entry.enterprise_name}`);
        console.log(`      - State: ${entry.state_name}`);
        console.log(`      - Slug: ${entry.slug}`);
        console.log(`      - URL: https://thepeakai.com/${entry.state_name?.toLowerCase()}/${entry.slug}`);
        console.log('');
      });
    }

    // Get sample of entries without slugs
    console.log('❌ Sample of entries still without slugs:');
    const { data: sampleWithoutSlugs, error: noSlugSampleError } = await supabase
      .from('enterprises')
      .select('enterprise_name, state_name, slug, pincode')
      .or('slug.is.null,slug.eq.')
      .limit(3);

    if (noSlugSampleError) {
      console.error('❌ Error fetching no-slug sample:', noSlugSampleError);
    } else {
      sampleWithoutSlugs?.forEach((entry, index) => {
        console.log(`   ${index + 1}. ${entry.enterprise_name}`);
        console.log(`      - State: ${entry.state_name}`);
        console.log(`      - Slug: ${entry.slug || 'MISSING'}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

checkCurrentSlugStatus()
  .then(() => {
    console.log('✅ Status check completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Status check failed:', error);
    process.exit(1);
  });