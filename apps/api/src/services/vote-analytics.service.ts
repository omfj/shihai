import { redis } from "@/storage/kv/redis";

export const PREFIX = "votes";

export class VoteAnalyticsService {
  static async increment(pollId: string) {
    await redis.incr(`${PREFIX}:${pollId}`);
  }

  static async decrement(pollId: string) {
    await redis.decr(`${PREFIX}:${pollId}`);
  }
}
