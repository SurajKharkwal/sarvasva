import { heroSetup } from "@/ui/hero/hero.setup";
import { shadcnSetup } from "@/ui/shadcn/shadcn.setup";
import { installPackages, runScripts, sparseClone } from "@repo/core";
import type { SCRIPTS } from "@/types";
import { standardSetup } from "@/eslint/standard/standard.setup";
import type { OPTIONS } from "./utils";

let dependencies: string[] = [];
let devDependencies: string[] = [];
let scripts: SCRIPTS[] = [];

const storeData = (result?: {
  dependencies?: string[];
  devDependencies?: string[];
  scripts?: SCRIPTS[];
}) => {
  if (!result) return;
  dependencies.push(...(result.dependencies ?? []));
  devDependencies.push(...(result.devDependencies ?? []));
  scripts.push(...(result.scripts ?? []));
};

const locate = {
  ui: { shadcn: shadcnSetup, hero: heroSetup },
  eslint: { standard: standardSetup },
};

export async function main(opts: OPTIONS) {
  const { appName, packageManager, eslint, theme, ui } = opts;
  await sparseClone(
    "https://github.com/SurajKharkwal/sarvasva/",
    "base/vite/react-router/skeleton",
    appName,
    { silent: true, overrideDir: true },
  );
  if (ui === "shadcn") {
    const res = await locate.ui.shadcn(appName, theme!);
    storeData(res);
  }
  if (ui === "hero") {
    const res = await locate.ui.hero(appName);
    storeData(res);
  }
  if (eslint === "standard") {
    const res = await locate.eslint[eslint](appName);
    storeData(res);
  }

  await installPackages(packageManager, appName, dependencies, devDependencies);
  await runScripts(packageManager, appName, scripts);
  console.log("Project setup complete!");
}
