import path from "path";
import { echo } from "@repo/core";
import { pool, route } from "./data";

const dependencies: string[] = ["pg"];
const devDependencies: string[] = [];
const envs: string[] = ["DATABASE_URL="];

export async function postgresSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/pages/api/example.ts"), route);
    await echo(path.join(appDir, "src/lib/db.ts"), pool);
    await echo(path.join(appDir, ".env.example"), envs.join("\n"), true);

    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
