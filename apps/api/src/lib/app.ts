import { ip } from "@/middleware/ip";
import { Hono, type Context } from "hono";

export type Bindings = {};

export type Variables = {
  ip: string;
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};

export type AppContext = Context<AppEnv>;

export type AnyAppContext = Context<any, any, {}>;

export function createApp() {
  const app = new Hono<AppEnv>();

  app.use(ip());

  return app;
}
