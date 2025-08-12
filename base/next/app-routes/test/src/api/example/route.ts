
import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { users } from "@/server/db/schema"; // example table

export async function GET() {
  const data = await db.select().from(users);
  return NextResponse.json(data);
}
