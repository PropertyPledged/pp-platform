import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
   id: uuid('id').primaryKey().defaultRandom(),
   clerkId: text('clerk_id').notNull().unique(),
   email: text('email').notNull().unique(),
   isOnboarded: boolean('is_onboarded').notNull().default(false),
   createdAt: timestamp('created_at').defaultNow().notNull(),
   updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const userDocs = pgTable('user_docs', {
   id: uuid('id').primaryKey().defaultRandom(),
   userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),
   fileName: text('file_name').notNull(),
   fileUrl: text('file_url').notNull(),
   pathname: text('pathname').notNull(),
   size: text('size'),
   mimeType: text('mime_type'),
   createdAt: timestamp('created_at').defaultNow().notNull(),
   updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
