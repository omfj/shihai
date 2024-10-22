import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { voteOptions } from "./vote-options";
import { votes } from "./votes";

export const polls = pgTable("poll", {
  id: text().notNull().primaryKey().$defaultFn(nanoid),
  question: text().notNull(),
});

export const pollsRelations = relations(polls, ({ many }) => ({
  options: many(voteOptions),
  votes: many(votes),
}));

export type Poll = InferSelectModel<typeof polls>;
export type PollInsert = InferInsertModel<typeof polls>;

export const PollSchema = createSelectSchema(polls);
export const PollInsertSchema = createInsertSchema(polls);
