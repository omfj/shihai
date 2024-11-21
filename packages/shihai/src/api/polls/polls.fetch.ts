import type {
  CreatePollInput,
  CreatePollResult,
  Poll,
  SimplePoll,
  VotePollInput,
} from "./polls.types";
import { injectApi } from "../client";

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
