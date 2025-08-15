import { z } from "@repo/core";

export const UI = z.enum(["shadcn", "hero"]);
export const THEME = z.enum(["neutral", "gray", "slate", "zinc"]);
export const AUTH = z.enum(["clerk"]);
export const DATABASE = z.enum(["mysql", "postgresql", "sqlite", "mongodb"]);
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
  .superRefine((data, ctx) => {
    if (data.ui === "hero" && data.theme) {
      ctx.addIssue({
        code: "custom",
        message: "Theme propertry is for shadcn only",
        path: ["theme"],
      });
    }

    // Theme is required for 'shadcn' UI
    if (data.ui === "shadcn" && !data.theme) {
      ctx.addIssue({
        code: "custom",
        message: 'Theme is required when UI is "shadcn"',
        path: ["theme"],
      });
    }

    if (data.database === "mongodb" && data.orm) {
      ctx.addIssue({
        code: "custom", // use string directly
        message: 'ORM cannot be used with "mongodb"',
        path: ["orm"],
      });
    }
  });

export type OPTIONS = z.infer<typeof schema>;

export type ORM_DB = Exclude<z.infer<typeof DATABASE>, "mongodb">;
