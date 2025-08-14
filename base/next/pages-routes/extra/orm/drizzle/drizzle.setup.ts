import { echo } from "@repo/core";
import path from "path";
import { drizzleConfig, db as dbTemplate, schemea } from "./data";

type DATABASE = "mysql" | "postgres" | "sqlite";

const dependencies: string[] = ["drizzle-orm", "drizzle-kit"];
const devDependencies: string[] = [];
const command: string[] = ["drizzle-kit", "generate"];

const envs: string[] = ["DATABASE_URL="];

export async function drizzleSetup(appDir: string, database: DATABASE) {
  try {
    await echo(path.join(appDir, "drizzle.config.ts"), drizzleConfig(database));
    await echo(path.join(appDir, "src/lib/db.ts"), dbTemplate(database));
    await echo(path.join(appDir, "src/lib/schema.ts"), schemea(database));
    await echo(path.join(appDir, ".env.example"), envs.join("\n"), true);

    return { dependencies, devDependencies, command };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
