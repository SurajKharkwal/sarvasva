import { heroSetup } from "@/ui/hero/hero.setup";
import { shadcnSetup } from "@/ui/shadcn/shadcn.setup";
import { clerkSetup } from "@/auth/clerk/clerk.setup";
import { mysqlSetup } from "@/db/mysql/mysql.setup";
import { postgresSetup } from "@/db/postgres/postgres.setup";
import { sqliteSetup } from "@/db/sqlite/sqlite.setup";
import { mongodbSetup } from "@/db/mongodb/mongodb.setup";
import { standardSetup } from "@/eslint/standard/standard.setup";
import { prismaSetup } from "@/orm/prisma/prisma.setup";
import { drizzleSetup } from "@/orm/drizzle/drizzle.setup";
import { installPackages } from "./utils";
import { sparseClone } from "@flyinghawk/sparse-clone";
import type { PM, SHADCN_THEME } from "@/types";

type OPTS = {
  appName: string;
  packageManager: PM;
  ui?: "shadcn" | "hero";
  auth?: "clerk";
  database?: "mysql" | "postgres" | "sqlite" | "mongodb";
  eslint?: "standard";
  orm?: "prisma" | "drizzle";
  shadcnTheme?: SHADCN_THEME;
};

let dep: string[] = [];
let devDep: string[] = [];
let command: string[] = [];

const addDeps = (result?: {
  dependencies?: string[];
  devDependencies?: string[];
  command?: string[];
}) => {
  if (!result) return;
  dep.push(...(result.dependencies ?? []));
  devDep.push(...(result.devDependencies ?? []));
  command.push(...(result.command ?? []));
};

const locate = {
  ui: { shadcn: shadcnSetup, hero: heroSetup },
  auth: { clerk: clerkSetup },
  database: {
    mysql: mysqlSetup,
    postgres: postgresSetup,
    sqlite: sqliteSetup,
    mongodb: mongodbSetup,
  },
  eslint: { standard: standardSetup },
  orm: { prisma: prismaSetup, drizzle: drizzleSetup },
};

export async function main(opts: OPTS) {
  console.log(`Using package manager: ${opts.packageManager}`);

  await sparseClone(
    "https://github.com/SurajKharkwal/sarvasva/",
    "base/next/app-routes/skeleton",
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

  if (opts.auth) addDeps(await locate.auth[opts.auth](opts.appName));

  if (opts.database && opts.orm !== "prisma") {
    addDeps(await locate.database[opts.database](opts.appName));
  }

  if (opts.eslint) addDeps(await locate.eslint[opts.eslint](opts.appName));

  if (opts.orm && opts.database !== "mongodb") {
    if (opts.orm === "prisma") {
      addDeps(await locate.orm.prisma(opts.appName));
    } else {
      addDeps(await locate.orm.drizzle(opts.appName, opts.database ?? "mysql"));
    }
  }

  await installPackages(opts.packageManager, opts.appName, dep, devDep);

  if (command.length) {
    console.log(
      `Next steps: run the following commands in your project folder:\n${command.join("\n")}`,
    );
  }

  console.log("Project setup complete!");
}
