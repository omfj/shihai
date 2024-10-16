import { createApp } from "@/lib/app";

const app = createApp();

app.get("/auth/me", (c) => {
  return c.text("Not implemented");
});

app.get("/auth/github", (c) => {
  return c.text("Not implemented");
});

app.get("/auth/github/callback", (c) => {
  return c.text("Not implemented");
});

app.get("/auth/logout", (c) => {
  return c.text("Not implemented");
});

export default app;
