import { redis } from "@/storage/kv/redis";

export class ViewsService {
  static async add(id: string, ip: string) {
    await redis.sAdd(`views:${id}`, ip);
  }

  static async get(id: string) {
    return await redis.sCard(`views:${id}`);
  }
}
