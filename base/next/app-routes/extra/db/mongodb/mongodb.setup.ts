import { echo } from "@repo/core";
import path from "path";
import { db, route } from "./data";

const dependencies: string[] = ["mongodb"];
const devDependencies: string[] = [];

const envs: string[] = ["DATABASE_URL="];

export async function mongodbSetup(appDir: string) {
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
