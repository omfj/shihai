import { and, eq } from "drizzle-orm";
import { db } from "@/storage/db/drizzle";
import { votes, type VoteInsert } from "@/storage/db/schemas/mod";

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
  }

  static async update(vote: VoteInsert) {
    await db
      .update(votes)
      .set(vote)
      .where(and(eq(votes.pollId, vote.pollId), eq(votes.userId, vote.userId)));
  }

  static async delete({ pollId, userId }: VotePrimaryKey) {
    await db.delete(votes).where(and(eq(votes.pollId, pollId), eq(votes.userId, userId)));
  }
}
