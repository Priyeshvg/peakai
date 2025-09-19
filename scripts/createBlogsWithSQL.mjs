import { createClient } from '@supabase/supabase-js';

// Supabase configuration with service role key
const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(supabaseUrl, supabaseKey);

// SQL to create the blogs table
const createTableSQL = `
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- Enable RLS (but allow service role full access)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published blogs
CREATE POLICY IF NOT EXISTS "Allow public read access to published blogs" ON public.blogs
  FOR SELECT USING (status = 'published');

-- Create policy for service role to manage all blogs  
CREATE POLICY IF NOT EXISTS "Allow service role full access" ON public.blogs
  FOR ALL USING (true);

-- Insert a test blog
INSERT INTO public.blogs (title, slug, content, meta_description, category, keywords, status, author, reading_time, views, featured_image)
VALUES (
  'PeakAI: Welcome to Our Blog',
  'welcome-to-peakai-blog',
  '<h2>Welcome to the PeakAI Blog</h2><p>This is our first blog post showcasing the power of PeakAI for LinkedIn phone number finding and B2B prospecting. Our blog will cover various topics including LinkedIn automation, B2B sales strategies, and lead generation techniques.</p><p>Stay tuned for more insights on how to maximize your prospecting efforts with PeakAI!</p>',
  'Welcome to PeakAI Blog - Your ultimate resource for LinkedIn prospecting and B2B contact discovery tips and tricks.',
  'General',
  ARRAY['PeakAI', 'LinkedIn', 'B2B', 'prospecting', 'phone finder'],
  'published',
  'PeakAI Team',
  3,
  250,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60'
) ON CONFLICT (slug) DO NOTHING;
`;

async function createBlogsTableWithSQL() {
  console.log('🚀 Creating blogs table using REST API...\n');
  
  try {
    // Test connection first
    const { data, error: testError } = await supabase
      .from('enterprises')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.error('❌ Connection test failed:', testError);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    
    // Try to create table using REST API directly
    console.log('📝 Creating blogs table via REST API...');
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey
      },
      body: JSON.stringify({
        query: createTableSQL
      })
    });
    
    if (!response.ok) {
      console.log('❌ REST API approach failed. Trying alternative...');
      
      // Alternative: Try using the SQL editor approach
      console.log('📋 Please run this SQL manually in your Supabase SQL editor:');
      console.log('=' * 60);
      console.log(createTableSQL);
      console.log('=' * 60);
      
      // For now, let's try to test if we can create the table manually
      console.log('\n💡 Manual setup instructions:');
      console.log('1. Go to https://supabase.com/dashboard/project/xradhqxopmrtnenivixw/editor');
      console.log('2. Copy and paste the above SQL');
      console.log('3. Click "Run" to execute');
      console.log('4. Run this script again to verify');
      
      return false;
    }
    
    const result = await response.json();
    console.log('✅ Table creation response:', result);
    
    // Test the table by querying it
    const { data: testBlog, error: queryError } = await supabase
      .from('blogs')
      .select('*')
      .limit(1)
      .single();
    
    if (queryError) {
      console.error('❌ Error querying blogs table:', queryError);
      return false;
    }
    
    console.log('✅ Table test successful! Sample blog:');
    console.log(`   Title: ${testBlog.title}`);
    console.log(`   Slug: ${testBlog.slug}`);
    console.log(`   Category: ${testBlog.category}`);
    console.log(`   Created: ${new Date(testBlog.created_at).toLocaleDateString()}`);
    
    return true;
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    
    // Fallback: Show manual instructions
    console.log('\n📋 Please create the table manually:');
    console.log('=' * 60);
    console.log(createTableSQL);
    console.log('=' * 60);
    
    return false;
  }
}

// Run the function
createBlogsTableWithSQL()
  .then(success => {
    if (success) {
      console.log('\n🎉 Setup complete! Ready to upload blogs.');
    } else {
      console.log('\n❌ Manual setup required. Follow the instructions above.');
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  });