#!/usr/bin/env node
import { Command } from "commander";
import { main } from "@/main";
import { ESLINT, PM, schema, THEME, UI } from "@/utils";
import { z } from "@repo/core";

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
  $ @sarvasva-app/vite-tanstack -u shadcn -e standard -t neutral
  $ @sarvasva-app/vite-tanstack --ui shadcn --eslint standard --package-manager bun --theme neutral
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
