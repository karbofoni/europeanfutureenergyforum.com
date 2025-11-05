const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cfeyoxkzpqnexdqomjsa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZXlveGt6cHFuZXhkcW9tanNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODc2MTcsImV4cCI6MjA3NzY2MzYxN30.FXymYqXBgq3lzJXYwVVGpePRMDI6golwYN2obPQ77Fw'
);

async function verifyDatabase() {
  console.log('Verifying database population...\n');

  const tables = [
    'projects',
    'investors',
    'suppliers',
    'policy_briefs',
    'grid_briefs',
    'events',
    'library_items'
  ];

  for (const table of tables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact' });

    if (error) {
      console.log(`❌ ${table}: Error -`, JSON.stringify(error, null, 2));
    } else {
      console.log(`✅ ${table}: ${count || (data ? data.length : 0)} rows`);
    }
  }
}

verifyDatabase();
