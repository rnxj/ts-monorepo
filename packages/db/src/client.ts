import { env } from "@repo/env/db";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const db = drizzle({
  client: postgres(env.DATABASE_URL),
  schema,
  casing: "snake_case",
});
