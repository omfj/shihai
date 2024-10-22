import { createMiddleware } from "hono/factory";

export const admin = () => {
  return createMiddleware(async (c, next) => {
    const bearerToken = c.req.header("Authorization");

    if (bearerToken !== `Bearer ${process.env.API_KEY}`) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    return await next();
  });
};
