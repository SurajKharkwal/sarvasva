import { spawn } from "node:child_process";

export function generateCommand(data: Record<string, string>) {
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

  const command = packageManager || "npm";

  const args: string[] = [];

  if (router) args.push(router);

  if (appName) args.push(`-n`, appName);
  if (ui) args.push(`-u`, ui);
  if (theme && ui === "shadcn") args.push(`-t`, theme);
  if (auth) args.push(`-a`, auth);
  if (database) args.push(`-d`, database);
  if (orm) args.push(`-o`, orm);
  if (eslint) args.push(`-e`, eslint);
  if (packageManager) args.push(`-p`, packageManager);

  console.log("Generated command:", command, args.join(" "));
  return { command, args };
}

export function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${command} exited with code ${code}`)),
    );
    proc.on("error", reject);
  });
}
