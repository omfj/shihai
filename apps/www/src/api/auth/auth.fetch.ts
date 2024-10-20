import { api } from "../client";
import { User } from "./auth.types";

export async function fetchCurrentUser() {
  return await api.get("auth/me").json<User>();
}

export async function register(email: string, username: string, password: string) {
  return await api.post("auth/register", { json: { email, username, password } });
}

export async function login(username: string, password: string) {
  return await api.post("auth/login", { json: { username, password } });
}

export async function logout() {
  return await api.post("auth/logout");
}
