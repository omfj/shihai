import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

const url = process.env.DATABASE_URL!;

export const pg = postgres(url);

export const db = drizzle(pg, {
  schema,
});
