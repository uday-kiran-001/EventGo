const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const schema = require('./schema');

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "eventgo",
});

const db = drizzle(pool);

async function createTables() {
  try {
    console.log('Creating tables...');
    
    // Users table
    await db.execute(schema.users);
    console.log('Users table created or already exists');

    // Orders table
    await db.execute(schema.orders);
    console.log('Orders table created or already exists');

    // Events table
    await db.execute(schema.events);
    console.log('Events table created or already exists');

    // Categories table
    await db.execute(schema.categories);
    console.log('Categories table created or already exists');

    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await pool.end();
  }
}

createTables();