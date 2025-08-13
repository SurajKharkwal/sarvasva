import { getResponse } from "./src/userInput";
import { generateCommand, runCommand } from "./src/utils";

async function main() {
  const data = await getResponse();
  const { command, args } = generateCommand(data);
  await runCommand(command, args);
  console.log(data);
}

main().catch((err) => console.log(err));

