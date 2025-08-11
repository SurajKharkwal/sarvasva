import { heroSetup } from "@/ui/hero/hero.setup";
import { shadcnSetup } from "@/ui/shadcn/shadcn.setup";

import { clerkSetup } from "@/auth/clerk/clerk.setup";

import { mysqlSetup } from "@/db/mysql/mysql.setup";
import { postgresSetup } from "@/db/postgres/postgres.setup";
import { sqliteSetup } from "@/db/sqlite/sqlite.setup";
import { mongodbSetup } from "@/db/mongodb/mongodb.setup";

import { airbnbSetup } from "@/eslint/airbnb/airbnb.setup";
import { standardSetup } from "@/eslint/standard/standard.setup";

import { prismaSetup } from "@/orm/prisma/prisma.setup";
import { drizzleSetup } from "@/orm/drizzle/drizzle.setup";

type OPTS = {
  pm: "bun" | "yarn" | "npm" | "pnpm";
  ui?: "shadcn" | "hero";
  auth?: "clerk";
  database?: "mysql" | "postgres" | "sqlite" | "mongodb";
  eslint?: "airbnb" | "standard";
  orm?: "prisma" | "drizzle";
};

const locate = {
  ui: {
    shadcn: shadcnSetup,
    hero: heroSetup,
  },
  auth: {
    clerk: clerkSetup,
  },
  database: {
    mysql: mysqlSetup,
    postgres: postgresSetup,
    sqlite: sqliteSetup,
    mongodb: mongodbSetup,
  },
  eslint: {
    airbnb: airbnbSetup,
    standard: standardSetup,
  },
  orm: {
    prisma: prismaSetup,
    drizzle: drizzleSetup,
  },
};

export { locate };

export async function main(opts: OPTS) {
  console.log(`Using package manager: ${opts.pm}`);

  if (opts.ui) {
    await locate.ui[opts.ui]();
  }

  if (opts.auth) {
    await locate.auth[opts.auth]();
  }

  if (opts.database) {
    await locate.database[opts.database]();
  }

  if (opts.eslint) {
    await locate.eslint[opts.eslint]();
  }

  if (opts.orm) {
    await locate.orm[opts.orm]();
  }

  console.log("Project setup complete!");
}
