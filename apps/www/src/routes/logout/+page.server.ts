import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { dev } from '$app/environment';

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.delete('auth_session', {
			path: '/',
			secure: !dev,
			sameSite: 'lax',
			httpOnly: true
		});

		throw redirect(301, '/');
	}
};
