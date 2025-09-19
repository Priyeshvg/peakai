const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTE5NzAsImV4cCI6MjA3MTA4Nzk3MH0.1XOxMLdCsH8Co7ahLFlMlHIzBB1LjxNm44jrYDhi_ms';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function exportData() {
  try {
    console.log('🔄 Exporting data from Supabase...');
    
    // Export enterprises
    const { data: enterprises, error: enterprisesError } = await supabase
      .from('enterprises')
      .select('*');

    if (enterprisesError) {
      console.error('Error fetching enterprises:', enterprisesError);
      return;
    }

    // Export enterprise activities
    const { data: activities, error: activitiesError } = await supabase
      .from('enterprise_activities')
      .select('*');

    if (activitiesError) {
      console.error('Error fetching activities:', activitiesError);
      return;
    }

    console.log(`📊 Exported ${enterprises.length} enterprises`);
    console.log(`📋 Exported ${activities.length} activities`);

    // Create Firebase-compatible data structure
    const firebaseData = {
      enterprises: {},
      activities: {},
      metadata: {
        exportDate: new Date().toISOString(),
        totalEnterprises: enterprises.length,
        totalActivities: activities.length
      }
    };

    // Convert enterprises to Firebase format
    enterprises.forEach(enterprise => {
      const enterpriseId = `enterprise_${enterprise.id}`;
      firebaseData.enterprises[enterpriseId] = {
        ...enterprise,
        searchTokens: createSearchTokens(enterprise), // For better search
        slug: createSlug(enterprise)
      };
    });

    // Convert activities to Firebase format
    activities.forEach(activity => {
      const activityId = `activity_${activity.id}`;
      firebaseData.activities[activityId] = activity;
    });

    // Group activities by enterprise
    const enterpriseActivities = {};
    activities.forEach(activity => {
      const enterpriseId = `enterprise_${activity.enterprise_id}`;
      if (!enterpriseActivities[enterpriseId]) {
        enterpriseActivities[enterpriseId] = [];
      }
      enterpriseActivities[enterpriseId].push(activity);
    });

    // Add activities to enterprises
    Object.keys(firebaseData.enterprises).forEach(enterpriseId => {
      const enterprise = firebaseData.enterprises[enterpriseId];
      enterprise.activities = enterpriseActivities[enterpriseId] || [];
    });

    // Save to JSON files
    const exportDir = path.join(__dirname, '..', 'firebase-export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Save complete data
    fs.writeFileSync(
      path.join(exportDir, 'firebase-data.json'), 
      JSON.stringify(firebaseData, null, 2)
    );

    // Save enterprises only (for import)
    fs.writeFileSync(
      path.join(exportDir, 'enterprises.json'), 
      JSON.stringify(firebaseData.enterprises, null, 2)
    );

    // Save activities only (for import)
    fs.writeFileSync(
      path.join(exportDir, 'activities.json'), 
      JSON.stringify(firebaseData.activities, null, 2)
    );

    // Create Firebase import script
    const importScript = `
// Firebase Import Script
// Run this in Firebase console or use Firebase Admin SDK

const enterprisesData = ${JSON.stringify(firebaseData.enterprises, null, 2)};

// Import to Firestore
Object.entries(enterprisesData).forEach(async ([id, enterprise]) => {
  await db.collection('enterprises').doc(id).set(enterprise);
  console.log('Imported:', enterprise.enterprise_name);
});
`;

    fs.writeFileSync(
      path.join(exportDir, 'firebase-import.js'), 
      importScript
    );

    console.log('✅ Export completed!');
    console.log(`📁 Files saved to: ${exportDir}`);
    console.log('📋 Generated files:');
    console.log('  - firebase-data.json (complete data)');
    console.log('  - enterprises.json (enterprises only)');
    console.log('  - activities.json (activities only)');
    console.log('  - firebase-import.js (import script)');

    // Generate Firebase-ready statistics
    const states = [...new Set(enterprises.map(e => e.state_name))];
    const districts = [...new Set(enterprises.map(e => e.district_name))];
    
    console.log('\\n📊 Data Statistics:');
    console.log(`States: ${states.length}`);
    console.log(`Districts: ${districts.length}`);
    console.log(`Total Records: ${enterprises.length}`);
    console.log(`Estimated Firebase Size: ~${(JSON.stringify(firebaseData).length / 1024 / 1024).toFixed(2)} MB`);

  } catch (error) {
    console.error('❌ Export failed:', error);
  }
}

// Helper functions
function createSearchTokens(enterprise) {
  const tokens = [
    enterprise.enterprise_name?.toLowerCase(),
    enterprise.state_name?.toLowerCase(),
    enterprise.district_name?.toLowerCase(),
    enterprise.pincode?.toString(),
  ].filter(Boolean);
  
  return tokens.join(' ').split(' ');
}

function createSlug(enterprise) {
  const stateName = enterprise.state_name?.toLowerCase().replace(/\\s+/g, '-');
  const companySlug = enterprise.enterprise_name?.toLowerCase()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, '-');
  const pincode = enterprise.pincode || '000000';
  
  return `${stateName}/${companySlug}-${pincode}`;
}

// Run export
exportData();