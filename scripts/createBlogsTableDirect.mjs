import { createClient } from '@supabase/supabase-js';

// Supabase configuration with service role key
const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTUxMTk3MCwiZXhwIjoyMDcxMDg3OTcwfQ.P5sOJUu-teDR_y-OD6FiX8QUvWnhaArMf21yPJEIeHk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBlogsTable() {
  console.log('🔗 Testing Supabase connection...');
  
  try {
    // Test connection with existing enterprises table
    const { data, error: testError } = await supabase
      .from('enterprises')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.error('❌ Connection test failed:', testError);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    
    // Since we can't use exec_sql, let's try to insert a test blog first
    // This will tell us if the table exists
    console.log('📝 Testing if blogs table exists...');
    
    const { data: testInsert, error: insertError } = await supabase
      .from('blogs')
      .select('*')
      .limit(1);
    
    if (insertError && insertError.code === 'PGRST106') {
      console.log('❌ Blogs table does not exist. Please create it manually in Supabase dashboard.');
      console.log('📋 Use this SQL to create the table:');
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published blogs
CREATE POLICY "Allow public read access to published blogs" ON public.blogs
  FOR SELECT USING (status = 'published');

-- Create policy for service role to manage all blogs
CREATE POLICY "Allow service role full access" ON public.blogs
  FOR ALL USING (true);
      `);
      return false;
    } else if (insertError) {
      console.error('❌ Unexpected error:', insertError);
      return false;
    }
    
    console.log('✅ Blogs table exists and is accessible!');
    
    // Test inserting a sample blog
    const testBlog = {
      title: 'PeakAI: Welcome to Our Blog',
      slug: 'welcome-to-peakai-blog-test',
      content: '<h2>Welcome to the PeakAI Blog</h2><p>This is our first blog post showcasing the power of PeakAI for LinkedIn phone number finding and B2B prospecting. Our blog will cover various topics including LinkedIn automation, B2B sales strategies, and lead generation techniques.</p><p>Stay tuned for more insights on how to maximize your prospecting efforts with PeakAI!</p>',
      meta_description: 'Welcome to PeakAI Blog - Your ultimate resource for LinkedIn prospecting and B2B contact discovery tips and tricks.',
      category: 'General',
      keywords: ['PeakAI', 'LinkedIn', 'B2B', 'prospecting', 'phone finder'],
      status: 'published',
      author: 'PeakAI Team',
      reading_time: 3,
      views: 250,
      featured_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60'
    };
    
    // Try to insert test blog
    const { data: insertedBlog, error: blogInsertError } = await supabase
      .from('blogs')
      .insert(testBlog)
      .select()
      .single();
    
    if (blogInsertError) {
      if (blogInsertError.code === '23505') { // Unique constraint violation
        console.log('✅ Table structure is correct! (Test blog already exists)');
      } else {
        console.error('❌ Error inserting test blog:', blogInsertError);
        return false;
      }
    } else {
      console.log('✅ Test blog inserted successfully!');
      console.log(`   Title: ${insertedBlog.title}`);
      console.log(`   Slug: ${insertedBlog.slug}`);
      console.log(`   Category: ${insertedBlog.category}`);
    }
    
    // Count existing blogs
    const { count, error: countError } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Error counting blogs:', countError);
    } else {
      console.log(`📊 Total blogs in database: ${count}`);
    }
    
    return true;
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    return false;
  }
}

// Run the function
console.log('🚀 Setting up blogs table in Supabase...\n');
createBlogsTable()
  .then(success => {
    if (success) {
      console.log('\n🎉 Table verification complete! Ready to upload blogs.');
    } else {
      console.log('\n❌ Setup failed. Please check the errors above.');
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  });