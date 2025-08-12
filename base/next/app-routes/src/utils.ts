import { writeFile, appendFile } from "fs/promises";
import type { PM } from "./types";
import { execa } from "execa";
import path from "path";
import { mkdir } from "fs/promises";
type OPTS = {
  ui: string[];
  auth: string[];
  database: string[];
  orm: string[];
  eslint: string[];
  pm: string[];
  shadcnTheme: string[];
};

export const allowedOptions: OPTS = {
  ui: ["shadcn", "hero"],
  auth: ["clerk"],
  database: ["mysql", "postgres", "sqlite", "mongodb"],
  orm: ["prisma", "drizzle"],
  eslint: ["standard"],
  pm: ["npm", "pnpm", "yarn", "bun"],
  shadcnTheme: ["neutral", "gray", "zinc", "slate", "stone"],
} as const;

export type OptionKey = keyof typeof allowedOptions;

export function validateInput<K extends OptionKey>(field: K, value?: string) {
  const allowed = allowedOptions[field];
  if (!value || allowed.includes(value)) {
    return value;
  }
  throw new Error(`Invalid ${field}: ${value}. Allowed: ${allowed.join(", ")}`);
}

export async function echo(filePath: string, message: string, append = false) {
  await mkdir(path.dirname(filePath), { recursive: true });

  if (append) await appendFile(filePath, message, "utf8");
  else await writeFile(filePath, message, "utf8");
}

const installCommands = {
  npm: {
    deps: ["install"],
    devDeps: ["install", "--save-dev"],
  },
  yarn: {
    deps: ["add"],
    devDeps: ["add", "--dev"],
  },
  pnpm: {
    deps: ["add"],
    devDeps: ["add", "-D"],
  },
  bun: {
    deps: ["add"],
    devDeps: ["add", "-d"],
  },
};

export async function installPackages(
  pm: PM,
  dir: string,
  deps: string[] = [],
  devDeps: string[] = [],
) {
  const commands = installCommands[pm];

  if (deps.length > 0) {
    console.log(`📦 Installing dependencies with ${pm}...`);
    await execa(pm, [...commands.deps, ...deps], {
      cwd: dir,
      stdio: "inherit",
    });
  }

  if (devDeps.length > 0) {
    console.log(`🛠 Installing devDependencies with ${pm}...`);
    await execa(pm, [...commands.devDeps, ...devDeps], {
      cwd: dir,
      stdio: "inherit",
    });
  }
}
