import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/** Every "Start a project" submission. The database is the source of truth — emails can fail, leads must not. */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  locale: text("locale").notNull(),
  services: text("services").array().notNull(),
  description: text("description").notNull(),
  tools: text("tools"),
  timeline: text("timeline"),
  budget: text("budget"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  replyLang: text("reply_lang").notNull(),
  /** new → contacted → proposal → won / lost */
  status: text("status").notNull().default("new"),
  ownerEmailSent: boolean("owner_email_sent").notNull().default(false),
  customerEmailSent: boolean("customer_email_sent").notNull().default(false),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
