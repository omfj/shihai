import { createMiddleware } from "hono/factory";
import { getConnInfo } from "@hono/node-server/conninfo";

export const ip = () => {
  return createMiddleware<{
    Variables: {
      ip: string;
    };
  }>(async (c, next) => {
    const connInfo = getConnInfo(c);

    c.set("ip", connInfo.remote.address ?? "127.0.0.1");

    return await next();
  });
};
