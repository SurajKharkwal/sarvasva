type OPTS = {
  ui: string[];
  eslint: string[];
  pm: string[];
  shadcnTheme: string[];
};

export const allowedOptions: OPTS = {
  ui: ["shadcn", "hero"],
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
