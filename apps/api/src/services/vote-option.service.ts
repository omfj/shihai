import { db } from "@/storage/db/drizzle";
import { voteOptions, type VoteOptionInsert } from "@/storage/db/schemas";

export class VoteOptionService {
  static async create(voteOption: VoteOptionInsert) {
    return await db
      .insert(voteOptions)
      .values(voteOption)
      .returning()
      .then((rows) => rows[0]);
  }

  static async createMany(vos: Array<VoteOptionInsert>) {
    return await db.insert(voteOptions).values(vos).returning();
  }
}
