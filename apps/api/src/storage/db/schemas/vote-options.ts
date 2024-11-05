import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { polls } from "./polls";

export const voteOptions = pgTable("vote_option", {
  id: text().notNull().primaryKey().$defaultFn(nanoid),
  caption: text().notNull(),
  order: integer().notNull(),
  pollId: text("poll_id")
    .notNull()
    .references(() => polls.id, {
      onDelete: "cascade",
    }),
});

export const voteOptionsRelations = relations(voteOptions, ({ one }) => ({
  poll: one(polls, {
    fields: [voteOptions.pollId],
    references: [polls.id],
  }),
}));

export type VoteOption = InferSelectModel<typeof voteOptions>;
export type VoteOptionInsert = InferInsertModel<typeof voteOptions>;

export const VoteOptionSchma = createSelectSchema(voteOptions);
export const VoteOptionInsertSchema = createInsertSchema(voteOptions);
