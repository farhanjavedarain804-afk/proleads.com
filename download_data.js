import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://fvvdccbwcvirbuheqatj.supabase.co';
const supabaseKey = 'sb_publishable_rszkyGhU4nXNcqQD_e7ZIg_AmflgriK';
const supabase = createClient(supabaseUrl, supabaseKey);

async function downloadData() {
  console.log('Logging in...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'muhammadhusnain393393@gmail.com',
    password: 'Husnain@2341',
  });

  if (authError) {
    console.error('Login failed:', authError.message);
    return;
  }
  console.log('Login successful');

  const tables = [
    'site_settings',
    'services',
    'reviews',
    'faqs',
    'coverage_states',
    'coverage_cities',
    'contact_submissions'
  ];

  const dbData = {};

  for (const table of tables) {
    console.log(`Downloading ${table}...`);
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`Error downloading ${table}:`, error.message);
    } else {
      dbData[table] = data;
      console.log(`Downloaded ${data.length} rows from ${table}`);
    }
  }

  fs.writeFileSync('supabase_data.json', JSON.stringify(dbData, null, 2));
  console.log('Data saved to supabase_data.json');
}

downloadData();
