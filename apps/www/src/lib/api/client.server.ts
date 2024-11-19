import { env } from '$env/dynamic/private';
import ky from 'ky';

export const api_server = ky.create({
	prefixUrl: env.INTERNAL_API_URL,
	credentials: 'include',
	headers: {
		Authorization: `Bearer ${env.API_KEY}`
	}
});
