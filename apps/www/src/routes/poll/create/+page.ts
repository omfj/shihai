import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();
	if (!parentData.user) {
		throw redirect(302, '/login');
	}

	return {};
};
