#!/usr/bin/env node
/**
 * MSME Import Script - Add New Enterprises to DocumentDB
 *
 * This script imports new MSME data into DocumentDB with proper indexing and SEO fields.
 *
 * Usage:
 *   node scripts/import-msme-to-documentdb.js <input-file.json>
 *
 * Input file format (JSON array):
 * [
 *   {
 *     "registration_number": "UDYAM-XX-00-0000000",
 *     "name_of_enterprise": "Company Name",
 *     "address": {
 *       "state": "State Name",
 *       "city": "City Name",
 *       "district": "District",
 *       "pin_code": "123456",
 *       "full_address": "Complete address"
 *     },
 *     "organization_type": "Proprietorship/Partnership/etc",
 *     "major_activity": "Manufacturing/Service/etc",
 *     "social_category": "General/SC/ST/OBC",
 *     "enterprise_type": "Micro/Small/Medium",
 *     "date_of_commencement": "YYYY-MM-DD",
 *     "date_of_udyam_registration": "YYYY-MM-DD"
 *   }
 * ]
 *
 * Environment Variables Required:
 *   DOCUMENTDB_URI - DocumentDB connection string
 *
 * Prerequisites:
 *   - SSH tunnel to DocumentDB OR running on EC2
 *   - global-bundle.pem certificate file
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Configuration
const DOCUMENTDB_URI = process.env.DOCUMENTDB_URI;
const CERTIFICATE_PATH = '/home/ec2-user/global-bundle.pem'; // Change if running locally

// State priority mapping (customize based on your SEO strategy)
const STATE_PRIORITIES = {
  'karnataka': 2,
  'delhi': 3,
  'maharashtra': 4,
  'tamil-nadu': 5,
  'telangana': 6,
  'uttar-pradesh': 7,
  'gujarat': 8,
  'west-bengal': 9,
  'rajasthan': 10,
  'andhra-pradesh': 11,
  'haryana': 12,
  'madhya-pradesh': 13,
  'kerala': 14,
  'punjab': 15,
  'bihar': 16,
  'odisha': 17,
  'jharkhand': 18,
  'chhattisgarh': 19,
  'assam': 20,
  'uttarakhand': 21,
  'himachal-pradesh': 22,
  'goa': 23,
  'jammu-and-kashmir': 24,
  'puducherry': 25,
};

/**
 * Convert string to URL-friendly slug
 */
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

/**
 * Calculate priority based on state
 */
function calculatePriority(enterprise) {
  const stateSlug = slugify(enterprise.address.state);
  return STATE_PRIORITIES[stateSlug] || 999;
}

/**
 * Generate canonical URL for the enterprise
 */
