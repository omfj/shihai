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
    githubId: text("github_id").notNull(),
  },
  (table) => ({
    ghIdIdx: uniqueIndex("github_id_idx").on(table.githubId),
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
