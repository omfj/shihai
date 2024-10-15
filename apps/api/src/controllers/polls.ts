import { Hono } from "hono";
import { PollService } from "../services/poll-service";
import { PollInsertSchema, type PollInsert } from "../db/schemas/polls";

const app = new Hono();

app.get("/polls", async (c) => {
  const polls = await PollService.findAll();

  return c.json(polls);
});

app.post("/poll", async (c) => {
  const json = await c.req.json<PollInsert>();
  const { success, data: poll } = PollInsertSchema.safeParse(json);

  if (!success) {
    return c.json(
      { error: "Invalid poll data" },
      {
        status: 400,
      },
    );
  }

  const id = await PollService.create(poll);

  return c.text("OK");
});

app.get("/poll/:id", async (c) => {
  const id = c.req.param("id");

  const poll = await PollService.find(id);

  return c.json(poll);
});

export default app;
