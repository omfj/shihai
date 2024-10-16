DROP INDEX IF EXISTS "github_id_idx";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_unique" ON "user" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_unique" ON "user" USING btree ("email");--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "github_id";