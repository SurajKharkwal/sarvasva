import { writeFile, appendFile } from "fs/promises";
type OPTS = {
  ui: string[];
  auth: string[];
  database: string[];
  orm: string[];
  eslint: string[];
};

export const allowedOptions: OPTS = {
  ui: ["shadcn", "hero"],
  auth: ["clerk"],
  database: ["mysql", "postgres", "sqlite", "mongodb"],
  orm: ["prisma", "drizzle"],
  eslint: ["airbnb", "standard"],
} as const;

export type OptionKey = keyof typeof allowedOptions;

export function validateInput<K extends OptionKey>(field: K, value?: string) {
  const allowed = allowedOptions[field];
  if (!value || allowed.includes(value)) {
    return value;
  }
  throw new Error(`Invalid ${field}: ${value}. Allowed: ${allowed.join(", ")}`);
}

function parseEscapes(message: string): string {
  return message
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r")
    .replace(/\\b/g, "\b")
    .replace(/\\f/g, "\f")
    .replace(/\\v/g, "\v")
    .replace(/\\\\/g, "\\")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
}

export async function echo(message: string, options?: { escape?: boolean }) {
  const output = options?.escape ? parseEscapes(message) : message;
  console.log(output);
}

echo.to = async function (
  message: string,
  filePath: string,
  options?: { escape?: boolean },
) {
  const output = options?.escape ? parseEscapes(message) : message;
  await writeFile(filePath, output, "utf8");
};

echo.toEnd = async function (
  message: string,
  filePath: string,
  options?: { escape?: boolean },
) {
  const output = options?.escape ? parseEscapes(message) : message;
  await appendFile(filePath, output, "utf8");
};
