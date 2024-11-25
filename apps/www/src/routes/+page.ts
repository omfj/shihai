import { shihai } from '$lib/shihai';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const [polls, usersCount, votesCount, pollsCount] = await Promise.all([
		shihai.polls.get.all(),
		shihai.stats.users.count(),
		shihai.stats.votes.count(),
		shihai.stats.polls.count()
	]);

	return {
		polls,
		usersCount,
		votesCount,
		pollsCount
	};
};
