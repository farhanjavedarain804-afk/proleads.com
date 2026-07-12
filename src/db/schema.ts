import { mysqlTable, varchar, int, text, timestamp, boolean, json } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const userRoles = mysqlTable('user_roles', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 36 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().default('admin'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const siteSettings = mysqlTable('site_settings', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  phone: varchar('phone', { length: 255 }).notNull().default('(888) 555-0199'),
  phoneTel: varchar('phone_tel', { length: 255 }).notNull().default('+18885550199'),
  email: varchar('email', { length: 255 }).notNull().default('support@proleadsgeneration.com'),
  address: text('address').notNull(),
  adminDisplayName: varchar('admin_display_name', { length: 255 }).notNull().default('Admin'),
  singleton: boolean('singleton').notNull().default(true),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const services = mysqlTable('services', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  iconName: varchar('icon_name', { length: 255 }).notNull().default('Wrench'),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  tag: varchar('tag', { length: 255 }).notNull().default(''),
  features: json('features').notNull().default([]),
  priceFrom: varchar('price_from', { length: 255 }).notNull().default(''),
  responseTime: varchar('response_time', { length: 255 }).notNull().default(''),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const reviews = mysqlTable('reviews', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull().default(''),
  service: varchar('service', { length: 255 }).notNull().default(''),
  rating: int('rating').notNull().default(5),
  reviewDate: varchar('review_date', { length: 255 }).notNull().default(''),
  body: text('body').notNull(),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const faqs = mysqlTable('faqs', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const coverageStates = mysqlTable('coverage_states', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull().unique(),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const coverageCities = mysqlTable('coverage_cities', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  stateId: varchar('state_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const contactSubmissions = mysqlTable('contact_submissions', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 255 }).notNull().default(''),
  service: varchar('service', { length: 255 }).notNull().default(''),
  city: varchar('city', { length: 255 }).notNull().default(''),
  message: text('message').notNull(),
  isRead: boolean('is_read').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
