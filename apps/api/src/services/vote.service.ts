import { and, eq } from "drizzle-orm";
import { db } from "@/storage/db/drizzle";
import { votes, type VoteInsert } from "@/storage/db/schemas/mod";
import { PollService } from "./poll.service";

type VotePrimaryKey = {
  pollId: string;
  userId: string;
};

export class VoteService {
  static async find({ pollId, userId }: VotePrimaryKey) {
    return await db.query.votes.findFirst({
      where: (row, { and, eq }) => and(eq(row.pollId, pollId), eq(row.userId, userId)),
    });
  }

  static async create(vote: VoteInsert) {
    await db.insert(votes).values(vote);
    await PollService.invalidateAllPollsCache();
  }

  static async update(vote: VoteInsert) {
    await db
      .update(votes)
      .set(vote)
      .where(and(eq(votes.pollId, vote.pollId), eq(votes.userId, vote.userId)));
    await PollService.invalidateAllPollsCache();
  }

  static async delete({ pollId, userId }: VotePrimaryKey) {
    await db.delete(votes).where(and(eq(votes.pollId, pollId), eq(votes.userId, userId)));
    await PollService.invalidateAllPollsCache();
  }
}
