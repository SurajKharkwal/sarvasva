export const pool = `
import mysql from "mysql2/promise";

const pool = mysql.createPool(process.env.DATABASE_URL as string);

export default pool;
`;

export const route = `
import pool from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [rows] = await pool.query("SELECT id, name, email FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
`;
