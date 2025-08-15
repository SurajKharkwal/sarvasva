import path from "path";
import { echo } from "@repo/core";
import { components, globalCss } from "./data";
import type { THEME } from "@/utils";

const dependencies: string[] = [
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "tailwind-merge",
];
const devDependencies: string[] = ["tailwind-merge", "tw-animate-css"];

export async function shadcnSetup(appDir: string, theme: THEME) {
  try {
    await echo(path.join(appDir, "components.json"), components(theme));
    await echo(
      path.join(appDir, "src/styles/globals.css"),
      globalCss(theme),
      true,
    );
    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
