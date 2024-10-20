import { db } from "@/db/drizzle";
import { users, type User } from "@/db/schemas";
import { HashService } from "./hash.service";

export class UserService {
  static async findByUsername(username: string) {
    return await db.query.users.findFirst({
      where: (row, { eq }) => eq(row.username, username),
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

    const hashedPassword = await HashService.hash(password);

    const user = await db
      .insert(users)
      .values({
        email,
        username,
        password: hashedPassword,
      })
      .returning()
      .then((rows) => rows[0] ?? null);

    if (!user) {
      return { success: false, error: "Failed to create user" };
    }

    return { success: true, data: user };
  }
}
