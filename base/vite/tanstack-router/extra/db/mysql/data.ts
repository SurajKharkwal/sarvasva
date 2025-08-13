export const pool = `
import mysql from "mysql2/promise";

const pool = mysql.createPool(process.env.DATABASE_URL as string);

export default pool;
`;

export const route = `
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT id, name FROM users");
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
`;
