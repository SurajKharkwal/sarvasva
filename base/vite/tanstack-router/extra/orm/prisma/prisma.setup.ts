import path from "path";
import { echo } from "@/utils";
import { prisma, route } from "./data";
import type { SCRIPTS } from "@/types";

const dependencies: string[] = [
  "@prisma/client",
  "@prisma/extension-accelerate",
];
const devDependencies: string[] = ["prisma"];

const scripts: SCRIPTS[] = [
  {
    cmd: "prisma",
    args: "init",
  },
  {
    cmd: "prisma",
    args: "generate",
  },
];
const envs: string[] = ["DATABASE_URL="];

export async function prismaSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/app/api/example/route.ts"), route);
    await echo(path.join(appDir, "src/lib/db.ts"), prisma);
    await echo(path.join(appDir, ".env.example"), envs.join("\n"), true);
    return { dependencies, devDependencies, scripts };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
