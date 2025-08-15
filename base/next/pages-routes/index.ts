#!/usr/bin/env node
import { Command, z } from "@repo/core";
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
  $ @sarvasva-app/next-pages -u shadcn -t neutral -a clerk -d postgres -o prisma -e standard -p yarn
  $ @sarvasva-app/next-pages --ui shadcn  --theme neurtal --auth clerk --package-manager bun --databse mysql  --orm prisma
`,
  )
  .action(async (options) => {
    try {
      await schema.parseAsync(options);
      await main(options);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error("❌ Validation Errors:");
        err.issues.forEach((issue) => {
          const path = issue.path.join(".");
          console.error(
            `  • Option "${path}" is invalid: ${issue.message} (Summary: ${issue.code})`,
          );
        });
      } else {
        console.error("⚠️ Unexpected error:", err);
      }
      process.exit(1);
    }
  });
program.parse(process.argv);
