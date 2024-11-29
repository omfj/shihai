import { db } from "@/storage/db/drizzle";
import { voteOptions, type VoteOption, type VoteOptionInsert } from "@/storage/db/schemas/mod";
import { eq, inArray, sql } from "drizzle-orm";

export class VoteOptionService {
  static async create(voteOption: VoteOptionInsert) {
    return await db
      .insert(voteOptions)
      .values(voteOption)
      .returning()
      .then((rows) => rows[0]);
  }

  static async createMany(vos: Array<VoteOptionInsert>) {
    if (vos.length === 0) {
      return [];
    }

    return await db.insert(voteOptions).values(vos).returning();
  }

  static async upsert(id: string, voteOption: VoteOptionInsert) {
    return await db
      .insert(voteOptions)
      .values(voteOption)
      .onConflictDoUpdate({
        target: voteOptions.id,
        set: {
          caption: sql`excluded.caption`,
          order: sql`excluded.order`,
        },
        targetWhere: eq(voteOptions.id, id),
      })
      .returning()
      .then((rows) => rows[0]);
  }

  static async upsertMany(vos: Array<VoteOptionInsert>) {
    if (vos.length === 0) {
      return [];
    }

    return await db
      .insert(voteOptions)
      .values(vos)
      .onConflictDoUpdate({
        target: voteOptions.id,
        set: {
          caption: sql`excluded.caption`,
          order: sql`excluded.order`,
        },
      })
      .returning();
  }

  static async update(id: string, voteOption: VoteOption) {
    return await db
      .update(voteOptions)
      .set(voteOption)
      .where(eq(voteOptions.id, id))
      .returning()
      .then((rows) => rows[0]);
  }

  static async updateMany(vos: Array<VoteOption>) {
    if (vos.length === 0) {
      return [];
    }

    return await Promise.all(vos.map((vo) => this.update(vo.id, vo)));
  }

  static async deleteMany(ids: Array<string>) {
    if (ids.length === 0) {
      return [];
    }

    return await db.delete(voteOptions).where(inArray(voteOptions.id, ids)).returning();
  }
}
