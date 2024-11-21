import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';
import { shihai } from '$lib/shihai';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const user = await shihai.auth.get.me();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	return { queryClient, user };
};
