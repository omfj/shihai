import type { User, Session } from "@/storage/db/schemas/mod";
import { Hono, type Context } from "hono";

export type Bindings = {};

export type Variables = {
  auth:
    | {
        user: User;
        session: Session;
      }
    | {
        user: null;
        session: null;
      };
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};

export type AppContext = Context<AppEnv>;

export type AnyAppContext = Context<any, any, {}>;

export function createApp() {
  return new Hono<AppEnv>();
}
