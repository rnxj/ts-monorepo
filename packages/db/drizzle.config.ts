import { env } from "@repo/env/db";
import type { Config } from "drizzle-kit";

const nonPoolingUrl = env.DATABASE_URL.replace(":6543", ":5432");

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  casing: "snake_case",
  out: "./drizzle",
  strict: true,
  verbose: true,
} satisfies Config;
