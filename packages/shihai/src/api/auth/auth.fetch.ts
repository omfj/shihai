import { injectApi } from "../client";
import type { LoginInput, RegisterInput, User } from "./auth.types";

export const getMe = injectApi((api) => async () => {
  const response = await api.get("auth/me");

  if (!response.ok) {
    return null;
  }

  return response.json<User>();
});

export const register = injectApi((api) => async (input: RegisterInput) => {
  return await api.post("auth/register", { json: input });
});

export const login = injectApi((api) => async (input: LoginInput) => {
  return await api.post("auth/login", { json: input });
});

export const logout = injectApi((api) => async () => {
  return await api.post("auth/logout");
});
