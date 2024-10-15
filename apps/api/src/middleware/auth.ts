import { createMiddleware } from "hono/factory";
import type { Bindings, Variables } from "../lib/app";
import type { UserWithoutPassword } from "../db/schemas";
import { db } from "../db/drizzle";

export const auth = () => {
  return createMiddleware<{
    Bindings: Bindings;
    Variables: Variables & {
      user: UserWithoutPassword;
    };
  }>(async (c, next) => {
    const userId = "1";

    const user = await db.query.users.findFirst({
      where: (row, { eq }) => eq(row.id, userId),
    });

    if (!user) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    c.set("user", user);

    return await next();
  });
};
