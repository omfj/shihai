import { redis } from "@/storage/kv/redis";

/**
 * Serialize and deserialize functions are not needed for string values
 */
type CacheFactoryOptions<T> = {
  prefix: string;
  ttl?: number;
} & (T extends string
  ? {
      serializer?: never;
      deserializer?: never;
    }
  : {
      serializer?: (value: T) => string;
      deserializer?: (value: string) => T;
    });

const defaultSerializer = <T>(value: T) => {
  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value);
};
const defaultDeserializer = <T>(value: string) => {
  return JSON.parse(value) as T;
};

export class CacheFactory<T> {
  #prefix: string;
  #ttl?: number;
  #serializer = defaultSerializer;
  #deserializer = defaultDeserializer;

  constructor(options: CacheFactoryOptions<T>) {
    this.#prefix = options.prefix;

    if (options.ttl) {
      this.#ttl = options.ttl;
    }
  }

  async get(key: string) {
    const value = await redis.get(`${this.#prefix}:${key}`);

    if (!value) {
      return null;
    }

    return this.#deserializer<T>(value);
  }

  async set(key: string, value: T) {
    const serializedValue = this.#serializer(value);

    if (this.#ttl) {
      await redis.setEx(`${this.#prefix}:${key}`, this.#ttl, serializedValue);
    } else {
      await redis.set(`${this.#prefix}:${key}`, serializedValue);
    }
  }

  async delete(key: string) {
    await redis.del(`${this.#prefix}:${key}`);
  }
}
