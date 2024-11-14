import { env } from '$env/dynamic/public';
import ky from 'ky';

export const api = ky.create({
	prefixUrl: env.PUBLIC_API_URL,
	throwHttpErrors: false,
	credentials: 'include'
});
