import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env file
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const envPath = resolve(process.cwd(), '.env');
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
    const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);
    if (urlMatch) supabaseUrl = urlMatch[1].trim();
    if (keyMatch) supabaseAnonKey = keyMatch[1].trim();
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkInvestors() {
  const { data, error } = await supabase
    .from('investors')
    .select('name, email, headquarters, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== Latest 10 Investors ===\n');
  data.forEach((inv, idx) => {
    console.log(`${idx + 1}. ${inv.name}`);
    console.log(`   Email: ${inv.email || 'NONE'}`);
    console.log(`   HQ: ${inv.headquarters || 'NONE'}`);
    console.log(`   Created: ${inv.created_at}`);
    console.log('');
  });

  // Count with and without contact info
  const { data: withEmail } = await supabase
    .from('investors')
    .select('id', { count: 'exact', head: true })
    .not('email', 'is', null);

  const { data: allInvestors } = await supabase
    .from('investors')
    .select('id', { count: 'exact', head: true });

  console.log(`\n=== Summary ===`);
  console.log(`Total investors: ${allInvestors?.length || 0}`);
  console.log(`With email: ${withEmail?.length || 0}`);
  console.log(`Without email: ${(allInvestors?.length || 0) - (withEmail?.length || 0)}`);
}

checkInvestors();
