import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { polls, type PollInsert } from "../db/schemas/polls";

export class PollService {
  static async findAll() {
    return await db.query.polls.findMany();
  }

  static async find(id: string) {
    return await db.query.polls.findFirst({
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
    });
  }

  static async create(poll: PollInsert) {
    await db.insert(polls).values(poll);
  }

  static async update(id: string, poll: PollInsert) {
    await db.update(polls).set(poll).where(eq(polls.id, id));
  }

  static async delete(id: string) {
    await db.delete(polls).where(eq(polls.id, id));
  }
}
