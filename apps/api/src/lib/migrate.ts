import { db } from "@/storage/db/drizzle";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import process from "node:process";

export const migrateToLatest = async () => {
  console.log("Migrating database...");

  await migrate(db, { migrationsFolder: `${process.cwd()}/../../migrations` });
};
