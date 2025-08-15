import type { ORM_DB } from "@/utils";

export const route = `
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
`;

export const prisma = `
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
`;

export function generatePrismaSchema(db: ORM_DB) {
  let defaultUrl = "";
  switch (db) {
    case "mysql":
      defaultUrl = "mysql://USER:PASSWORD@localhost:3306/mydb";
      break;
    case "postgresql":
      defaultUrl = "postgresql://USER:PASSWORD@localhost:5432/mydb";
      break;
    case "sqlite":
      defaultUrl = "file:./dev.db";
      break;
  }

  return `// This file was generated automatically
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${db}"
  url      = env("DATABASE_URL")
}

// Example model
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}

// .env file should have:
// DATABASE_URL="${defaultUrl}"
`;
}
