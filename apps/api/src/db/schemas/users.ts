import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { sessions, votes, polls } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable(
  "user",
  {
    id: text().notNull().primaryKey().$defaultFn(nanoid),
    username: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => ({
    usernameUnique: uniqueIndex("username_unique").on(table.username),
    emailUnique: uniqueIndex("email_unique").on(table.email),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  polls: many(polls),
  votes: many(votes),
}));

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
export type UserWithoutPassword = Omit<User, "password">;

export const UserSchema = createSelectSchema(users);
export const UserInsertSchema = createInsertSchema(users);
