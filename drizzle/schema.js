const { pgTable, serial, text, timestamp, boolean, integer, references } = require('drizzle-orm/pg-core');

// Users table
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
});

// Sessions table
// const sessions = pgTable('sessions', {
//   id: serial('id').primaryKey(),
//   userId: integer('user_id').references(() => users.id).notNull(),
//   expiresAt: timestamp('expires_at').notNull(),
// });

// Events table
const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location'),
  image_url: text('image_url').notNull(),
  start_date_time: timestamp('start_date_time').notNull().defaultNow(),
  end_date_time: timestamp('end_date_time').notNull().defaultNow(),
  price: text('price'),
  is_free: boolean('is_free').default(false),
  category_id: integer('category_id').references(() => categories.id),
  organizer_id: integer('organizer_id').references(() => users.id)
});

// Categories table
const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique()
});

// Orders table
const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  stripeId: text('stripe_id').notNull().unique(),
  totalAmount: text('total_amount'),
  eventId: integer('event_id').references(() => events.id),
  buyerId: integer('buyer_id').references(() => users.id)
});
module.exports = {
  users,
  // sessions,
  orders,
  events,
  categories,
};
