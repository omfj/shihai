import { db } from "@/storage/db/drizzle";
import { passwords, users, type User } from "@/storage/db/schemas";
import { HashService } from "./hash.service";
import { nanoid } from "nanoid";

export class UserService {
  static async findByUsernameWithPassword(username: string) {
    return await db.query.users.findFirst({
      where: (row, { eq }) => eq(row.username, username),
      with: {
        password: true,
      },
    });
  }

  static async findByUsernameOrEmail(username: string, email: string) {
    return await db.query.users.findFirst({
      where: (row, { or, eq }) => or(eq(row.username, username), eq(row.email, email)),
    });
  }

  static async register(
    email: string,
    username: string,
    password: string,
  ): Promise<
    | {
        success: false;
        error: string;
        data?: undefined;
      }
    | {
        success: true;
        error?: undefined;
        data: User;
      }
  > {
    const existingUser = await this.findByUsernameOrEmail(username, email);

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const userId = nanoid();
    const hashedPassword = await HashService.hash(password);

    const user = await db.transaction(async (tx) => {
      const user = await db
        .insert(users)
        .values({
          id: userId,
          email,
          username,
        })
        .returning()
        .then((rows) => rows[0] ?? null);

      if (!user) {
        tx.rollback();
        return null;
      }

      await db.insert(passwords).values({
        hashedPassword,
        userId,
      });

      return user;
    });

    if (!user) {
      return { success: false, error: "Failed to create user" };
    }

    return { success: true, data: user };
  }
}
