import path from "path";
import { echo } from "@repo/core";
import { db, route } from "./data";

const dependencies: string[] = ["better-sqlite3"];
const devDependencies: string[] = [];
const envs: string[] = ["DATABASE_URL=./mydatabase.sqlite"];

export async function sqliteSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/app/api/example/route.ts"), route);
    await echo(path.join(appDir, "src/lib/db.ts"), db);
    await echo(path.join(appDir, ".env.example"), envs.join("\n"), true);
    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
