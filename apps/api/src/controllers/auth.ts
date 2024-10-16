import { createApp } from "@/lib/app";
import { LoginSchema } from "@/lib/validators";
import { auth } from "@/middleware/auth";
import { HashService } from "@/services/hash-service";
import { SessionService } from "@/services/session-service";
import { UserService } from "@/services/user-service";

const app = createApp();

app.get("/auth/me", auth(), (c) => {
  const user = c.var.auth.user;

  return c.json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

app.get("/auth/login", async (c) => {
  const { success, data } = await c.req.json().then((json) => LoginSchema.safeParse(json));

  if (!success) {
    return c.json({ error: "Invalid login data" }, { status: 400 });
  }

  const user = await UserService.findByUsername(data.username);

  if (!user) {
    return c.json({ error: "User not found" }, { status: 404 });
  }

  const isCorrectPassword = await HashService.compare(data.password, user.password);

  if (!isCorrectPassword) {
    return c.json({ error: "Invalid password" }, { status: 401 });
  }

  const session = await SessionService.create(user.id);
  SessionService.setCookie(c, session);

  return c.json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

app.get("/auth/logout", auth(), async (c) => {
  const sessionId = c.var.auth.session.id;

  await SessionService.delete(sessionId);
  SessionService.deleteCookie(c);

  return c.text("OK");
});

export default app;
