import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: '127.0.0.1',
    port: 3306,
    user: 'u749853029_prouser',
    password: 'M-husnain@393393',
    database: 'u749853029_pro',
  },
});
