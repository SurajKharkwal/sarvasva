import { spawn } from "node:child_process";

// Define allowed package managers
type PackageManager = "bun" | "npm" | "yarn" | "pnpm";

// Define the input object type for generateCommand
interface GenerateCommandData {
  appName: string;
  ui?: string;
  theme?: string;
  auth?: string;
  database?: string;
  orm?: string;
  eslint?: string;
  packageManager: PackageManager;
  router: string;
}

const prefix = (name: string, pm: PackageManager): [string, ...string[]] => {
  const map: Record<PackageManager, [string, ...string[]]> = {
    bun: ["bunx", "--bun", `@sarvasva-app/${name}`],
    npm: ["npx", `@sarvasva-app/${name}`],
    yarn: ["yarn", "dlx", `@sarvasva-app/${name}`],
    pnpm: ["pnpm", "dlx", `@sarvasva-app/${name}`],
  };
  return map[pm] ?? ["bunx", "--bun", `@sarvasva-app/${name}`];
};

// Generates command + arguments
export function generateCommand(data: GenerateCommandData): {
  cmd: string;
  args: string[];
} {
  const {
    appName,
    ui,
    theme,
    auth,
    database,
    orm,
    eslint,
    packageManager,
    router,
  } = data;

  const [cmd, ...baseArgs]: string[] = prefix(router, packageManager);

  const args: string[] = [...baseArgs, "-n", appName, "-p", packageManager];

  if (ui && ui !== "none") args.push("-u", ui);
  if (auth && auth !== "none") args.push("-a", auth);
  if (orm && orm !== "none") args.push("-o", orm);
  if (theme && theme !== "none") args.push("-t", theme);
  if (eslint && eslint !== "none") args.push("-e", eslint);
  if (database && database !== "none") args.push("-d", database);

  return { cmd, args };
}

// Runs the given command
export function runCommand(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: "inherit" });
    proc.on("close", (code: number | null) =>
      code === 0
        ? resolve()
        : reject(new Error(`${cmd} exited with code ${code}`)),
    );
    proc.on("error", reject);
  });
}
