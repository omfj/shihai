import { createMutation, createQuery, useQueryClient } from "@tanstack/solid-query";
import { fetchCurrentUser, login, logout, register } from "./auth.fetch";
import { RegisterUserMutationInput, LoginUserMutationInput } from "./auth.types";

export function getCurrentUser() {
  const state = createQuery(() => ({
    queryKey: ["auth"],
    queryFn: fetchCurrentUser,
  }));

  return () => state.data;
}

export function createRegisterMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: ({ email, username, password }: RegisterUserMutationInput) =>
      register(email, username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  }));
}

export function createLoginMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: ({ username, password }: LoginUserMutationInput) => login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  }));
}

export function createLogoutMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  }));
}
