import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();

	if (!parentData.user) {
		throw error(401, 'Unauthorized');
	}

	return {
		user: parentData.user
	};
};
