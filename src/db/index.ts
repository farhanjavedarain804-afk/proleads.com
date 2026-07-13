import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

// Lazy singleton — pool is created on first query, not at module load.
// This prevents module-level crashes from breaking the entire SSR render.
let _db: ReturnType<typeof drizzle> | null = null;

function createDb() {
  return drizzle({
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'u749853029_prouser',
      password: process.env.DB_PASSWORD || 'M-husnain@393393',
      database: process.env.DB_NAME || 'u749853029_pro',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    },
    schema,
    mode: 'default',
  });
}

function getDb() {
  if (!_db) {
    try {
      _db = createDb();
    } catch (err) {
      console.error('[DB] Failed to initialize:', err);
      throw err;
    }
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop: string | symbol) {
    return (getDb() as any)[prop];
  },
});
