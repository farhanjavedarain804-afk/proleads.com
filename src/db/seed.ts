import { db } from './index';
import * as schema from './schema';
import fs from 'fs';

async function seed() {
  console.log('Reading extracted data...');
  const dataRaw = fs.readFileSync('c:/temp_migration/supabase_data.json', 'utf8');
  const data = JSON.parse(dataRaw);

  console.log('Seeding siteSettings...');
  if (data.site_settings && data.site_settings.length > 0) {
    for (const item of data.site_settings) {
      await db.insert(schema.siteSettings).values({
        id: item.id,
        phone: item.phone,
        phoneTel: item.phone_tel,
        email: item.email,
        address: item.address,
        adminDisplayName: item.admin_display_name,
        singleton: item.singleton,
        updatedAt: new Date(item.updated_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding services...');
  if (data.services && data.services.length > 0) {
    for (const item of data.services) {
      await db.insert(schema.services).values({
        id: item.id,
        slug: item.slug,
        iconName: item.icon_name,
        title: item.title,
        description: item.description,
        tag: item.tag,
        features: item.features,
        priceFrom: item.price_from,
        responseTime: item.response_time,
        sortOrder: item.sort_order,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding reviews...');
  if (data.reviews && data.reviews.length > 0) {
    for (const item of data.reviews) {
      await db.insert(schema.reviews).values({
        id: item.id,
        name: item.name,
        city: item.city,
        service: item.service,
        rating: item.rating,
        reviewDate: item.review_date,
        body: item.body,
        sortOrder: item.sort_order,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding faqs...');
  if (data.faqs && data.faqs.length > 0) {
    for (const item of data.faqs) {
      await db.insert(schema.faqs).values({
        id: item.id,
        question: item.question,
        answer: item.answer,
        sortOrder: item.sort_order,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding coverage_states...');
  if (data.coverage_states && data.coverage_states.length > 0) {
    for (const item of data.coverage_states) {
      await db.insert(schema.coverageStates).values({
        id: item.id,
        name: item.name,
        sortOrder: item.sort_order,
        createdAt: new Date(item.created_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding coverage_cities...');
  if (data.coverage_cities && data.coverage_cities.length > 0) {
    for (const item of data.coverage_cities) {
      await db.insert(schema.coverageCities).values({
        id: item.id,
        stateId: item.state_id,
        name: item.name,
        sortOrder: item.sort_order,
        createdAt: new Date(item.created_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding contact_submissions...');
  if (data.contact_submissions && data.contact_submissions.length > 0) {
    for (const item of data.contact_submissions) {
      await db.insert(schema.contactSubmissions).values({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        service: item.service,
        city: item.city,
        message: item.message,
        isRead: item.is_read,
        createdAt: new Date(item.created_at)
      }).onDuplicateKeyUpdate({ set: { id: item.id } });
    }
  }

  console.log('Seeding user_roles / admin setup...');
  const bcrypt = await import('bcryptjs');
  const email = 'muhammadhusnain393393@gmail.com';
  const plainPassword = 'Husnain@2341';
  const hash = await bcrypt.hash(plainPassword, 10);
  
  const { v4: uuidv4 } = await import('uuid');
  const userId = uuidv4();

  await db.insert(schema.users).values({
    id: userId,
    email,
    passwordHash: hash
  }).onDuplicateKeyUpdate({ set: { passwordHash: hash } });
  
  await db.insert(schema.userRoles).values({
    userId,
    role: 'super_admin'
  }).onDuplicateKeyUpdate({ set: { role: 'super_admin' } });

  console.log('Data migration completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
