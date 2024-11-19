import { CacheFactory } from "@/factories/cache.factory";

export const pollsCache = new CacheFactory<
  Array<{
    id: string;
    question: string;
    createdAt: Date;
    expiresAt: Date | null;
    votes: number;
  }>
>({
  prefix: "polls",
});
