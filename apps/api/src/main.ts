import "dotenv/config";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { createApp } from "./lib/app";

import pollsController from "./controllers/polls.controller";
import authController from "./controllers/auth.controller";
import viewsController from "./controllers/views.controller";
import { migrateToLatest } from "./lib/migrate";

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
  await migrateToLatest();
}

const app = createApp();

app.use(logger());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
);

app.route("/", pollsController);
app.route("/", authController);
app.route("/", viewsController);

const PORT = 8000;

serve({
  fetch: app.fetch,
  port: PORT,
});
