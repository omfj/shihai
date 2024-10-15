import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";
import { polls, users, voteOptions } from ".";

export const votes = pgTable(
  "vote",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    pollId: text("poll_id")
      .notNull()
      .references(() => polls.id),
    voteOptionId: text("vote_option_id")
      .notNull()
      .references(() => voteOptions.id),
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
