import { api_server } from '../client.server';
import type { User } from './auth.types';

export const getSessionUser = async (sessionId: string) => {
	return await api_server
		.post('auth/session', {
			json: {
				sessionId
			}
		})
		.json<User>()
		.catch(() => null);
};
