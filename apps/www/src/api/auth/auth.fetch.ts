import { api } from "../client";
import { User } from "./auth.types";

export async function fetchCurrentUser() {
  return await api.get("auth/me").json<User>();
}
