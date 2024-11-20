import { createMiddleware } from "hono/factory";
import type { Bindings, Variables } from "@/lib/app";
import { SessionService } from "@/services/session.service";
import type { User } from "@/storage/db/schemas/mod";

export const auth = () => {
  return createMiddleware<{
    Bindings: Bindings;
    Variables: Variables & {
      auth: {
        user: User;
        sessionId: string;
      };
    };
  }>(async (c, next) => {
    const sessionId = SessionService.getCookie(c);

    if (!sessionId) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await SessionService.findUserBySessionId(sessionId);

    if (!user) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    c.set("auth", {
      sessionId,
      user,
    });

    return await next();
  });
};
