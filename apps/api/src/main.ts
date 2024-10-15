import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import pollsController from "./controllers/polls";

const app = new Hono();

app.use(logger());
app.use(cors());

app.route("/", pollsController);

const PORT = 8000;

serve({
  fetch: app.fetch,
  port: PORT,
});
