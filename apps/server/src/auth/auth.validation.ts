import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});
export const signinSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8).max(128),
});
export const refreshSchema = z.object({ refreshToken: z.string().min(10) });
