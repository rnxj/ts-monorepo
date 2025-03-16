import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    AUTH_SECRET:
      process.env.NODE_ENV === "production" ? z.string().min(1) : z.string().min(1).optional(),
    NODE_ENV: z.enum(["development", "production"]).optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
