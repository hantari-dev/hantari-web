import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

/** Returns the database client, or null when DATABASE_URL isn't configured (e.g. local dev without Neon). */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!cached) cached = drizzle(neon(url), { schema });
  return cached;
}
