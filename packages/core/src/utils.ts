import { $ } from "zx";
import { mkdir, appendFile, writeFile } from "fs/promises";
import { type PM, type SCRIPTS } from "./types";
import path from "path";

export async function echo(filePath: string, message: string, append = false) {
  await mkdir(path.dirname(filePath), { recursive: true });

  if (append) await appendFile(filePath, message, "utf8");
  else await writeFile(filePath, message, "utf8");
}

export async function installPackages(
  pm: PM,
  appDir: string,
  dependencies: string[] = [],
  devDependencies: string[] = [],
) {
  switch (pm) {
    case "bun":
      if (dependencies)
        await $({ quiet: true, cwd: appDir })`bun add ${dependencies}`;
      if (devDependencies)
        await $({ quiet: true, cwd: appDir })`bun add -D ${devDependencies}`;
      break;

    case "npm":
      if (dependencies)
        await $({ quiet: true, cwd: appDir })`npm install ${dependencies}`;
      if (devDependencies)
        await $({
          quiet: true,
          cwd: appDir,
        })`npm install -D ${devDependencies}`;
      break;

    case "yarn":
      if (dependencies)
        await $({ quiet: true, cwd: appDir })`yarn add ${dependencies}`;
      if (devDependencies)
        await $({ quiet: true, cwd: appDir })`yarn add -D ${devDependencies}`;
      break;

    case "pnpm":
      if (dependencies)
        await $({ quiet: true, cwd: appDir })`pnpm add ${dependencies}`;
      if (devDependencies)
        await $({ quiet: true, cwd: appDir })`pnpm add -D ${devDependencies}`;
      break;

    default:
      throw new Error(`Unknown package manager: ${pm}`);
  }
}
export async function runner(pm: PM, appDir: string, script: SCRIPTS) {
  console.log(script);

  switch (pm) {
    case "bun":
      await $({
        quiet: true,
        cwd: appDir,
      })`bunx --bun ${script.cmd} ${script.args}`;
      break;

    case "npm":
      await $({ quiet: true, cwd: appDir })`npx ${script.cmd} ${script.args}`;
      break;

    case "yarn":
      await $({
        quiet: true,
        cwd: appDir,
      })`yarn dlx ${script.cmd} ${script.args}`;
      break;

    case "pnpm":
      await $({
        quiet: true,
        cwd: appDir,
      })`pnpm dlx ${script.cmd} ${script.args}`;
      break;

    default:
      throw new Error(`Unknown package manager: ${pm}`);
  }
}

export async function runScripts(pm: PM, appDir: string, scripts: SCRIPTS[]) {
  for (const script of scripts) {
    await runner(pm, appDir, script);
  }
}
