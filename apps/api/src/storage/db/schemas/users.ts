import { pgTable, text, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { passwords } from "./passwords";
import { votes } from "./votes";
import { polls } from "./polls";
import { roleEnum } from "./enums";

export const users = pgTable(
  "user",
  {
    id: text().notNull().primaryKey().$defaultFn(nanoid),
    username: text().notNull(),
    email: text().notNull(),
    role: roleEnum().notNull().default("user"),
  },
  (table) => ({
    usernameUnique: uniqueIndex("username_unique").on(table.username),
    emailUnique: uniqueIndex("email_unique").on(table.email),
  }),
);

export const usersRelations = relations(users, ({ one, many }) => ({
  polls: many(polls),
  votes: many(votes),
  password: one(passwords),
}));

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export const UserSchema = createSelectSchema(users);
export const UserInsertSchema = createInsertSchema(users);
