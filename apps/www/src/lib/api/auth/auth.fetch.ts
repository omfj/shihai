import { api } from '../client';
import type { LoginInput, RegisterInput, User } from './auth.types';

export const getMe = async () => {
	return await api.get('auth/me').json<User>();
};

export const register = async (input: RegisterInput) => {
	return await api.post('auth/register', { json: input });
};

export const login = async (input: LoginInput) => {
	return await api.post('auth/login', { json: input });
};
