import type { User } from '$lib/api/auth/auth.types';
import { getContext, setContext } from 'svelte';

export type AuthContext = {
	user: User | null;
};

export const AUTH_CTX = 'auth_ctx';

export const setAuthContext = (ctx: AuthContext) => {
	setContext(AUTH_CTX, ctx);
};

export const getAuthContext = () => {
	return getContext<AuthContext>(AUTH_CTX);
};
