const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTE5NzAsImV4cCI6MjA3MTA4Nzk3MH0.1XOxMLdCsH8Co7ahLFlMlHIzBB1LjxNm44jrYDhi_ms';

const supabase = createClient(supabaseUrl, supabaseKey);

function createSlug(text, state) {
  const stateName = state.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  const companySlug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 40);
  return `${stateName}/${companySlug}`;
}

async function importStateData(stateName, filePath, maxRecords = 300) {
  console.log(`\n🚀 Starting import for ${stateName}...`);
  console.log(`📁 File: ${filePath}`);
  console.log(`📊 Max records: ${maxRecords}`);

  const enterprises = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (count >= maxRecords) return;

        try {
          // Skip if essential fields are missing
          if (!row.EnterpriseName?.trim()) return;

          const enterprise = {
            enterprise_name: row.EnterpriseName.trim(),
            state_name: stateName,
            district_name: row.District?.trim() || 'Unknown',
            pincode: row.Pincode ? parseInt(row.Pincode.replace(/[^0-9]/g, '')) : null,
            registration_date: row.RegistrationDate || null,
            communication_address: row.CommunicationAddress?.trim() || null,
          };

          // Validate pincode
          if (enterprise.pincode && (enterprise.pincode < 100000 || enterprise.pincode > 999999)) {
            enterprise.pincode = null;
          }

          enterprises.push(enterprise);
          count++;

          if (count % 100 === 0) {
            console.log(`  📝 Processed ${count} records...`);
          }
        } catch (error) {
          console.error('  ❌ Error processing row:', error.message);
        }
      })
      .on('end', async () => {
        console.log(`\n  📋 Parsed ${enterprises.length} enterprises. Inserting into database...`);

        try {
          let insertedCount = 0;
          
          // Insert in batches of 50 for better reliability
          for (let i = 0; i < enterprises.length; i += 50) {
            const batch = enterprises.slice(i, i + 50);
            
            const { data, error } = await supabase
              .from('enterprises')
              .insert(batch)
              .select('id');

            if (error) {
              console.error(`  ❌ Error inserting batch ${Math.floor(i/50) + 1}:`, error.message);
              continue;
            }

            insertedCount += data.length;
            console.log(`  ✅ Inserted batch ${Math.floor(i/50) + 1}: ${data.length} records (Total: ${insertedCount})`);
            
            // Small delay between batches
            await new Promise(resolve => setTimeout(resolve, 100));
          }

          console.log(`  🎉 ${stateName} import completed! Inserted ${insertedCount} enterprises.`);
          resolve(insertedCount);
        } catch (error) {
          console.error(`  💥 ${stateName} import failed:`, error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error(`  ❌ File reading error for ${stateName}:`, error);
        reject(error);
      });
  });
}

async function importMultipleStates() {
  const statesToImport = [
    {
      name: 'MAHARASHTRA',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/MAHARASHTRA/MAHARASHTRA_part1.csv',
      limit: 800 // Major business state
    },
    {
      name: 'KARNATAKA', 
      file: '/Users/priyeshgandhi/Downloads/All_state_data/KARNATAKA/KARNATAKA_part1.csv',
      limit: 600 // Tech hub
    },
    {
      name: 'TAMIL NADU',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/TAMIL_NADU/TAMIL_NADU_part1.csv', 
      limit: 600 // Industrial state
    },
    {
      name: 'UTTAR PRADESH',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/UTTAR_PRADESH/UTTAR_PRADESH_part1.csv',
      limit: 500 // Most populous
    },
    {
      name: 'WEST BENGAL',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/WEST_BENGAL/WEST_BENGAL_part1.csv',
      limit: 400
    },
    {
      name: 'RAJASTHAN',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/RAJASTHAN/RAJASTHAN_part1.csv',
      limit: 400
    },
    {
      name: 'MADHYA PRADESH',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/MADHYA_PRADESH/MADHYA_PRADESH_part1.csv',
      limit: 300
    },
    {
      name: 'HARYANA',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/HARYANA/HARYANA_part1.csv',
      limit: 300
    },
    {
      name: 'PUNJAB',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/PUNJAB/PUNJAB_part1.csv',
      limit: 300
    },
    {
      name: 'KERALA',
      file: '/Users/priyeshgandhi/Downloads/All_state_data/KERALA/KERALA_part1.csv',
      limit: 300
    }
  ];

  console.log('🌟 Starting multi-state MSME data import...');
  console.log(`📊 Total states to import: ${statesToImport.length}`);
  console.log(`🎯 Estimated total records: ${statesToImport.reduce((sum, state) => sum + state.limit, 0)}`);

  let totalImported = 0;
  let successfulStates = 0;

  for (const state of statesToImport) {
    try {
      // Check if file exists
      if (!fs.existsSync(state.file)) {
        console.log(`⚠️  Skipping ${state.name}: File not found`);
        continue;
      }

      const imported = await importStateData(state.name, state.file, state.limit);
      totalImported += imported;
      successfulStates++;

      console.log(`✅ ${state.name}: ${imported} enterprises imported`);
      
      // Pause between states to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Failed to import ${state.name}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 MULTI-STATE IMPORT COMPLETED!');
  console.log('='.repeat(60));
  console.log(`✅ Successfully imported: ${successfulStates} states`);
  console.log(`📊 Total enterprises added: ${totalImported.toLocaleString()}`);
  console.log(`🌍 Directory now covers major Indian states`);
  console.log(`🚀 Ready for production deployment!`);
}

// Check current database size first
async function checkDatabaseStats() {
  console.log('📊 Checking current database statistics...');
  
  try {
    const { count, error } = await supabase
      .from('enterprises')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error getting count:', error);
      return;
    }

    console.log(`📈 Current enterprises in database: ${count?.toLocaleString()}`);
    
    // Get state breakdown
    const { data: states, error: stateError } = await supabase
      .from('enterprises')
      .select('state_name')
      .limit(1000);
      
    if (!stateError && states) {
      const stateCounts = states.reduce((acc, enterprise) => {
        acc[enterprise.state_name] = (acc[enterprise.state_name] || 0) + 1;
        return acc;
      }, {});
      
      console.log('📍 Current state breakdown:');
      Object.entries(stateCounts).forEach(([state, count]) => {
        console.log(`  ${state}: ${count}`);
      });
    }

    console.log('');
  } catch (error) {
    console.error('Error checking database stats:', error);
  }
}

// Run the import
checkDatabaseStats()
  .then(() => importMultipleStates())
  .then(() => {
    console.log('\n🎊 All imports completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Import process failed:', error);
    process.exit(1);
  });