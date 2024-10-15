import { createQuery } from "@tanstack/solid-query";
import { fetchCurrentUser } from "./auth.fetch";

export function getCurrentUser() {
  const state = createQuery(() => ({
    queryKey: ["auth"],
    queryFn: fetchCurrentUser,
  }));

  return state.data;
}
