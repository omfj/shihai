import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { sql } from "drizzle-orm";
import { afterAll, afterEach, beforeEach, vi } from "vitest";
import * as schema from "@/db/schemas";
import { db, client } from "@/db/drizzle";
import { applyMigrations } from "@/db/migrate";

vi.mock("@/db/drizzle", async () => {
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
