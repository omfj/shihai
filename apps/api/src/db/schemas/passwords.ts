import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const passwords = pgTable("password", {
  userId: text("user_id").notNull().primaryKey(),
  hashedPassword: text("hashed_password").notNull(),
});

export const passwordsRelations = relations(passwords, ({ one }) => ({
  user: one(users, {
    fields: [passwords.userId],
    references: [users.id],
  }),
}));

export type Password = InferSelectModel<typeof passwords>;
export type PasswordInsert = InferInsertModel<typeof passwords>;

export const PasswordSchema = createSelectSchema(passwords);
export const PasswordInsertSchema = createInsertSchema(passwords);
