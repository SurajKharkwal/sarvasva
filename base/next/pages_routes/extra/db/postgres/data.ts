export const pool = `
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  max: 10, // connection pool limit
});

export default pool;
`;

export const route = `
import pool from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest , res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT id, name, email FROM users");
      res.status(200).json(result.rows);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
`;
