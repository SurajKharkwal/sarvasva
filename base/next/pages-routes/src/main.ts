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
import { echo, installPackages, runScripts } from "@repo/core";
import { sparseClone } from "@repo/core";
import type { SCRIPTS } from "@repo/core";
import path from "path";
import type { OPTIONS } from "./utils";
import { appLayout } from "extra/common/_app";

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
  auth: { clerk: clerkSetup },
  database: {
    mysql: mysqlSetup,
    postgresql: postgresSetup,
    sqlite: sqliteSetup,
    mongodb: mongodbSetup,
  },
  eslint: { standard: standardSetup },
  orm: { prisma: prismaSetup, drizzle: drizzleSetup },
};

export async function main(opts: OPTIONS) {
  const { appName, packageManager, auth, database, eslint, orm, theme, ui } =
    opts;
  await sparseClone(
    "https://github.com/SurajKharkwal/sarvasva/",
    "base/next/pages-routes/skeleton",
    appName,
    { overrideDir: true, silent: true },
  );

  if (ui === "shadcn") {
    const res = await locate.ui.shadcn(appName, theme!);
    storeData(res);
  }
  if (ui === "hero") {
    const res = await locate.ui.hero(appName);
    storeData(res);
  }
  if (auth) {
    const res = await locate.auth[auth](appName);
    storeData(res);
  }
  if (database && orm !== "prisma") {
    const res = await locate.database[database](appName);
    storeData(res);
  }
  if (orm) {
    const res = await locate.orm[orm](appName, database as any);
    storeData(res);
  }
  if (eslint) {
    const res = await locate.eslint[eslint](appName);
    storeData(res);
  }
  if (auth === "clerk" && ui === "hero")
    await echo(
      path.join(appName, "src/pages/_app.tsx"),
      appLayout(auth === "clerk", ui === "hero"),
    );
  // console.log(dependencies, devDependencies, scripts);
  await installPackages(packageManager, appName, dependencies, devDependencies);
  await runScripts(packageManager, appName, scripts);
}
