import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";
import { polls } from ".";

export const voteOptions = pgTable("vote_option", {
  id: text().notNull().primaryKey().$defaultFn(nanoid),
  caption: text().notNull(),
  order: integer().notNull(),
  pollId: text("poll_id")
    .notNull()
    .references(() => polls.id),
});

export const voteOptionsRelations = relations(voteOptions, ({ one }) => ({
  poll: one(polls, {
    fields: [voteOptions.pollId],
    references: [polls.id],
  }),
}));
