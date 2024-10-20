import { z } from "zod";
import { VoteOptionInsertSchema } from "../db/schemas";

export const CreatePollSchema = z.object({
  question: z.string().min(2),
  options: VoteOptionInsertSchema.pick({
    caption: true,
    order: true,
  }).array(),
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
