import { createMiddleware } from "hono/factory";
import type { Bindings, Variables } from "@/lib/app";
import { SessionService } from "@/services/session.service";
import type { Session, User } from "@/storage/db/schemas/mod";

export const auth = () => {
  return createMiddleware<{
    Bindings: Bindings;
    Variables: Variables & {
      auth: {
        user: User;
        session: Session;
      };
    };
  }>(async (c, next) => {
    const sessionId = SessionService.getCookie(c);

    if (!sessionId) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { session, user } = await SessionService.find(sessionId);

    if (!user || !session) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    c.set("auth", {
      session,
      user,
    });

    return await next();
  });
};
