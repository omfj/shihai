import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { voteOptions } from "./vote-options";
import { votes } from "./votes";
import { users } from "./users";

export const polls = pgTable("poll", {
  id: text().notNull().primaryKey().$defaultFn(nanoid),
  question: text().notNull(),
  userId: text("user_id").notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pollsRelations = relations(polls, ({ one, many }) => ({
  options: many(voteOptions),
  votes: many(votes),
  user: one(users, {
    fields: [polls.userId],
    references: [users.id],
  }),
}));

export type Poll = InferSelectModel<typeof polls>;
export type PollInsert = InferInsertModel<typeof polls>;

export const PollSchema = createSelectSchema(polls);
export const PollInsertSchema = createInsertSchema(polls);
