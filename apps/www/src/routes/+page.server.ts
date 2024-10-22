import { getPolls } from '$lib/api/polls/polls.fetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const polls = await getPolls();

	return {
		polls
	};
};
