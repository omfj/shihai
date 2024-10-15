import { pgTable, text } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";
import { sessions, votes, polls } from ".";

export const users = pgTable("user", {
  id: text().notNull().primaryKey().$defaultFn(nanoid),
  username: text().notNull(),
  email: text().notNull(),
  password: text().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  polls: many(polls),
  votes: many(votes),
}));
