import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);

export type Role = (typeof roleEnum.enumValues)[number];
