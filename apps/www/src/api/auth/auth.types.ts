export type User = {
  id: string;
  email: string;
  username: string;
};

export type LoginUserMutationInput = {
  username: string;
  password: string;
};

export type RegisterUserMutationInput = {
  email: string;
  username: string;
  password: string;
};
