import ky from 'ky';

export const api = ky.create({
	prefixUrl: 'http://localhost:8000',
	throwHttpErrors: false,
	credentials: 'include'
});
