export type User = {
	id: string;
	username: string;
	email: string;
};

export type RegisterInput = {
	username: string;
	email: string;
	password: string;
};

export type LoginInput = {
	username: string;
	password: string;
};
