import { injectApi } from "../client";

export const getUserCount = injectApi((api) => async () => {
  return await api
    .get("stats/users")
    .json<{ count: number }>()
    .then((res) => res.count);
});

export const getVotesCount = injectApi((api) => async () => {
  return await api
    .get("stats/votes")
    .json<{ count: number }>()
    .then((res) => res.count);
});

export const getPollsCount = injectApi((api) => async () => {
  return await api
    .get("stats/polls")
    .json<{ count: number }>()
    .then((res) => res.count);
});
