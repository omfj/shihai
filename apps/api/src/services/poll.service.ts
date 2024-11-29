import { eq } from "drizzle-orm";
import { db } from "@/storage/db/drizzle";
import { polls, type PollInsert } from "@/storage/db/schemas/polls";
import { pollsCache } from "@/lib/caches";

export class PollService {
  static async findAll() {
    const cachedPolls = await pollsCache.get("all");

    if (cachedPolls !== null) {
      return cachedPolls;
    }

    const polls = await db.query.polls
      .findMany({
        where: (row, { gt, or, isNull }) =>
          or(gt(row.expiresAt, new Date()), isNull(row.expiresAt)),
        with: {
          votes: true,
        },
      })
      .then((rows) =>
        rows.map((row) => ({
          id: row.id,
          question: row.question,
          createdAt: row.createdAt,
          userId: row.userId,
          expiresAt: row.expiresAt,
          votes: row.votes.length,
        })),
      );

    await pollsCache.set("all", polls);

    return polls;
  }

  static async find(id: string) {
    return await db.query.polls
      .findFirst({
        where: (row, { eq }) => eq(row.id, id),
        with: {
          options: {
            columns: {
              id: true,
              caption: true,
              order: true,
            },
          },
          votes: {
            columns: {
              voteOptionId: true,
              userId: true,
              createdAt: true,
            },
          },
        },
      })
      .then((row) => row ?? null);
  }

  static async create(poll: PollInsert) {
    const createdPoll = await db
      .insert(polls)
      .values(poll)
      .returning()
      .then((rows) => rows[0]);

    await this.invalidateAllPollsCache();

    return createdPoll;
  }

  static async update(id: string, poll: PollInsert) {
    const updatedPoll = await db
      .update(polls)
      .set(poll)
      .where(eq(polls.id, id))
      .returning()
      .then((rows) => rows[0]);

    await this.invalidateAllPollsCache();

    return updatedPoll;
  }

  static async delete(id: string) {
    await db.delete(polls).where(eq(polls.id, id));
    await this.invalidateAllPollsCache();
  }

  static async invalidateAllPollsCache() {
    await pollsCache.delete("all");
  }
}
