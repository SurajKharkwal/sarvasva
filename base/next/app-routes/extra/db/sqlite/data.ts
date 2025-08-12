export const db = `
// src/lib/db.ts
import Database from "better-sqlite3";
import path from "path";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Remove "file:" prefix if present and resolve relative paths
const dbPath = process.env.DATABASE_URL.startsWith("file:")
  ? process.env.DATABASE_URL.replace("file:", "")
  : process.env.DATABASE_URL;

const db = new Database(path.resolve(dbPath));

export default db;
`;

export const route = `
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const rows = db.prepare("SELECT id, name FROM users").all();
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
`;
