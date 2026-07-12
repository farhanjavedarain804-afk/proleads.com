import fs from 'fs';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function generate() {
  let sql = "";
  
  // 1. Read Drizzle generated schema
  let schemaFile = fs.readFileSync('./drizzle/0000_schema.sql', 'utf8');
  schemaFile = schemaFile.replace(/--> statement-breakpoint/g, '');
  sql += schemaFile;
  sql += "\n\n";

  // 2. Read JSON
  const dataRaw = fs.readFileSync('c:/temp_migration/supabase_data.json', 'utf8');
  const data = JSON.parse(dataRaw);
  
  function escape(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'boolean') return str ? 'true' : 'false';
    if (typeof str === 'number') return str;
    if (typeof str === 'object') return "'" + JSON.stringify(str).replace(/'/g, "\\'") + "'";
    return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
  }

  // settings
  if (data.site_settings) {
    for (const item of data.site_settings) {
      sql += `INSERT IGNORE INTO site_settings (id, phone, phone_tel, email, address, admin_display_name, singleton, updated_at) VALUES (${escape(item.id)}, ${escape(item.phone)}, ${escape(item.phone_tel)}, ${escape(item.email)}, ${escape(item.address)}, ${escape(item.admin_display_name)}, ${item.singleton}, ${escape(item.updated_at)});\n`;
    }
  }

  // services
  if (data.services) {
    for (const item of data.services) {
      sql += `INSERT IGNORE INTO services (id, slug, icon_name, title, description, tag, features, price_from, response_time, sort_order, created_at, updated_at) VALUES (${escape(item.id)}, ${escape(item.slug)}, ${escape(item.icon_name)}, ${escape(item.title)}, ${escape(item.description)}, ${escape(item.tag)}, ${escape(item.features)}, ${escape(item.price_from)}, ${escape(item.response_time)}, ${item.sort_order}, ${escape(item.created_at)}, ${escape(item.updated_at)});\n`;
    }
  }

  // reviews
  if (data.reviews) {
    for (const item of data.reviews) {
      sql += `INSERT IGNORE INTO reviews (id, name, city, service, rating, review_date, body, sort_order, created_at, updated_at) VALUES (${escape(item.id)}, ${escape(item.name)}, ${escape(item.city)}, ${escape(item.service)}, ${item.rating}, ${escape(item.review_date)}, ${escape(item.body)}, ${item.sort_order}, ${escape(item.created_at)}, ${escape(item.updated_at)});\n`;
    }
  }

  // faqs
  if (data.faqs) {
    for (const item of data.faqs) {
      sql += `INSERT IGNORE INTO faqs (id, question, answer, sort_order, created_at, updated_at) VALUES (${escape(item.id)}, ${escape(item.question)}, ${escape(item.answer)}, ${item.sort_order}, ${escape(item.created_at)}, ${escape(item.updated_at)});\n`;
    }
  }

  // coverage
  if (data.coverage_states) {
    for (const item of data.coverage_states) {
      sql += `INSERT IGNORE INTO coverage_states (id, name, sort_order, created_at) VALUES (${escape(item.id)}, ${escape(item.name)}, ${item.sort_order}, ${escape(item.created_at)});\n`;
    }
  }
  if (data.coverage_cities) {
    for (const item of data.coverage_cities) {
      sql += `INSERT IGNORE INTO coverage_cities (id, state_id, name, sort_order, created_at) VALUES (${escape(item.id)}, ${escape(item.state_id)}, ${escape(item.name)}, ${item.sort_order}, ${escape(item.created_at)});\n`;
    }
  }
  
  if (data.contact_submissions) {
    for (const item of data.contact_submissions) {
      sql += `INSERT IGNORE INTO contact_submissions (id, name, email, phone, service, city, message, is_read, created_at) VALUES (${escape(item.id)}, ${escape(item.name)}, ${escape(item.email)}, ${escape(item.phone)}, ${escape(item.service)}, ${escape(item.city)}, ${escape(item.message)}, ${item.is_read}, ${escape(item.created_at)});\n`;
    }
  }

  // User auth
  const email = 'muhammadhusnain393393@gmail.com';
  const plainPassword = 'Husnain@2341';
  const hash = await bcrypt.hash(plainPassword, 10);
  const userId = uuidv4();

  sql += `INSERT IGNORE INTO users (id, email, password_hash) VALUES (${escape(userId)}, ${escape(email)}, ${escape(hash)});\n`;
  sql += `INSERT IGNORE INTO user_roles (user_id, role) VALUES (${escape(userId)}, 'super_admin');\n`;

  fs.writeFileSync('c:/Users/SAS/Desktop/migration_to_hostinger.sql', sql);
  console.log('Saved to c:/Users/SAS/Desktop/migration_to_hostinger.sql');
}

generate().catch(console.error);
