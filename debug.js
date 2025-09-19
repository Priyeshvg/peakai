import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lzlsxhgpohqekhqrtrnf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6bHN4aGdwb2hxZWtocXJ0cm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzgzNjAsImV4cCI6MjA0MTU1NDM2MH0.9X5ELNLZFQwHCCdZ5bPIKPP0k4bEY7Wks9MQUGaL1EU'
);

async function debug() {
  console.log('Searching for Karnataka enterprises with DRAKSHAYANI...');
  const { data: karnataka, error: kError } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', 'KARNATAKA')
    .ilike('enterprise_name', '%DRAKSHAYANI%');
  console.log('Karnataka results:', karnataka);
  if (kError) console.log('Karnataka error:', kError);
  
  console.log('\nSearching for Gujarat enterprises with GANESH HITECH...');
  const { data: gujarat, error: gError } = await supabase
    .from('enterprises')
    .select('enterprise_name, pincode, state_name')
    .eq('state_name', 'GUJARAT')
    .ilike('enterprise_name', '%GANESH HITECH%');
  console.log('Gujarat results:', gujarat);
  if (gError) console.log('Gujarat error:', gError);

  console.log('\nTesting exact slug parsing...');
  const slug1 = 'drakshayani-arahunashi-power-looms-textiles-000000';
  const parts1 = slug1.split('-');
  const pincode1 = parts1[parts1.length - 1];
  const companySlug1 = parts1.slice(0, -1).join('-');
  console.log('Slug1:', slug1);
  console.log('Pincode1:', pincode1);
  console.log('CompanySlug1:', companySlug1);
  console.log('CompanySlug1 with spaces:', companySlug1.replace(/-/g, ' '));
}

debug();