import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Environment variables error", _env.error.format());
  throw new Error("Environment variables error");
}

export const env = _env.data;
