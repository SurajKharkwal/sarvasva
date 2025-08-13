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
import db from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Synchronous query with better-sqlite3
    const users = db.prepare("SELECT id, name, email FROM users").all();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
`;
