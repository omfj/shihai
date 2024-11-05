import { createClient } from "redis";

export const redis = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
});
redis.connect();
