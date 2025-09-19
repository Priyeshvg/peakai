import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xradhqxopmrtnenivixw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTE5NzAsImV4cCI6MjA3MTA4Nzk3MH0.1XOxMLdCsH8Co7ahLFlMlHIzBB1LjxNm44jrYDhi_ms'
);

async function debugSearch() {
  const slug = 'shree-kastbhanjan-motors-382445';
  const state = 'gujarat';
  
  const parts = slug.split('-');
  const pincode = parts[parts.length - 1];
  const companySlug = parts.slice(0, -1).join('-');
  
  console.log('Parsing slug:', slug);
  console.log('State:', state);
  console.log('Pincode:', pincode);
  console.log('Company slug:', companySlug);
  console.log('Company name search:', companySlug.replace(/-/g, ' '));
  console.log('State search:', state.replace(/-/g, ' ').toUpperCase());
  
  // Test the exact search logic from the function
  console.log('\n=== Strategy 1: Exact pincode + name ===');
  const { data: data1, error: error1 } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', state.replace(/-/g, ' ').toUpperCase())
    .eq('pincode', pincode)
    .ilike('enterprise_name', `%${companySlug.replace(/-/g, ' ')}%`)
    .single();
  
  console.log('Result 1:', data1);
  console.log('Error 1:', error1);
  
  console.log('\n=== Strategy 2: No pincode ===');
  const { data: data2, error: error2 } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', state.replace(/-/g, ' ').toUpperCase())
    .ilike('enterprise_name', `%${companySlug.replace(/-/g, ' ')}%`)
    .single();
  
  console.log('Result 2:', data2);
  console.log('Error 2:', error2);
  
  console.log('\n=== Testing individual words ===');
  const words = companySlug.split('-').filter(word => word.length > 2);
  console.log('Words to test:', words);
  
  for (const word of words) {
    console.log(`\nTesting word: "${word}"`);
    const { data, error } = await supabase
      .from('enterprises')
      .select('enterprise_name, pincode, state_name')
      .eq('state_name', state.replace(/-/g, ' ').toUpperCase())
      .ilike('enterprise_name', `%${word}%`)
      .single();
    
    console.log('Result:', data);
    if (data) break; // Found one
  }
}

debugSearch().catch(console.error);