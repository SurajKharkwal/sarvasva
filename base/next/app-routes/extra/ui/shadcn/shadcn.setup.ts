import path from "path";
import { echo } from "@/utils";
import { globalCss } from "./data";
import type { SHADCN_THEME } from "@/types";

const dependencies: string[] = ["@heroui/theme", "@heroui/system"];
const devDependencies: string[] = [];

const command = ["@heroui/button"];

export async function shadcnSetup(appDir: string, theme: SHADCN_THEME) {
  try {
    await echo(path.join(appDir, "compoenents.json"), globalCss(theme));
    return { dependencies, devDependencies, command };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
