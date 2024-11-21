import { api } from '../client';
import type { LoginInput, RegisterInput, User } from './auth.types';

export const getMe = async () => {
	const response = await api.get('auth/me');

	if (!response.ok) {
		return null;
	}

	return response.json<User>();
};

export const register = async (input: RegisterInput) => {
	return await api.post('auth/register', { json: input });
};

export const login = async (input: LoginInput) => {
	return await api.post('auth/login', { json: input });
};

export const logout = async () => {
	return await api.post('auth/logout');
};
