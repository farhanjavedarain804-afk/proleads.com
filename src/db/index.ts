import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'u749853029_prouser',
  password: 'M-husnain@393393',
  database: 'u749853029_pro',
});

export const db = drizzle(connection, { schema, mode: 'default' });
