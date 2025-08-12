#!/usr/bin/env node
import { Command } from "commander";
import { allowedOptions, validateInput } from "@/utils";
import { main } from "@/main";

const program = new Command();

program
  .name("Sarvasva")
  .description("CLI tool to scaffold Sarvasva projects.")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize a new project with your choices")
  .option("-n, --appName <appDir>", "provide a valid project name")
  .option(
    "-u, --ui <ui>",
    `Choose UI framework (${allowedOptions.ui.join(", ")})`,
    (val) => validateInput("ui", val),
  )
  .option(
    "-t, --theme <theme>",
    `Choose Shadcn Theme (${allowedOptions.shadcnTheme.join(", ")})`,
    (val) => validateInput("shadcnTheme", val),
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
    `Choose Package Manager (${allowedOptions.pm.join(", ")})`,
    (val) => validateInput("pm", val),
    "npm",
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
