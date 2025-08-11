#!/usr/bin/env node
import { Command } from "commander";
import { allowedOptions, validateInput } from "./src/utils";
import { main } from "./src/runSetup.ts";

const program = new Command();

program
  .name("Sarvasva")
  .description("CLI tool to scaffold Sarvasva projects.")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize a new project with your choices")
  .option(
    "-u, --ui <ui>",
    `Choose UI framework (${allowedOptions.ui.join(", ")})`,
    (val) => validateInput("ui", val),
  )
  .option(
    "-a, --auth <auth>",
    `Choose Auth provider (${allowedOptions.auth.join(", ")})`,
    (val) => validateInput("auth", val),
  )
  .option(
    "-d, --database <db>",
    `Choose Database (${allowedOptions.database.join(", ")})`,
    (val) => validateInput("database", val),
  )
  .option(
    "-o, --orm <orm>",
    `Choose ORM (${allowedOptions.orm.join(", ")})`,
    (val) => validateInput("orm", val),
  )
  .option(
    "-e, --eslint <eslint>",
    `Choose ESLint config (${allowedOptions.eslint.join(", ")})`,
    (val) => validateInput("eslint", val),
  )
  .option(
    "-p, --package-manager <pm>",
    `Choose Package Manager (npm, yarn, pnpm, bun)`,
    (val) => {
      const allowedPM = ["npm", "yarn", "pnpm", "bun"];
      if (!allowedPM.includes(val)) {
        throw new Error(
          `Invalid package manager: ${val}. Allowed: ${allowedPM.join(", ")}`,
        );
      }
      return val;
    },
    "npm", // Default
  )
  .addHelpText(
    "after",
    `
Examples:
  $ sarvasva-next-app-routes init --ui shadcn --auth clerk --database postgres --orm prisma --eslint airbnb --package-manager yarn
  $ sarvasva-next-app-routes init --database sqlite --orm drizzle --eslint standard
`,
  )
  .action(async (options) => {
    await main(options);
  });

program.parse(process.argv);
