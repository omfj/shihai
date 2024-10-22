CREATE TABLE IF NOT EXISTS "password" (
	"user_id" text PRIMARY KEY NOT NULL,
	"hashed_password" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "password";