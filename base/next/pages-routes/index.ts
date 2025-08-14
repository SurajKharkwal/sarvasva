#!/usr/bin/env node
import { Command } from "@repo/core";
import { AUTH, DATABASE, ESLINT, ORM, PM, schema, THEME, UI } from "@/utils";
import { main } from "@/main";

const program = new Command();

program
  .name("Sarvasva")
  .description("CLI tool to scaffold Sarvasva projects.")
  .version("0.0.1")
  .option("-n, --appName <appDir>", "provide a valid project name")
  .option(
    "-p, --package-manager <pm>",
    `Choose Package Manager (${PM.options.join(", ")})`,
  )
  .option("-u, --ui <ui>", `Choose UI Library (${UI.options.join(", ")})`)
  .option(
    "-t, --theme <theme>",
    `Choose Shadcn Theme (${THEME.options.join(", ")})`,
  )
  .option(
    "-a, --auth <auth>",
    `Choose Auth provider (${AUTH.options.join(", ")})`,
  )
  .option(
    "-d, --database <db>",
    `Choose Database (${DATABASE.options.join(", ")})`,
  )
  .option("-o, --orm <orm>", `Choose ORM (${ORM.options.join(", ")})`)
  .option(
    "-e, --eslint <eslint>",
    `Choose ESLint config (${ESLINT.options.join(", ")})`,
  )
  .addHelpText(
    "after",
    `
Examples:
  $ @sarvasva-app/next-app -u shadcn -a clerk -d postgres -o prisma -e standard -p yarn
  $ @sarvasva-app/next-app -d sqlite -o drizzle -e standard
`,
  )
  .action(async (options) => {
    try {
      await schema.parseAsync(options);
      await main(options);
    } catch (err) {
      console.error(err);
    }
  });

program.parse(process.argv);
