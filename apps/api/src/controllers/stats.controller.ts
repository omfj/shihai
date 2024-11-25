import { createApp } from "@/lib/app";
import { db } from "@/storage/db/drizzle";
import { users, votes, polls } from "@/storage/db/schemas/mod";
import { count } from "drizzle-orm";

const app = createApp();

app.get("/stats/users", async (c) => {
  const userCount = await db
    .select({ userCount: count() })
    .from(users)
    .then((res) => res[0].userCount ?? 0);

  return c.json({ count: userCount });
});

app.get("/stats/votes", async (c) => {
  const voteCount = await db
    .select({ voteCount: count() })
    .from(votes)
    .then((res) => res[0].voteCount ?? 0);

  return c.json({ count: voteCount });
});

app.get("/stats/polls", async (c) => {
  const pollCount = await db
    .select({ pollCount: count() })
    .from(polls)
    .then((res) => res[0].pollCount ?? 0);

  return c.json({ count: pollCount });
});

export default app;
