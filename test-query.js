import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xradhqxopmrtnenivixw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTE5NzAsImV4cCI6MjA3MTA4Nzk3MH0.1XOxMLdCsH8Co7ahLFlMlHIzBB1LjxNm44jrYDhi_ms'
);

async function testQuery() {
  console.log('Testing direct database query...');
  
  // First, let's see if we can connect at all
  const { data: testData, error: testError } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .limit(3);
  
  console.log('Connection test:', testData ? 'SUCCESS' : 'FAILED');
  if (testError) console.log('Connection error:', testError);
  if (testData) console.log('Sample data:', testData);
  
  // Now test the specific enterprise search
  console.log('\nSearching for "SHREE KASTBHANJAN" in Gujarat...');
  const { data: specific, error: specificError } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', 'GUJARAT')
    .ilike('enterprise_name', '%SHREE KASTBHANJAN%');
  
  console.log('Specific search results:', specific);
  if (specificError) console.log('Specific search error:', specificError);
  
  // Try searching with different patterns
  console.log('\nTrying alternative searches...');
  const { data: alt1 } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', 'GUJARAT')
    .ilike('enterprise_name', '%KASTBHANJAN%');
  console.log('Alternative 1 (KASTBHANJAN):', alt1);
  
  const { data: alt2 } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', 'GUJARAT')
    .eq('pincode', '382445');
  console.log('Alternative 2 (pincode 382445):', alt2);
}

testQuery().catch(console.error);