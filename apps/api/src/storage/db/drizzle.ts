import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schemas/mod";

const { Pool } = pg;

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client, {
  schema,
});
