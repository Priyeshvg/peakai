import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

async function createTableDirect() {
  console.log('🔧 Creating blogs table using direct SQL execution...');
  
  try {
    // Use the direct SQL REST endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sql',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Accept': 'application/json'
      },
      body: `
        CREATE TABLE IF NOT EXISTS public.blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          content TEXT NOT NULL,
          meta_description VARCHAR(160),
          category VARCHAR(100),
          keywords TEXT[],
          status VARCHAR(20) DEFAULT 'published',
          featured BOOLEAN DEFAULT FALSE,
          author VARCHAR(100) DEFAULT 'PeakAI Team',
          reading_time INTEGER DEFAULT 2,
          views INTEGER DEFAULT 0,
          featured_image VARCHAR(500),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
        CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
        CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
        CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured);
        CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

        ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

        CREATE POLICY IF NOT EXISTS "Allow public read access to published blogs" ON public.blogs
          FOR SELECT USING (status = 'published');

        CREATE POLICY IF NOT EXISTS "Allow service role full access" ON public.blogs
          FOR ALL USING (true);
      `
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Direct SQL failed:', response.status, errorText);
      
      // Try alternative approach using pg_connection
      console.log('🔄 Trying alternative method...');
      return await createTableAlternative();
    }

    console.log('✅ Table created successfully via direct SQL!');
    return true;

  } catch (error) {
    console.error('❌ Error creating table:', error);
    return await createTableAlternative();
  }
}

async function createTableAlternative() {
  console.log('🔄 Using PostgreSQL connection string approach...');
  
  try {
    // Try to use environment variable approach or direct connection
    const { Pool } = await import('pg');
    
    // Extract database info from Supabase URL
    const projectRef = 'xradhqxopmrtnenivixw';
    const connectionString = `postgresql://postgres:${encodeURIComponent('your-db-password')}@db.${projectRef}.supabase.co:5432/postgres`;
    
    console.log('❌ Cannot use direct PostgreSQL connection without database password.');
    console.log('📋 Please create the table manually in Supabase dashboard:');
    console.log('='.repeat(70));
    console.log(`
CREATE TABLE IF NOT EXISTS public.blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  meta_description VARCHAR(160),
  category VARCHAR(100),
  keywords TEXT[],
  status VARCHAR(20) DEFAULT 'published',
  featured BOOLEAN DEFAULT FALSE,
  author VARCHAR(100) DEFAULT 'PeakAI Team',
  reading_time INTEGER DEFAULT 2,
  views INTEGER DEFAULT 0,
  featured_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to published blogs" ON public.blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow service role full access" ON public.blogs
  FOR ALL USING (true);

INSERT INTO public.blogs (title, slug, content, meta_description, category, keywords, status, author, reading_time, views, featured_image)
VALUES (
  'PeakAI: Welcome to Our Blog',
  'welcome-to-peakai-blog',
  '<h2>Welcome to the PeakAI Blog</h2><p>This is our first blog post showcasing the power of PeakAI for LinkedIn phone number finding and B2B prospecting.</p>',
  'Welcome to PeakAI Blog - Your ultimate resource for LinkedIn prospecting.',
  'General',
  ARRAY['PeakAI', 'LinkedIn', 'B2B', 'prospecting'],
  'published',
  'PeakAI Team',
  3,
  250,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60'
) ON CONFLICT (slug) DO NOTHING;
    `);
    console.log('='.repeat(70));
    
    return false;
    
  } catch (error) {
    console.error('❌ Alternative method failed:', error);
    return false;
  }
}

// Run the function
createTableDirect()
  .then(success => {
    if (success) {
      console.log('🎉 Table creation complete! Ready to upload blogs.');
    } else {
      console.log('❌ Please create table manually using the SQL above.');
      console.log('💡 Go to: https://supabase.com/dashboard/project/xradhqxopmrtnenivixw/sql');
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  });