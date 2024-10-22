import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { polls } from "./polls";
import { voteOptions } from "./vote-options";
import { users } from "./users";

export const votes = pgTable(
  "vote",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    pollId: text("poll_id")
      .notNull()
      .references(() => polls.id, {
        onDelete: "cascade",
      }),
    voteOptionId: text("vote_option_id")
      .notNull()
      .references(() => voteOptions.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at")
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.pollId] }),
  }),
);

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  poll: one(polls, {
    fields: [votes.pollId],
    references: [polls.id],
  }),
  voteOption: one(voteOptions, {
    fields: [votes.voteOptionId],
    references: [voteOptions.id],
  }),
}));

export type Vote = InferSelectModel<typeof votes>;
export type VoteInsert = InferInsertModel<typeof votes>;

export const VoteSchema = createSelectSchema(votes);
export const VoteInsertSchema = createInsertSchema(votes);
