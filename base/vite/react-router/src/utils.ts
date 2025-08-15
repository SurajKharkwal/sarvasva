import { z } from "@repo/core";

export const UI = z.enum(["shadcn", "hero"]);
export const THEME = z.enum(["neutral", "gray", "slate", "zinc", "stone"]);
export const ESLINT = z.enum(["standard"]);
export const PM = z.enum(["bun", "npm", "pnpm", "yarn"]);

export const schema = z
  .object({
    appName: z.string(),
    packageManager: PM,
    ui: UI.optional(),
    theme: THEME.optional(),
    eslint: ESLINT.optional(),
  })
  .refine(
    (data) => {
      // If ui is 'shadcn', theme may be present (or undefined); if not, theme must be undefined
      if (data.theme === undefined && data.ui === "shadcn") return false;
      return true;
    },
    { error: "Invalid conditional options" },
  );

export type OPTIONS = z.infer<typeof schema>;
export type THEME = z.infer<typeof THEME>;
