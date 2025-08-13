import { heroSetup } from "@/ui/hero/hero.setup";
import { shadcnSetup } from "@/ui/shadcn/shadcn.setup";
import { installPackages, runScripts } from "./utils";
import { sparseClone } from "@flyinghawk/sparse-clone";
import type { PM, SCRIPTS, SHADCN_THEME } from "@/types";
import { standardSetup } from "@/eslint/standard/standard.setup";

type OPTS = {
  appName: string;
  packageManager: PM;
  ui?: "shadcn" | "hero";
  eslint?: "standard";
  shadcnTheme?: SHADCN_THEME;
};

let dep: string[] = [];
let devDep: string[] = [];
let scripts: SCRIPTS[] = [];

const addDeps = (result?: {
  dependencies?: string[];
  devDependencies?: string[];
  scripts?: SCRIPTS[];
}) => {
  if (!result) return;
  dep.push(...(result.dependencies ?? []));
  devDep.push(...(result.devDependencies ?? []));
  scripts.push(...(result.scripts ?? []));
};

const locate = {
  ui: { shadcn: shadcnSetup, hero: heroSetup },
  eslint: { standard: standardSetup },
};

export async function main(opts: OPTS) {
  console.log(`Using package manager: ${opts.packageManager}`);

  await sparseClone(
    "https://github.com/SurajKharkwal/sarvasva/",
    "base/vite/react-router/skeleton",
    opts.appName,
    { overrideDir: true },
  );

  if (opts.ui) {
    if (opts.ui == "shadcn")
      addDeps(
        await locate.ui.shadcn(opts.appName, opts.shadcnTheme ?? "neutral"),
      );
    else addDeps(await locate.ui.hero(opts.appName));
  }

  if (opts.eslint) addDeps(await locate.eslint[opts.eslint](opts.appName));

  await installPackages(opts.packageManager, opts.appName, dep, devDep);
  await runScripts(opts.packageManager, opts.appName, scripts);
  console.log("Project setup complete!");
}
