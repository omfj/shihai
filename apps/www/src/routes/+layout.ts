import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';
import { getMe } from '$lib/api/auth/auth.fetch';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const user = await getMe();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return { queryClient, user };
};
