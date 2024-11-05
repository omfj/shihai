import { redis } from "@/storage/kv/redis";

export class ViewsService {
  static async increment(id: string) {
    await redis.incr(`views:${id}`);
  }

  static async get(id: string) {
    const views = await redis.get(`views:${id}`);
    return views ? parseInt(views) : 0;
  }
}
