import { db } from "@/storage/db/drizzle";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const migrateToLatest = async () => {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: `${process.cwd()}/apps/api/migrations` });
};
