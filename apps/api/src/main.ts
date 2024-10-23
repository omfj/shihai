import "dotenv/config";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { createApp } from "./lib/app";

import pollsController from "./controllers/polls.controller";
import authController from "./controllers/auth.controller";

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

const PORT = 8000;

serve({
  fetch: app.fetch,
  port: PORT,
});
