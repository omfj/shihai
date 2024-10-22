import { api } from '../client';
import type { CreatePollInput, Poll, SimplePoll } from './polls.types';

export const getPolls = async () => {
	return await api.get('polls').json<Array<SimplePoll>>();
};

export const createPoll = async (poll: CreatePollInput) => {
	return await api.post('poll', { json: poll }).json<SimplePoll>();
};

export const getPollById = async (pollId: string) => {
	return await api.get(`poll/${pollId}`).json<Poll | null>();
};
