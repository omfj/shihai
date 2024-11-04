import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { sql } from "drizzle-orm";
import { afterAll, afterEach, beforeEach, vi } from "vitest";
import * as schema from "./src/db/schemas";
import { db, client } from "./src/db/drizzle";
import { applyMigrations } from "./src/db/migrate";

vi.mock("./src/db/drizzle", () => {
  const client = new PGlite();
  const db = drizzle(client, { schema });

  return {
    db,
    client,
  };
});

beforeEach(async () => {
  await applyMigrations();
});

afterEach(async () => {
  await db.execute(sql`drop schema if exists public cascade`);
  await db.execute(sql`create schema public`);
  await db.execute(sql`drop schema if exists drizzle cascade`);
});

afterAll(async () => {
  (client as unknown as PGlite).close();
});
