import { Hono, type Context } from "hono";
import type { UserWithoutPassword } from "../db/schemas";

export type Bindings = {};

export type Variables = {
  user: UserWithoutPassword | null;
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};

export type AppContext = Context<AppEnv>;

export const createApp = () => {
  return new Hono<AppEnv>();
};
