#!/usr/bin/env node
import { Command } from "commander";
import { main } from "@/main";
import { ESLINT, PM, schema, THEME, UI } from "@/utils";

const program = new Command();

program
  .name("Sarvasva")
  .description("CLI tool to scaffold Sarvasva projects.")
  .version("0.0.1")
  .option("-n, --appName <appDir>", "provide a valid project name")
  .option("-u, --ui <ui>", `Choose UI framework (${UI.options.join(", ")})`)
  .option(
    "-t, --theme <theme>",
    `Choose Shadcn Theme (${THEME.options.join(", ")})`,
  )
  .option(
    "-e, --eslint <eslint>",
    `Choose ESLint config (${ESLINT.options.join(", ")})`,
  )
  .option(
    "-p, --package-manager <pm>",
    `Choose Package Manager (${PM.options.join(", ")})`,
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
    try {
      await schema.parseAsync(options);
      await main(options);
    } catch (err) {
      console.log(err);
    }
  });

program.parse(process.argv);
