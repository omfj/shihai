import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { shihai } from '$lib/shihai';

export const load: PageLoad = async ({ params, depends }) => {
	depends(`poll:${params.id}`);

	const [poll, views] = await Promise.all([
		shihai.polls.get.byId(params.id),
		shihai.views.get(params.id)
	]);

	if (!poll) {
		throw error(404, 'Poll not found');
	}

	shihai.views.increment(params.id);

	return {
		poll,
		views
	};
};
