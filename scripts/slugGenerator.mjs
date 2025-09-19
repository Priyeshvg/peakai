import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const CONFIG = {
  DATA_DIR: path.join(__dirname, '..', '..', '..', 'Downloads', 'Data', 'MSME-Data', 'All_state_data'),
  BATCH_SIZE: 1000,
  MAX_NAME_LENGTH: 50
};

class SlugGenerator {
  constructor() {
    this.processedCount = 0;
    this.failedCount = 0;
    this.duplicateCount = 0;

    // Track duplicates by unique combination: name+pincode+state+city
    this.duplicateTracker = new Map(); // key: "name-pincode-state-city", value: counter
    this.stateStats = new Map();
  }

  // Clean enterprise name for slug generation
  cleanBusinessName(enterpriseName) {
    if (!enterpriseName || enterpriseName.trim() === '') {
      return null;
    }

    // Clean enterprise name
    let cleanName = enterpriseName
      .replace(/['"]/g, '') // Remove quotes
      .replace(/\s+/g, ' ') // Multiple spaces to single
      .trim()
      .toUpperCase();

    // Remove common business suffixes for cleaner URLs
    const suffixes = [
      'PRIVATE LIMITED', 'PVT LTD', 'PVT. LTD.', 'PRIVATE LTD',
      'LIMITED', 'LTD', 'LTD.', 'COMPANY', 'CO.', 'CO',
      'PROPRIETORSHIP', 'PARTNERSHIP', 'ENTERPRISES', 'ENTERPRISE',
      'SERVICES', 'SERVICE', 'TRADERS', 'TRADER', 'WORKS',
      'INDUSTRIES', 'INDUSTRY', 'MANUFACTURING', 'MFG'
    ];

    for (const suffix of suffixes) {
      const regex = new RegExp(`\\s+${suffix}\\s*$`, 'i');
      cleanName = cleanName.replace(regex, '');
    }

    // Convert to URL-friendly format
    let slug = cleanName
      .replace(/[^A-Z0-9\s]/g, '') // Keep only alphanumeric and spaces
      .replace(/\s+/g, '-') // Spaces to hyphens
      .replace(/-+/g, '-') // Multiple hyphens to single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      .toLowerCase();

    // Truncate if too long
    if (slug.length > CONFIG.MAX_NAME_LENGTH) {
      slug = slug.substring(0, CONFIG.MAX_NAME_LENGTH);
      slug = slug.replace(/-[^-]*$/, ''); // Remove partial word at end
    }

    return slug || null;
  }

  // Generate slug with duplicate handling
  generateSlug(enterpriseName, pincode, state, district) {
    const cleanName = this.cleanBusinessName(enterpriseName);
    if (!cleanName) {
      return null;
    }

    // Clean pincode
    const cleanPincode = Math.floor(parseFloat(pincode) || 0);
    if (cleanPincode < 100000 || cleanPincode > 999999) {
      console.warn(`Invalid pincode: ${pincode} for ${enterpriseName}`);
      return null;
    }

    // Create unique key for duplicate tracking: name+pincode+state+city
    const uniqueKey = `${cleanName}-${cleanPincode}-${state.toLowerCase()}-${district.toLowerCase()}`;

    // Check if this exact combination exists
    if (this.duplicateTracker.has(uniqueKey)) {
      // Increment counter for this combination
      const counter = this.duplicateTracker.get(uniqueKey) + 1;
      this.duplicateTracker.set(uniqueKey, counter);
      this.duplicateCount++;

      // Return slug with counter: business-name-2-pincode
      return `${cleanName}-${counter}-${cleanPincode}`;
    } else {
      // First occurrence - no counter needed
      this.duplicateTracker.set(uniqueKey, 1);
      return `${cleanName}-${cleanPincode}`;
    }
  }

  // Parse CSV line manually (handles quotes and commas properly)
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"' && (i === 0 || line[i-1] === ',')) {
        inQuotes = true;
      } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i+1] === ',')) {
        inQuotes = false;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  // Process a single CSV file
  async processCSVFile(filePath, stateName) {
    console.log(`\n📁 Processing: ${path.basename(filePath)}`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    if (lines.length < 2) {
      console.log(`⚠️  Empty or invalid file: ${filePath}`);
      return { processed: 0, failed: 0 };
    }

    console.log(`📊 Total lines: ${lines.length - 1}`);

    let processed = 0;
    let failed = 0;
    const enterprises = [];

    // Process each line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const fields = this.parseCSVLine(line);

        // Expected format: LG_ST_Code,State,LG_DT_Code,District,Pincode,RegistrationDate,EnterpriseName,CommunicationAddress,Activities
        if (fields.length < 7) {
          failed++;
          continue;
        }

        const [lgStCode, state, lgDtCode, district, pincode, registrationDate, enterpriseName, ...rest] = fields;

        const slug = this.generateSlug(enterpriseName, pincode, state, district);

        if (slug) {
          enterprises.push({
            lg_st_code: lgStCode,
            state_name: state,
            lg_dt_code: lgDtCode,
            district_name: district,
            pincode: Math.floor(parseFloat(pincode) || 0),
            registration_date: registrationDate,
            enterprise_name: enterpriseName,
            communication_address: rest[0] || '',
            activities: rest[1] || '',
            slug: slug, // Just the name-pincode part
            created_at: new Date().toISOString()
          });
          processed++;
        } else {
          failed++;
        }

        // Progress indicator
        if ((processed + failed) % 10000 === 0) {
          console.log(`   📈 Progress: ${processed + failed}/${lines.length - 1} (${processed} success, ${failed} failed)`);
        }

      } catch (error) {
        console.error(`❌ Error processing line ${i}:`, error.message);
        failed++;
      }
    }

    // Update stats
    if (!this.stateStats.has(stateName)) {
      this.stateStats.set(stateName, { processed: 0, failed: 0, files: 0 });
    }
    const stats = this.stateStats.get(stateName);
    stats.processed += processed;
    stats.failed += failed;
    stats.files += 1;

    console.log(`✅ File completed: ${processed} processed, ${failed} failed`);

    // Save to database in batches
    if (enterprises.length > 0) {
      await this.saveToDatabase(enterprises, stateName);
    }

    return { processed, failed };
  }

  // Save enterprises to Supabase in batches
  async saveToDatabase(enterprises, stateName) {
    console.log(`💾 Saving ${enterprises.length} enterprises to database...`);

    const batchSize = CONFIG.BATCH_SIZE;
    let saved = 0;
    let saveErrors = 0;

    for (let i = 0; i < enterprises.length; i += batchSize) {
      const batch = enterprises.slice(i, i + batchSize);

      try {
        const { data, error } = await supabase
          .from('enterprises')
          .upsert(batch, { onConflict: 'slug' });

        if (error) {
          console.error(`❌ Database error for batch ${Math.floor(i / batchSize) + 1}:`, error.message);
          saveErrors += batch.length;

          // Try individual inserts for failed batch
          for (const enterprise of batch) {
            try {
              const { error: individualError } = await supabase
                .from('enterprises')
                .upsert([enterprise], { onConflict: 'slug' });

              if (!individualError) {
                saved++;
              }
            } catch (err) {
              // Skip individual failures
            }
          }
        } else {
          saved += batch.length;
        }
      } catch (err) {
        console.error(`❌ Network error:`, err.message);
        saveErrors += batch.length;
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log(`✅ Database save completed: ${saved} saved, ${saveErrors} errors`);
  }

  // Process all CSV files in a state directory
  async processState(stateDirPath) {
    const stateName = path.basename(stateDirPath);
    console.log(`\n🏛️  Processing State: ${stateName}`);

    if (!fs.existsSync(stateDirPath)) {
      console.log(`❌ State directory not found: ${stateDirPath}`);
      return;
    }

    const files = fs.readdirSync(stateDirPath)
      .filter(file => file.endsWith('.csv'))
      .sort();

    if (files.length === 0) {
      console.log(`⚠️  No CSV files found in ${stateName}`);
      return;
    }

    console.log(`📂 Found ${files.length} CSV files in ${stateName}`);

    for (const file of files) {
      const filePath = path.join(stateDirPath, file);
      await this.processCSVFile(filePath, stateName);
    }

    // Print state summary
    const stats = this.stateStats.get(stateName);
    if (stats) {
      console.log(`\n📊 ${stateName} Summary:`);
      console.log(`   Files processed: ${stats.files}`);
      console.log(`   Enterprises processed: ${stats.processed.toLocaleString()}`);
      console.log(`   Failed: ${stats.failed.toLocaleString()}`);
      console.log(`   Success rate: ${Math.round((stats.processed / (stats.processed + stats.failed)) * 100)}%`);
    }
  }

  // Test with small sample first
  async testWithSample(sampleSize = 1000) {
    console.log(`🧪 Testing with sample of ${sampleSize} records from Maharashtra...`);

    const maharashtraPath = path.join(CONFIG.DATA_DIR, 'MAHARASHTRA', 'MAHARASHTRA_part1.csv');

    if (!fs.existsSync(maharashtraPath)) {
      console.error(`❌ Test file not found: ${maharashtraPath}`);
      return;
    }

    const fileContent = fs.readFileSync(maharashtraPath, 'utf-8');
    const lines = fileContent.split('\n');

    // Process first 1000 lines
    const sampleLines = lines.slice(0, Math.min(sampleSize + 1, lines.length));

    let slugs = [];
    for (let i = 1; i < sampleLines.length; i++) {
      const line = sampleLines[i].trim();
      if (!line) continue;

      try {
        const fields = this.parseCSVLine(line);
        if (fields.length >= 7) {
          const [lgStCode, state, lgDtCode, district, pincode, registrationDate, enterpriseName] = fields;
          const slug = this.generateSlug(enterpriseName, pincode, state, district);

          if (slug) {
            slugs.push({
              enterprise_name: enterpriseName,
              slug: slug,
              state: state,
              district: district,
              pincode: pincode
            });
          }
        }
      } catch (error) {
        // Skip errors in test
      }
    }

    console.log(`\n🔍 Sample Results (first 10):`);
    slugs.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.enterprise_name}`);
      console.log(`   Slug: ${item.slug}`);
      console.log(`   Location: ${item.district}, ${item.state} - ${item.pincode}\n`);
    });

    console.log(`📊 Test Summary:`);
    console.log(`   Processed: ${slugs.length}`);
    console.log(`   Duplicates handled: ${this.duplicateCount}`);
    console.log(`   Unique combinations tracked: ${this.duplicateTracker.size}`);
  }

  // Process all states
  async processAllStates() {
    console.log('🚀 Starting Slug Generation for All States');

    if (!fs.existsSync(CONFIG.DATA_DIR)) {
      console.error(`❌ Data directory not found: ${CONFIG.DATA_DIR}`);
      return;
    }

    const stateDirs = fs.readdirSync(CONFIG.DATA_DIR)
      .filter(dir => {
        const fullPath = path.join(CONFIG.DATA_DIR, dir);
        return fs.statSync(fullPath).isDirectory() && !dir.startsWith('.');
      })
      .sort();

    console.log(`🗺️  Found ${stateDirs.length} states/UTs to process`);

    for (const stateDir of stateDirs) {
      const stateDirPath = path.join(CONFIG.DATA_DIR, stateDir);
      await this.processState(stateDirPath);
    }

    this.printFinalSummary();
  }

  // Process specific states for testing
  async processSpecificStates(stateNames = ['MAHARASHTRA']) {
    console.log(`🎯 Processing specific states: ${stateNames.join(', ')}`);

    for (const stateName of stateNames) {
      const stateDirPath = path.join(CONFIG.DATA_DIR, stateName);
      await this.processState(stateDirPath);
    }

    this.printFinalSummary();
  }

  printFinalSummary() {
    console.log('\n🎉 SLUG GENERATION COMPLETE!');
    console.log('='.repeat(60));

    let totalProcessed = 0;
    let totalFailed = 0;
    let totalFiles = 0;

    for (const [stateName, stats] of this.stateStats) {
      totalProcessed += stats.processed;
      totalFailed += stats.failed;
      totalFiles += stats.files;

      console.log(`${stateName}: ${stats.processed.toLocaleString()} enterprises (${stats.files} files)`);
    }

    console.log('='.repeat(60));
    console.log(`📊 FINAL STATISTICS:`);
    console.log(`   Total files processed: ${totalFiles}`);
    console.log(`   Total enterprises processed: ${totalProcessed.toLocaleString()}`);
    console.log(`   Total failed: ${totalFailed.toLocaleString()}`);
    console.log(`   Duplicate slugs handled: ${this.duplicateCount.toLocaleString()}`);
    console.log(`   Success rate: ${Math.round((totalProcessed / (totalProcessed + totalFailed)) * 100)}%`);
    console.log(`   Unique business combinations: ${this.duplicateTracker.size.toLocaleString()}`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const generator = new SlugGenerator();

  try {
    if (args.includes('--test')) {
      // Test with small sample
      await generator.testWithSample(1000);
    } else if (args.includes('--maharashtra')) {
      // Process Maharashtra only
      await generator.processSpecificStates(['MAHARASHTRA']);
    } else if (args.includes('--major')) {
      // Process major states
      await generator.processSpecificStates(['MAHARASHTRA', 'DELHI', 'KARNATAKA', 'TAMIL_NADU', 'GUJARAT']);
    } else {
      // Process all states
      await generator.processAllStates();
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

// Export for use in other scripts
export { SlugGenerator };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}