function generateCanonicalUrl(enterprise) {
  const stateSlug = slugify(enterprise.address.state);
  const citySlug = slugify(enterprise.address.city);
  const companySlug = slugify(enterprise.name_of_enterprise);
  const udyamPart = enterprise.registration_number
    ? `-${enterprise.registration_number.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    : '';

  return `/${stateSlug}/${citySlug}/${companySlug}${udyamPart}`;
}

/**
 * Get state code from state name
 */
function getStateCode(stateName) {
  const stateCodes = {
    'andhra pradesh': 'AP', 'arunachal pradesh': 'AR', 'assam': 'AS',
    'bihar': 'BR', 'chhattisgarh': 'CG', 'goa': 'GA', 'gujarat': 'GJ',
    'haryana': 'HR', 'himachal pradesh': 'HP', 'jharkhand': 'JH',
    'karnataka': 'KA', 'kerala': 'KL', 'madhya pradesh': 'MP',
    'maharashtra': 'MH', 'manipur': 'MN', 'meghalaya': 'ML', 'mizoram': 'MZ',
    'nagaland': 'NL', 'odisha': 'OR', 'punjab': 'PB', 'rajasthan': 'RJ',
    'sikkim': 'SK', 'tamil nadu': 'TN', 'telangana': 'TG', 'tripura': 'TR',
    'uttar pradesh': 'UP', 'uttarakhand': 'UK', 'west bengal': 'WB',
    'delhi': 'DL', 'puducherry': 'PY', 'jammu and kashmir': 'JK',
    'ladakh': 'LA', 'andaman and nicobar': 'AN', 'chandigarh': 'CH',
    'dadra and nagar haveli and daman and diu': 'DH', 'lakshadweep': 'LD',
  };

  return stateCodes[stateName.toLowerCase()] || '';
}

/**
 * Enrich enterprise data with required fields for database
 */
function enrichEnterprise(enterprise, stateRank) {
  const now = new Date().toISOString().split('T')[0];

  return {
    ...enterprise,
    // Address enrichment
    address: {
      ...enterprise.address,
      state_slug: slugify(enterprise.address.state),
      city_slug: slugify(enterprise.address.city),
      state_code: getStateCode(enterprise.address.state),
    },
    // Indexing for search and priority
    indexing: {
      priority: calculatePriority(enterprise),
      state_rank: stateRank,
      created_at: now,
    },
    // URL slugs
    slugs: {
      canonical_url: generateCanonicalUrl(enterprise),
      state_slug: slugify(enterprise.address.state),
      city_slug: slugify(enterprise.address.city),
      company_slug: slugify(enterprise.name_of_enterprise),
    },
    // SEO metadata
    seo: {
      last_modified: now,
      changefreq: 'monthly',
      priority: calculatePriority(enterprise) <= 5 ? 0.8 : 0.7,
    },
    // Import metadata
    import_metadata: {
      imported_at: new Date().toISOString(),
      import_batch: process.argv[2] || 'manual',
    },
  };
}

/**
 * Main import function
 */
async function importMSMEs(inputFile) {
  if (!DOCUMENTDB_URI) {
    console.error('❌ Error: DOCUMENTDB_URI environment variable not set');
    console.log('\nSet it with:');
    console.log('  export DOCUMENTDB_URI="mongodb://username:password@host:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"');
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Error: Input file not found: ${inputFile}`);
    console.log('\nUsage: node scripts/import-msme-to-documentdb.js <input-file.json>');
    process.exit(1);
  }

  console.log('📂 Reading input file:', inputFile);
  const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  if (!Array.isArray(rawData)) {
    console.error('❌ Error: Input file must contain a JSON array');
    process.exit(1);
  }

  console.log(`📊 Found ${rawData.length} enterprises to import`);

  // Group by state to calculate state_rank
  const byState = {};
  rawData.forEach(ent => {
    const stateSlug = slugify(ent.address.state);
    if (!byState[stateSlug]) byState[stateSlug] = [];
    byState[stateSlug].push(ent);
  });

  console.log(`📍 Enterprises span ${Object.keys(byState).length} states`);

  // Enrich data
  console.log('🔧 Enriching enterprise data...');
  let enrichedData = [];

  for (const [stateSlug, enterprises] of Object.entries(byState)) {
    enterprises.forEach((ent, idx) => {
      enrichedData.push(enrichEnterprise(ent, idx + 1));
    });
  }

  console.log('✅ Data enrichment complete');

  // Connect to DocumentDB
  console.log('🔌 Connecting to DocumentDB...');
  const client = new MongoClient(DOCUMENTDB_URI, {
    tls: true,
    tlsCAFile: CERTIFICATE_PATH,
    tlsAllowInvalidHostnames: true,
  });

  try {
    await client.connect();
    console.log('✅ Connected to DocumentDB');

    const db = client.db('udyam');
    const collection = db.collection('records');

    // Check for duplicates
    console.log('🔍 Checking for duplicate registration numbers...');
    const regNumbers = enrichedData
      .filter(e => e.registration_number)
      .map(e => e.registration_number);

    const existing = await collection.find({
      registration_number: { $in: regNumbers }
    }).toArray();

    if (existing.length > 0) {
      console.warn(`⚠️  Warning: Found ${existing.length} existing records with same registration numbers`);
      console.log('Duplicates will be skipped. To update existing records, modify the script.');

      const existingRegNums = new Set(existing.map(e => e.registration_number));
      enrichedData = enrichedData.filter(e => !existingRegNums.has(e.registration_number));

      console.log(`📊 ${enrichedData.length} new records will be inserted`);
    }

    if (enrichedData.length === 0) {
      console.log('ℹ️  No new records to insert');
      await client.close();
      return;
    }

    // Insert data
    console.log(`📥 Inserting ${enrichedData.length} records...`);
    const result = await collection.insertMany(enrichedData, { ordered: false });

    console.log(`✅ Successfully inserted ${result.insertedCount} records`);

    // Get total count
    const totalCount = await collection.countDocuments();
    console.log(`📊 Total enterprises in database: ${totalCount.toLocaleString()}`);

    // Show priority breakdown for imported data
    console.log('\n📈 Import Summary by Priority:');
    const priorityCounts = {};
    enrichedData.forEach(ent => {
      const p = ent.indexing.priority;
      priorityCounts[p] = (priorityCounts[p] || 0) + 1;
    });

    Object.entries(priorityCounts)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .forEach(([priority, count]) => {
        console.log(`  Priority ${priority}: ${count} enterprises`);
      });

    console.log('\n✅ Import complete!');
    console.log('\nNext steps:');
    console.log('1. Generate sitemap: node scripts/generate-sitemap-priority{N}.js');
    console.log('2. Update robots.ts to include new sitemap');
    console.log('3. Deploy to production: git add, commit, push');

  } catch (error) {
    console.error('❌ Error during import:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the import
if (require.main === module) {
  const inputFile = process.argv[2];

  if (!inputFile) {
    console.log('Usage: node scripts/import-msme-to-documentdb.js <input-file.json>');
    console.log('\nExample:');
    console.log('  node scripts/import-msme-to-documentdb.js data/new-msme-data.json');
    process.exit(1);
  }

  importMSMEs(inputFile).catch(console.error);
}

module.exports = { importMSMEs, enrichEnterprise };
