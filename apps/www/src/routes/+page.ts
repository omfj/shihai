import { shihai } from '$lib/shihai';
import type { PageLoad } from './$types';
import { isFuture } from 'date-fns';

export const load: PageLoad = async () => {
	const [polls, usersCount, votesCount, pollsCount] = await Promise.all([
		shihai.polls.get
			.all()
			.then((polls) => polls.filter((poll) => !poll.expiresAt || isFuture(poll.expiresAt))),
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
