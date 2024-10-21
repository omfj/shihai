import { createMutation, createQuery } from "@tanstack/solid-query";
import { fetchPoll, fetchPolls, mutatePollVote } from "./poll.fetch";

export function createPollsQuery() {
  return createQuery(() => ({
    queryKey: ["polls"],
    queryFn: fetchPolls,
  }));
}

export function createPollQuery(id: string) {
  return createQuery(() => ({
    queryKey: ["poll", id],
    queryFn: () => fetchPoll(id),
    throwOnError: true,
  }));
}

export function createVoteMutation() {
  return createMutation(() => ({
    mutationFn: async (input: { pollId: string; optionId: string }) => {
      return await mutatePollVote(input.pollId, input.optionId);
    },
  }));
}
