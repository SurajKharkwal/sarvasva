import path from "path";
import { echo } from "@repo/core";
import { standard } from "./data";

const dependencies: string[] = [];
const devDependencies: string[] = [
  "eslint",
  "eslint-config-next",
  "@eslint/eslintrc",
];

export async function standardSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "eslint.config.mjs"), standard);
    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
