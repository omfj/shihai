import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { users } from "./users";
import { createSelectSchema } from "drizzle-zod";

export const sessions = pgTable("session", {
  id: text().notNull().primaryKey().$defaultFn(nanoid),
  userId: text("user_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type Session = InferSelectModel<typeof sessions>;
export type SessionInsert = InferInsertModel<typeof sessions>;

export const SessionSchema = createSelectSchema(sessions);
export const SessionInsertSchema = createSelectSchema(sessions);
