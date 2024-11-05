import { z } from "zod";
import { VoteOptionInsertSchema } from "../storage/db/schemas";

export const CreatePollSchema = z.object({
  question: z.string().min(2),
  expiresAt: z.coerce.date().nullable(),
  options: z.string().array().min(2),
});

export const LoginSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(2),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2),
  password: z.string().min(2),
});
