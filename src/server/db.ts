import * as schema from "@/db/schema";
import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const createDrizzleClient = () => {
  // use neon for production
  if (env.NODE_ENV === "production") {
    const sql = neon(env.DATABASE_URL);
    return drizzle(sql, { schema });
  }

  const pool = new Pool({
    connectionString: env.DATABASE_URL,
  });

  return drizzlePg(pool, { schema, logger: env.NODE_ENV === "development" });
};

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined;
};

export const db = globalForDb.db ?? createDrizzleClient();

if (env.NODE_ENV !== "production") globalForDb.db = db;
