import path from "path";
import { echo } from "@/utils";
import { pool, route } from "./data";

const dependencies: string[] = ["pg"];
const devDependencies: string[] = [];
const envs: string[] = ["DATABASE_URL="];

export async function postgresSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/api/example/route.ts"), route);
    await echo(path.join(appDir, "src/lib/db.ts"), pool);
    await echo(path.join(appDir, ".env.local"), envs.join("\n"), true);

    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
