import { getPollById } from '$lib/api/polls/polls.fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const poll = await getPollById(params.id);

	if (!poll) {
		throw error(404, 'Poll not found');
	}

	return {
		poll
	};
};
