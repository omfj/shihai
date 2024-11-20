import { db } from "@/storage/db/drizzle";
import type { AnyAppContext } from "@/lib/app";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { nanoid } from "nanoid";
import { redis } from "@/storage/kv/redis";

export const SESSION_COOKIE_NAME = "auth_session";

type Session = {
  sessionId: string;
  ttl: number;
  userId: string;
};

export class SessionService {
  static async create(userId: string) {
    const sessionId = nanoid();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);

    await redis.setEx(`session:${sessionId}`, ttl, userId);

    return {
      sessionId,
      ttl,
      userId,
    };
  }

  static async findUserBySessionId(id: string) {
    const userId = await redis.get(`session:${id}`);

    if (!userId) {
      return null;
    }

    const user = await db.query.users.findFirst({
      where: (row, { eq }) => eq(row.id, userId),
    });

    if (!user) {
      return null;
    }

    return user;
  }

  static async delete(id: string) {
    await redis.del(`session:${id}`);
  }

  static getCookie(c: AnyAppContext) {
    return getCookie(c, SESSION_COOKIE_NAME);
  }

  static setCookie(c: AnyAppContext, session: Session) {
    setCookie(c, SESSION_COOKIE_NAME, session.sessionId, {
      expires: new Date(Date.now() + session.ttl * 1000),
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
