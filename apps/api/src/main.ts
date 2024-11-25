import "dotenv/config";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { createApp } from "./lib/app";
import { migrateToLatest } from "./lib/migrate";
import { setupMessaging } from "./messaging";
import pollsController from "./controllers/polls.controller";
import authController from "./controllers/auth.controller";
import viewsController from "./controllers/views.controller";
import statsController from "./controllers/stats.controller";

const isProd = process.env.NODE_ENV === "production";

console.log(`

/ ___|| |__ (_) |__   __ _(_)
\___ \| '_ \| | '_ \ / _\` | |
 ___) | | | | | | | | (_| | |
|____/|_| |_|_|_| |_|\__,_|_|

* Environment: ${process.env.NODE_ENV}
* Database URL: ${process.env.DATABASE_URL}
* Redis URL: ${process.env.REDIS_URL}
* Production: ${isProd}
`);

/**
 * Migrate to the latest version of the database schema when running in production.
 */
if (process.env.NODE_ENV === "production") {
  await migrateToLatest();
}

setupMessaging();

const app = createApp();

app.use(logger());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://www:3000"],
    credentials: true,
  }),
);

app.route("/", pollsController);
app.route("/", authController);
app.route("/", viewsController);
app.route("/", statsController);

serve({
  fetch: app.fetch,
  port: 8000,
});
