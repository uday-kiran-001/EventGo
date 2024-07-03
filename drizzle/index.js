const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./schema');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

console.log('Database connection status:', db ? 'connected' : 'disconnected');

module.exports = { db };
