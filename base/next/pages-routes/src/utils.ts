import { z } from "@repo/core";

export const UI = z.enum(["shadcn", "hero"]);
export const THEME = z.enum(["neutral", "gray", "slate", "zinc"]);
export const AUTH = z.enum(["clerk"]);
export const DATABASE = z.enum(["mysql", "postgres", "sqlite", "mongodb"]);
export const ORM = z.enum(["prisma", "drizzle"]);
export const ESLINT = z.enum(["standard"]);
export const PM = z.enum(["bun", "npm", "pnpm", "yarn"]);

export const schema = z
  .object({
    appName: z.string(),
    packageManager: PM,
    ui: UI.optional(),
    theme: THEME.optional(),
    auth: AUTH.optional(),
    database: DATABASE.optional(),
    orm: ORM.optional(),
    eslint: ESLINT.optional(),
  })
  .refine(
    (data) => {
      // If ui is 'shadcn', theme may be present (or undefined); if not, theme must be undefined
      if (data.theme === undefined && data.ui === "shadcn") return false;
      // If database is 'mongodb', orm must be undefined; otherwise, orm may be present
      if (data.orm !== undefined && data.database === "mongodb") return false;
      return true;
    },
    { error: "Invalid conditional options" },
  );

export type OPTIONS = z.infer<typeof schema>;
