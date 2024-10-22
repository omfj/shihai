import { api } from '../client';
import type { RegisterInput, User } from './auth.types';

export const getMe = async () => {
	return await api.get('auth/me').json<User>();
};

export const registerUser = async (input: RegisterInput) => {
	return await api.post('auth/register', { json: input });
};
