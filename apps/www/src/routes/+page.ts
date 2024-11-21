import { getPolls } from '$lib/api/polls/polls.fetch';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const polls = await getPolls();

	return {
		polls
	};
};
