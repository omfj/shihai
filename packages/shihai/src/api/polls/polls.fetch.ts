import type {
  CreatePollInput,
  CreatePollResult,
  Poll,
  SimplePoll,
  UpdatePollInput,
  VotePollInput,
} from "./polls.types";
import { injectApi } from "../client";
import type { SuccessOrError } from "../common.types";

export const getPolls = injectApi((api) => async () => {
  return await api.get("polls").json<Array<SimplePoll>>();
});

export const createPoll = injectApi((api) => async (poll: CreatePollInput) => {
  return await api.post("poll", { json: poll }).json<CreatePollResult>();
});

export const getPollById = injectApi((api) => async (pollId: string) => {
  return await api.get(`poll/${pollId}`).json<Poll | null>();
});

export const votePoll = injectApi(
  (api) =>
    async ({ pollId, voteOptionId }: VotePollInput) => {
      return await api.post(`poll/${pollId}/vote/${voteOptionId}`).text();
    }
);

export const updatePoll = injectApi(
  (api) =>
    async ({ id, poll }: UpdatePollInput) => {
      return await api
        .put(`poll/${id}`, { json: poll })
        .json<CreatePollResult>();
    }
);

export const deletePoll = injectApi((api) => async (pollId: string) => {
  return await api.delete(`poll/${pollId}`).json<SuccessOrError>();
});
