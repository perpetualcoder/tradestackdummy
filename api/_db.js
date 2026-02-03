import pg from "pg";

const { Pool } = pg;

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://neondb_owner:npg_UPB5tzvIWx3c@ep-lucky-mouse-aip2n7am-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl });
  }
  return pool;
}
