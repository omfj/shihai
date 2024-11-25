import { createMiddleware } from "hono/factory";
import type { Bindings, Variables } from "@/lib/app";
import { SessionService } from "@/services/session.service";
import type { User } from "@/storage/db/schemas/mod";

type AdminUser = User & {
  role: "admin";
};

export const auth = () => {
  return createMiddleware<{
    Bindings: Bindings;
    Variables: Variables & {
      auth: {
        user: AdminUser;
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

    if (user.role !== "admin") {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    c.set("auth", {
      sessionId,
      user: user as AdminUser,
    });

    return await next();
  });
};
