import { getPollById } from '$lib/api/polls/polls.fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getViews, incrementViews } from '$lib/api/views/views.fetch';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends(`poll:${params.id}`);

	const [poll, views] = await Promise.all([getPollById(params.id), getViews(params.id)]);

	if (!poll) {
		throw error(404, 'Poll not found');
	}

	incrementViews(params.id);

	return {
		poll,
		views
	};
};
