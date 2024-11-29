import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { shihai } from '$lib/shihai';

export const load: PageLoad = async ({ params, depends, parent }) => {
	depends(`poll:${params.id}`);

	const parentData = await parent();
	const poll = await shihai.polls.get.byId(params.id);

	if (!poll) {
		throw error(404, 'Poll not found');
	}

	if (poll.userId !== parentData.user?.id) {
		throw redirect(307, '/polls');
	}

	return {
		poll
	};
};
