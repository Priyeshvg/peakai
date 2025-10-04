# MSME Database & Sitemap Management Scripts

Complete toolkit for managing 1M+ MSME enterprises in DocumentDB and generating SEO-optimized sitemaps.

---

## 📋 Table of Contents

1. [Import New MSMEs to DocumentDB](#1-import-new-msmes-to-documentdb)
2. [Generate Priority Sitemaps](#2-generate-priority-sitemaps)
3. [Quick Reference](#quick-reference)
4. [Troubleshooting](#troubleshooting)

---

## 1. Import New MSMEs to DocumentDB

### Script: `import-msme-to-documentdb.js`

Imports new enterprise data into DocumentDB with automatic enrichment (slugs, SEO fields, indexing).

### Prerequisites

**On EC2 (Recommended):**
```bash
ssh -i ~/Downloads/udyam.pem ec2-user@3.108.55.217
```

**Environment Variables:**
```bash
export DOCUMENTDB_URI="mongodb://username:password@your-cluster.docdb.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
```

### Input File Format

Create a JSON file with enterprise data:

```json
[
  {
    "registration_number": "UDYAM-DL-01-0012345",
    "name_of_enterprise": "ABC Technologies Private Limited",
    "address": {
      "state": "Delhi",
      "city": "Central Delhi",
      "district": "New Delhi",
      "pin_code": "110001",
      "full_address": "123 Main Street, Connaught Place, New Delhi"
    },
    "organization_type": "Private Limited Company",
    "major_activity": "Manufacturing",
    "social_category": "General",
    "enterprise_type": "Micro",
    "date_of_commencement": "2020-01-15",
    "date_of_udyam_registration": "2020-06-01"
  }
]
```

**Required Fields:**
- `registration_number` - UDYAM number (unique identifier)
- `name_of_enterprise` - Company name
- `address.state` - Full state name
- `address.city` - City name

**Optional Fields:**
- `organization_type`, `major_activity`, `social_category`, `enterprise_type`
- `date_of_commencement`, `date_of_udyam_registration`
- Any custom fields you want to store

### Usage

**Step 1: Prepare your data file**
```bash
# Example: data/new-delhi-msmes.json
nano data/new-delhi-msmes.json
```

**Step 2: Upload to EC2** (if running locally)
```bash
scp -i ~/Downloads/udyam.pem data/new-delhi-msmes.json ec2-user@3.108.55.217:/home/ec2-user/
```

**Step 3: Run the import**
```bash
# On EC2
cd /path/to/project
node scripts/import-msme-to-documentdb.js data/new-delhi-msmes.json
```

### What It Does

1. ✅ **Validates** input data format
2. ✅ **Checks for duplicates** using registration_number
3. ✅ **Enriches** each record with:
   - `address.state_slug` - URL-friendly state name
   - `address.city_slug` - URL-friendly city name
   - `address.state_code` - 2-letter state code
   - `indexing.priority` - SEO priority based on state
   - `indexing.state_rank` - Rank within state
   - `slugs.canonical_url` - Full URL path
   - `seo.last_modified`, `seo.changefreq`, `seo.priority`
4. ✅ **Inserts** into DocumentDB
5. ✅ **Reports** summary by priority

### Output Example

```
📂 Reading input file: data/new-delhi-msmes.json
📊 Found 5000 enterprises to import
📍 Enterprises span 1 states
🔧 Enriching enterprise data...
✅ Data enrichment complete
🔌 Connecting to DocumentDB...
✅ Connected to DocumentDB
🔍 Checking for duplicate registration numbers...
📥 Inserting 5000 records...
✅ Successfully inserted 5000 records
📊 Total enterprises in database: 1,052,137

📈 Import Summary by Priority:
  Priority 3: 5000 enterprises

✅ Import complete!

Next steps:
1. Generate sitemap: node scripts/generate-sitemap-priority3.js
2. Update robots.ts to include new sitemap
3. Deploy to production: git add, commit, push
```

### Priority Assignment

Edit the `STATE_PRIORITIES` object in the script to customize:

```javascript
const STATE_PRIORITIES = {
  'karnataka': 2,      // Highest priority
  'delhi': 3,
  'maharashtra': 4,
  'tamil-nadu': 5,
  // ... add more states
  // States not listed get priority 999 (lowest)
};
```

---

## 2. Generate Priority Sitemaps

### Script: `generate-all-priority-sitemaps.js`

Generates static XML sitemaps for SEO, automatically splitting large files.

### Prerequisites

**Local machine** (recommended - faster):
```bash
cd /Users/priyeshgandhi/peakai
```

**Ensure EC2 API is running:**
```bash
curl http://3.108.55.217:3000/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Usage

**Generate all priority sitemaps:**
```bash
node scripts/generate-all-priority-sitemaps.js
```

**Generate specific priority:**
```bash
node scripts/generate-all-priority-sitemaps.js 4
```

**Generate priority range:**
```bash
node scripts/generate-all-priority-sitemaps.js 4-7
```

### What It Does

1. ✅ **Fetches** priority counts from API
2. ✅ **Downloads** enterprise data for each priority
3. ✅ **Splits** large priorities into multiple files (15k URLs each)
4. ✅ **Generates** XML sitemaps in `public/` directory
5. ✅ **Provides** code snippets for robots.ts and sitemap-index.xml

### Output Example

```
🚀 Priority Sitemap Generator

📊 Fetching priority distribution from API...
📌 Generating sitemaps for priorities 4-7

Priority Distribution:
  Priority 4: 33,554 enterprises
  Priority 5: 45,553 enterprises
  Priority 6: 37,272 enterprises
  Priority 7: 34,228 enterprises

🔨 Generating sitemap for Priority 4 (33,554 URLs)
📥 Fetching priority 4 enterprises...
  ✅ sitemap-priority4-part1.xml - 15000 URLs (3124.45 KB)
  ✅ sitemap-priority4-part2.xml - 15000 URLs (3087.32 KB)
  ✅ sitemap-priority4-part3.xml - 3554 URLs (731.22 KB)

... (continues for priorities 5, 6, 7)

============================================================
📊 Generation Summary
============================================================
Total sitemaps created: 12
Total URLs: 150,607

Files created:
  - sitemap-priority4-part1.xml (15000 URLs, 3124.45 KB)
  - sitemap-priority4-part2.xml (15000 URLs, 3087.32 KB)
  - sitemap-priority4-part3.xml (3554 URLs, 731.22 KB)
  ... (and more)

============================================================
📝 Add these to app/robots.ts sitemap array:
============================================================
      'https://thepeakai.com/sitemap-priority4-part1.xml',
      'https://thepeakai.com/sitemap-priority4-part2.xml',
      'https://thepeakai.com/sitemap-priority4-part3.xml',
      ...

============================================================
📝 Add these to app/sitemap-index.xml/route.ts:
============================================================
  <sitemap>
    <loc>${baseUrl}/sitemap-priority4-part1.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  ...

✅ All sitemaps generated successfully!

Next steps:
1. Review the files in public/ directory
2. Update app/robots.ts with the sitemap URLs shown above
3. Update app/sitemap-index.xml/route.ts with the entries shown above
4. Commit and push: git add public/sitemap-* app/robots.ts app/sitemap-index.xml/
5. After deployment, submit to Google Search Console
```

### Files Created

- `public/sitemap-priority{N}.xml` - Single file (if <15k URLs)
- `public/sitemap-priority{N}-part{X}.xml` - Multiple parts (if >15k URLs)

---

## Quick Reference

### Complete Workflow: Add New MSMEs → Generate Sitemaps → Deploy

```bash
# 1. PREPARE DATA
# Create JSON file with new MSME data
nano data/new-enterprises.json

# 2. IMPORT TO DOCUMENTDB
# SSH to EC2
ssh -i ~/Downloads/udyam.pem ec2-user@3.108.55.217

# Set environment variable (if not already set)
export DOCUMENTDB_URI="mongodb://..."

# Upload data file
scp -i ~/Downloads/udyam.pem data/new-enterprises.json ec2-user@3.108.55.217:/home/ec2-user/

# Run import
node scripts/import-msme-to-documentdb.js /home/ec2-user/new-enterprises.json

# 3. GENERATE SITEMAPS
# Exit EC2, run locally
exit

# Generate sitemaps for the priority you just added
node scripts/generate-all-priority-sitemaps.js 3

# 4. UPDATE CONFIGURATION FILES
# Copy the output from the script and update:
# - app/robots.ts (add sitemap URLs)
# - app/sitemap-index.xml/route.ts (add sitemap entries)

# 5. VERIFY FILES
ls -lh public/sitemap-priority*.xml

# 6. DEPLOY
git add public/sitemap-priority*.xml app/robots.ts app/sitemap-index.xml/route.ts
git commit -m "Add priority 3 sitemaps with 41,101 new enterprises"
git push origin main

# 7. VERIFY DEPLOYMENT (wait 2 minutes for Netlify)
curl -I https://thepeakai.com/sitemap-priority3-part1.xml

# 8. SUBMIT TO GOOGLE SEARCH CONSOLE
# Go to: https://search.google.com/search-console
# Add each sitemap URL
```

### File Locations

| File | Location | Purpose |
|------|----------|---------|
| Import script | `scripts/import-msme-to-documentdb.js` | Add MSMEs to DB |
| Sitemap generator | `scripts/generate-all-priority-sitemaps.js` | Create sitemaps |
| Split script (P3) | `scripts/split-sitemap-priority3.js` | Split priority 3 |
| EC2 API server | `~/Downloads/udyam-api-server-updated.js` | Backend API |
| Robots config | `app/robots.ts` | Sitemap references |
| Sitemap index | `app/sitemap-index.xml/route.ts` | Sitemap list |
| Static sitemaps | `public/sitemap-*.xml` | Generated files |
| Context docs | `WEBSITE_CONTEXT.md` | Full documentation |

### Key Commands

```bash
# Check DocumentDB connection
mongo --ssl --host your-cluster.docdb.amazonaws.com:27017 \
  --sslCAFile global-bundle.pem \
  --username admin --password pass

# Check API health
curl http://3.108.55.217:3000/health

# Get priority counts
curl http://3.108.55.217:3000/api/enterprises/priority-counts

# Get total enterprise count
curl http://3.108.55.217:3000/api/enterprises/count

# Count URLs in a sitemap
curl -s https://thepeakai.com/sitemap-priority2.xml | grep -c "<url>"

# Test sitemap loads
curl -I https://thepeakai.com/sitemap-priority3-part1.xml

# List all static sitemaps
ls -lh public/sitemap-*.xml

# Update EC2 API
scp -i ~/Downloads/udyam.pem ~/Downloads/udyam-api-server-updated.js ec2-user@3.108.55.217:/home/ec2-user/udyam-api-server.js
ssh -i ~/Downloads/udyam.pem ec2-user@3.108.55.217
pm2 restart udyam-api
```

---

## Troubleshooting

### Import Issues

**Problem: "DOCUMENTDB_URI not set"**
```bash
export DOCUMENTDB_URI="mongodb://username:password@cluster.docdb.amazonaws.com:27017/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
```

**Problem: "Certificate file not found"**
```bash
# Download AWS DocumentDB certificate
wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem -O /home/ec2-user/global-bundle.pem
```

**Problem: "Duplicate registration numbers"**
- The script automatically skips duplicates
- To update existing records, modify the script to use `updateMany` instead of `insertMany`

### Sitemap Generation Issues

**Problem: "Failed to fetch priority counts"**
```bash
# Check if EC2 API is running
curl http://3.108.55.217:3000/health

# Restart if needed
ssh -i ~/Downloads/udyam.pem ec2-user@3.108.55.217
pm2 restart udyam-api
```

**Problem: "Sitemap too large for Google"**
- Script automatically splits files >15k URLs
- Each part should be <5MB for optimal performance

**Problem: "Google Search Console says 'Couldn't fetch'"**
- Wait 2-3 minutes after deployment for Netlify CDN to update
- Verify file exists: `curl -I https://thepeakai.com/sitemap-priority3.xml`
- File should return `HTTP/2 200` and `content-type: application/xml`

### Deployment Issues

**Problem: "Netlify deploy failed"**
```bash
# Check build logs in Netlify dashboard
# Common issue: sitemap files too large (>10MB not recommended)
ls -lh public/sitemap-*.xml
```

**Problem: "Sitemap not accessible after deploy"**
```bash
# Clear Netlify cache
# Go to Netlify dashboard → Deploys → Trigger deploy → Clear cache and deploy
```

---

## Security Notes

⚠️ **NEVER commit these files to Git:**
- `DOCUMENTDB_URI` connection string (contains password)
- `.pem` certificate files
- JSON files with raw enterprise data

✅ **Already in .gitignore:**
- `dist/`
- `*.pem`
- `.env`

---

## Support

- **Documentation**: See `WEBSITE_CONTEXT.md` for full project context
- **EC2 Access**: `ssh -i ~/Downloads/udyam.pem ec2-user@3.108.55.217`
- **API Endpoint**: http://3.108.55.217:3000
- **Production Site**: https://thepeakai.com

---

**Last Updated**: 2025-10-04
**Scripts Version**: 1.0.0
**Total Enterprises**: 1,047,137
**Indexed URLs**: 46,953
