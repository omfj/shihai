import "dotenv/config";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { createApp } from "./lib/app";

import pollsController from "./controllers/polls";

const app = createApp();

app.use(logger());
app.use(cors());

app.route("/", pollsController);

const PORT = 8000;

serve({
  fetch: app.fetch,
  port: PORT,
});
