import { API_KEY } from '$env/static/private';
import ky from 'ky';

export const api_server = ky.create({
	prefixUrl: 'http://localhost:8000',
	credentials: 'include',
	headers: {
		Authorization: `Bearer ${API_KEY}`
	}
});
