import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

// Use the drizzle config-object API so drizzle handles the mysql2 pool
// creation internally — avoids ESM/CJS interop issues in the bundled output.
export const db = drizzle({
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
