import { pgTable, uuid, text, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["TENANT", "LANDLORD", "LEASEHOLDER", "MANAGER", "ADMIN"]);

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export const UserRole = {
  TENANT: "TENANT",
  LANDLORD: "LANDLORD",
  LEASEHOLDER: "LEASEHOLDER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
} as const;

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  displayName: text("display_name").unique(),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role"),
  isOnboarded: boolean("is_onboarded").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const propertiesTable = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  address: text("address").notNull().unique(),
  city: text("city").notNull(),
  postcode: text("postcode").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviewsTable = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  evidenceUrl: text("evidence_url"),
  stayStartDate: timestamp("stay_start_date"),
  stayEndDate: timestamp("stay_end_date"),
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  propertyId: uuid("property_id").notNull().references(() => propertiesTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  reviews: many(reviewsTable),
}));

export const propertiesRelations = relations(propertiesTable, ({ many }) => ({
  reviews: many(reviewsTable),
}));

export const reviewsRelations = relations(reviewsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [reviewsTable.userId],
    references: [usersTable.id],
  }),
  property: one(propertiesTable, {
    fields: [reviewsTable.propertyId],
    references: [propertiesTable.id],
  }),
}));
