#!/usr/bin/env node
import { getResponse } from "./src/userInput";
import { generateCommand, runCommand } from "./src/utils";
import ora from "ora";
import spinners from "cli-spinners";

async function main() {
  const data = await getResponse();
  const { cmd, args } = generateCommand(data as any);

  const spinner = ora({
    text: `Running ${cmd}...`,
    spinner: spinners.dots,
  }).start();

  try {
    await runCommand(cmd, args); // waits until command finishes
    spinner.succeed("Command finished successfully!");
  } catch (err) {
    spinner.fail("Command failed!");
    console.error(err);
  }
}

main().catch((err) => console.error(err));
