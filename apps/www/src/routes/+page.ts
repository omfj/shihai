import { shihai } from '$lib/shihai';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const polls = await shihai.polls.get.all();

	return {
		polls
	};
};
