import { Poll, SimplePoll } from "./poll.types";
import { api } from "../client";

export async function fetchPolls() {
  return await api.get("polls").json<Array<SimplePoll>>();
}

export async function fetchPoll(id: string) {
  return await api.get(`poll/${id}`).json<Poll | null>();
}

export async function mutatePollVote(pollId: string, optionId: string) {
  return await api.post(`poll/${pollId}/vote/${optionId}`);
}
