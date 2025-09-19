-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  meta_description VARCHAR(160),
  category VARCHAR(100),
  keywords TEXT[],
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  author VARCHAR(100),
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  featured_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_keywords ON blogs USING GIN(keywords);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY IF NOT EXISTS "Allow public read access" ON blogs
  FOR SELECT USING (status = 'published');

-- Create policy to allow authenticated users to manage blogs
CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample blog for testing
INSERT INTO blogs (title, slug, content, meta_description, category, keywords, status, author, reading_time, views, featured_image)
VALUES (
  'Welcome to PeakAI Blog',
  'welcome-to-peakai-blog',
  '<h2>Welcome to the PeakAI Blog</h2><p>This is our first blog post showcasing the power of PeakAI for LinkedIn phone number finding and B2B prospecting.</p>',
  'Welcome to PeakAI Blog - Your ultimate resource for LinkedIn prospecting and B2B contact discovery tips and tricks.',
  'General',
  ARRAY['PeakAI', 'LinkedIn', 'B2B', 'prospecting'],
  'published',
  'PeakAI Team',
  2,
  150,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=60'
) ON CONFLICT (slug) DO NOTHING;