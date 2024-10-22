import { getSessionUser } from '$lib/api/auth/auth.fetch.server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('auth_session');

	if (sessionId) {
		const user = await getSessionUser(sessionId);
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
