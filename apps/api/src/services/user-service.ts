import { db } from "@/db/drizzle";

export class UserService {
  static async findByUsername(username: string) {
    return await db.query.users.findFirst({
      where: (row, { eq }) => eq(row.username, username),
    });
  }
}
