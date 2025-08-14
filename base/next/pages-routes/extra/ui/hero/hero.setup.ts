import path from "path";
import { echo } from "@repo/core";
import { gloablcss, hero, provider } from "./data";

const dependencies: string[] = [
  "@heroui/theme",
  "@heroui/system",
  "@heroui/button",
  "next-themes",
];
const devDependencies: string[] = [];

export async function heroSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/styles/globals.css"), gloablcss);
    await echo(path.join(appDir, "src/styles/hero.ts"), hero);
    await echo(path.join(appDir, "src/components/provider.tsx"), provider);
    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
