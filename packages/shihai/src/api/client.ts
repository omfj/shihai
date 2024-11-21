import ky from "ky";

export type ApiClient = ReturnType<typeof createApi>;

export const createApi = (url: string) => {
  return ky.create({
    prefixUrl: url,
    throwHttpErrors: false,
    credentials: "include",
  });
};

export const injectApi =
  <R, T = void>(
    fn: (api: ApiClient) => (args: T) => Promise<R>
  ): ((api: ApiClient) => (args: T extends void ? void : T) => Promise<R>) =>
  (api: ApiClient) =>
  (args: T extends void ? void : T) =>
    fn(api)(args as T);
