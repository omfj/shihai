import { api } from '../client';
import type {
	CreatePollInput,
	CreatePollResult,
	Poll,
	SimplePoll,
	VotePollInput
} from './polls.types';

export const getPolls = async () => {
	return await api.get('polls').json<Array<SimplePoll>>();
};

export const createPoll = async (poll: CreatePollInput) => {
	return await api.post('poll', { json: poll }).json<CreatePollResult>();
};

export const getPollById = async (pollId: string) => {
	return await api.get(`poll/${pollId}`).json<Poll | null>();
};

export const votePoll = async ({ pollId, voteOptionId }: VotePollInput) => {
	return await api.post(`poll/${pollId}/vote/${voteOptionId}`).text();
};
