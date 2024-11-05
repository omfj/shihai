import { migrate } from "drizzle-orm/pglite/migrator";

import { db } from "./drizzle";

export async function applyMigrations() {
  await migrate(db, { migrationsFolder: "./migrations" });
}
