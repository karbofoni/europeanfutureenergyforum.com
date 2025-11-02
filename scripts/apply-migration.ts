import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load environment variables
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const envPath = resolve(process.cwd(), '.env');
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    const envVars: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
    supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function applyMigration() {
  console.log('Reading migration file...');

  const migrationPath = resolve(process.cwd(), 'supabase/migrations/003_health_check_reports.sql');
  const sql = readFileSync(migrationPath, 'utf-8');

  console.log('\n📋 Migration SQL:\n');
  console.log(sql);
  console.log('\n' + '='.repeat(80) + '\n');

  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements to execute\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`\n[${i + 1}/${statements.length}] Executing statement...`);
    console.log(statement.substring(0, 100) + '...\n');

    try {
      // Try using rpc if available
      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: statement
      });

      if (error) {
        console.error(`❌ Error: ${error.message}`);

        // If RPC doesn't exist, we need manual execution
        if (error.message.includes('function') || error.message.includes('does not exist')) {
          console.log('\n⚠️  Cannot execute DDL statements via API.');
          console.log('\n📌 Please run this migration manually:');
          console.log('\n1. Go to: https://supabase.com/dashboard');
          console.log('2. Select your project');
          console.log('3. Go to SQL Editor');
          console.log('4. Copy and paste the entire migration file');
          console.log('5. Click "Run"\n');
          process.exit(1);
        }
      } else {
        console.log('✅ Success');
      }
    } catch (err: any) {
      console.error(`❌ Failed: ${err.message}`);
    }
  }

  console.log('\n✅ Migration completed!');
}

applyMigration().catch(console.error);
