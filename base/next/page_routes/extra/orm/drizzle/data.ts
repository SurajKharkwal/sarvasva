type DATABASE = "mysql" | "postgres" | "sqlite";

export const drizzleConfig = (db: DATABASE) => `
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "${db}",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
`;

// db.ts template based on database type
export const db = (db: DATABASE) => {
  switch (db) {
    case "postgres":
      return `
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { conn: postgres.Sql | undefined };
const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
`;
    case "mysql":
      return `
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { conn: mysql.Connection | undefined };
const conn = globalForDb.conn ?? await mysql.createConnection(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
`;
    case "sqlite":
      return `
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { conn: Database.Database | undefined };
const conn = globalForDb.conn ?? new Database(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
`;
  }
};

// Example API route
export const route = `
import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { users } from "@/server/db/schema"; // example table

export async function GET() {
  const data = await db.select().from(users);
  return NextResponse.json(data);
}
`;

export const schemea = (db: DATABASE) => {
  switch (db) {
    case "postgres":
      return `
// Drizzle ORM schema for PostgreSQL
import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => \`drizzle_\${name}\`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d.timestamp({ withTimezone: true })
      .default(sql\`CURRENT_TIMESTAMP\`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);
`;

    case "mysql":
      return `
// Drizzle ORM schema for MySQL
import { sql } from "drizzle-orm";
import { index, mysqlTableCreator } from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => \`drizzle_\${name}\`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.int().primaryKey().autoincrement(),
    name: d.varchar({ length: 256 }),
    createdAt: d.timestamp().default(sql\`CURRENT_TIMESTAMP\`).notNull(),
    updatedAt: d.timestamp().onUpdateNow(),
  }),
  (t) => [index("name_idx").on(t.name)],
);
`;

    case "sqlite":
      return `
// Drizzle ORM schema for SQLite
import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => \`drizzle_\${name}\`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey({ autoIncrement: true }),
    name: d.text(),
    createdAt: d.integer().default(sql\`CURRENT_TIMESTAMP\`).notNull(),
    updatedAt: d.integer().default(sql\`CURRENT_TIMESTAMP\`),
  }),
  (t) => [index("name_idx").on(t.name)],
);
`;
  }
};
