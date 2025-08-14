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
    await echo(path.join(appDir, "src/app/globals.css"), gloablcss);
    await echo(path.join(appDir, "src/app/hero.ts"), hero);
    await echo(path.join(appDir, "src/componets/provider.tsx"), provider);
    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
