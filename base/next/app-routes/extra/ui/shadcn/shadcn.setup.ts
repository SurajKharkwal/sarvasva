import path from "path";
import { echo } from "@repo/core";
import { components, globalCss } from "./data";
import type { SHADCN_THEME } from "@repo/core";

const dependencies: string[] = [
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "tailwind-merge",
];
const devDependencies: string[] = ["tailwind-merge", "tw-animate-css"];

export async function shadcnSetup(appDir: string, theme: SHADCN_THEME) {
  try {
    await echo(path.join(appDir, "components.json"), components(theme));
    await echo(path.join(appDir, "src/globals.css"), globalCss(theme));
    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
