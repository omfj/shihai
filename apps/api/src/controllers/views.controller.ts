import { createApp } from "@/lib/app";
import { publishIncrementViews } from "@/messaging";
import { ViewsService } from "@/services/views.service";

const app = createApp();

app.get("/views/:id", async (c) => {
  const { id } = c.req.param();
  const views = await ViewsService.get(id);

  return c.json({ views });
});

app.post("/views/:id", async (c) => {
  const { id } = c.req.param();
  const { ip } = c.var;

  publishIncrementViews(id, ip);

  return c.json({ success: true });
});

export default app;
