import { createApp } from "@/lib/app";
import { compare } from "@/lib/crypto";
import { LoginSchema, RegisterSchema } from "@/lib/validators";
import { admin } from "@/middleware/admin";
import { auth } from "@/middleware/auth";
import { SessionService } from "@/services/session.service";
import { UserService } from "@/services/user.service";

const app = createApp();

app.get("/auth/me", auth(), (c) => {
  const user = c.var.auth.user;

  return c.json(user);
});

app.post("/auth/login", async (c) => {
  const { success, data } = await c.req.json().then(LoginSchema.safeParse);

  if (!success) {
    return c.json({ error: "Invalid login data" }, { status: 400 });
  }

  const user = await UserService.findByUsernameWithPassword(data.username);

  if (!user || !user.password) {
    return c.json({ error: "User not found" }, { status: 404 });
  }

  const isCorrectPassword = await compare(data.password, user.password.hashedPassword);

  if (!isCorrectPassword) {
    return c.json({ error: "Invalid password" }, { status: 401 });
  }

  const session = await SessionService.create(user.id);
  SessionService.setCookie(c, session);

  return c.json({
    success: true,
  });
});

app.post("/auth/register", async (c) => {
  const { success: jsonSuccess, data: jsonData } = await c.req
    .json()
    .then(RegisterSchema.safeParse);

  if (!jsonSuccess) {
    return c.json({ error: "Invalid register data" }, { status: 400 });
  }

  const { email, username, password } = jsonData;

  const {
    success: registerSuccess,
    error: registerError,
    data: registerData,
  } = await UserService.register(email, username, password);

  if (!registerSuccess) {
    return c.json({ error: registerError }, { status: 400 });
  }

  const session = await SessionService.create(registerData.id);
  SessionService.setCookie(c, session);

  return c.json({
    success: true,
  });
});

app.post("/auth/session", admin(), async (c) => {
  const json = await c.req.json<{ sessionId: string }>();

  const user = await SessionService.findUserBySessionId(json.sessionId);

  if (!user) {
    return c.json(null, 404);
  }

  return c.json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

app.post("/auth/logout", auth(), async (c) => {
  const sessionId = c.var.auth.sessionId;

  await SessionService.delete(sessionId);
  SessionService.deleteCookie(c);

  return c.text("OK");
});

export default app;
