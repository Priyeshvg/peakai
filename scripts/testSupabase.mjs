import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://xradhqxopmrtnenivixw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyYWRocXhvcG1ydG5lbml2aXh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTQzMjE1NCwiZXhwIjoyMDQ3MDA4MTU0fQ.K9cIhCaOcSC6gOGKs3pRUbXoqj0_vb4kQqHCt8Qw8hA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test connection by querying existing enterprises table
    const { data, error } = await supabase
      .from('enterprises')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Connection error:', error);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('Enterprises table accessible');
      
      // Try to create blogs table
      console.log('\nTrying to create blogs table...');
      
      const createTableResult = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS blogs (
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
        `
      });
      
      if (createTableResult.error) {
        console.error('❌ Create table error:', createTableResult.error);
      } else {
        console.log('✅ Blogs table created successfully!');
      }
    }
  } catch (err) {
    console.error('Fatal error:', err);
  }
}

testConnection();