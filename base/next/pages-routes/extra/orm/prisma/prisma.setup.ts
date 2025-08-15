import path from "path";
import { echo } from "@repo/core";
import { generatePrismaSchema, prisma, route } from "./data";
import type { SCRIPTS } from "@/types";
import { type ORM_DB } from "@/utils";

const dependencies: string[] = [
  "@prisma/client",
  "@prisma/extension-accelerate",
];
const devDependencies: string[] = ["prisma"];

const envs: string[] = ["DATABASE_URL="];

export async function prismaSetup(appDir: string, database: ORM_DB) {
  const scripts: SCRIPTS[] = [
    {
      cmd: "prisma",
      args: "generate",
    },
  ];
  try {
    await echo(path.join(appDir, "src/pages/api/example.ts"), route);
    await echo(path.join(appDir, "src/lib/db.ts"), prisma);
    await echo(
      path.join(appDir, "prisma/schema.prisma"),
      generatePrismaSchema(database),
    );
    await echo(path.join(appDir, ".env.example"), envs[0]!, true);
    return { dependencies, devDependencies, scripts };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
