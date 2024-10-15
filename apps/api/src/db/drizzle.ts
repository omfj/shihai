import { drizzle } from "drizzle-orm/postgres-js";
import pg from "pg";
import * as schema from "./schemas";

const { Pool } = pg;

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client, {
  schema,
});
