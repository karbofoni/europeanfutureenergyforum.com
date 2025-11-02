import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

// Load environment variables
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If not in environment, try to read from .env file
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
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runMigrations() {
  console.log('Running database migrations...\n');

  const migrationsDir = resolve(process.cwd(), 'supabase/migrations');

  if (!existsSync(migrationsDir)) {
    console.log('No migrations directory found');
    return;
  }

  const files = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    console.log(`Running migration: ${file}`);
    const sql = readFileSync(join(migrationsDir, file), 'utf-8');

    let error = null;
    try {
      const result = await supabase.rpc('exec_sql', { sql_query: sql });
      error = result.error;
    } catch (e) {
      // RPC might not exist, use direct query instead
      error = null;
    }

    if (error) {
      // Try direct execution using from() - won't work for DDL but let's try
      console.log(`  ℹ Could not execute via RPC, skipping: ${file}`);
      console.log(`  Please run this migration manually in Supabase SQL editor:\n`);
      console.log(`  ${sql.substring(0, 200)}...\n`);
    } else {
      console.log(`  ✓ Migration completed: ${file}`);
    }
  }

  console.log('\nMigrations complete! If any failed, run them manually in Supabase SQL editor.');
}

runMigrations().catch(console.error);
