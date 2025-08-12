import path from "path";
import { echo } from "@/utils";
import { gloablcss, hero } from "./data";

const dependencies: string[] = ["@heroui/theme", "@heroui/system"];
const devDependencies: string[] = [];

const command = ["@heroui/button"];

export async function heroSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/app/globals.css"), gloablcss);
    await echo(path.join(appDir, "src/app/hero.ts"), hero);
    return { dependencies, devDependencies, command };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
