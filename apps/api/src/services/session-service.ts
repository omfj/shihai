import { db } from "@/db/drizzle";
import { sessions, users, type Session } from "@/db/schemas";
import type { AnyAppContext } from "@/lib/app";
import { eq } from "drizzle-orm";
import { setCookie, deleteCookie } from "hono/cookie";

export const SESSION_COOKIE_NAME = "auth_session";

export class SessionService {
  static async create(userId: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const session = await db
      .insert(sessions)
      .values({
        userId,
        expiresAt,
      })
      .returning()
      .then((rows) => rows[0]);

    return session;
  }

  static async find(id: string) {
    const { user, session } = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, id))
      .leftJoin(users, eq(sessions.userId, users.id))
      .then((rows) => rows[0]);

    if (!session || !user) {
      return {
        session: null,
        user: null,
      };
    }

    return {
      session,
      user,
    };
  }

  static async delete(id: string) {
    await db.delete(sessions).where(eq(sessions.id, id));
  }

  static setCookie(c: AnyAppContext, session: Session) {
    setCookie(c, SESSION_COOKIE_NAME, session.id, {
      expires: session.expiresAt,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  static deleteCookie(c: AnyAppContext) {
    deleteCookie(c, SESSION_COOKIE_NAME);
  }
}
