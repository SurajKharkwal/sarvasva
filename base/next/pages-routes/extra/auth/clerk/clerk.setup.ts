import { middleware, signIn, signUp } from "./data";
import path from "path";
import { echo } from "@repo/core";

const dependencies: string[] = ["@clerk/nextjs"];
const devDependencies: string[] = [];

const envs: string[] = [
  "NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in",
  "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/",
  "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY=YOUR_SECRET_KEY",
  "CLERK_WEBHOOK_SIGNING_SECRET=whsec_123",
];

export async function clerkSetup(appDir: string) {
  try {
    await echo(path.join(appDir, "src/middleware.ts"), middleware);
    await echo(
      path.join(appDir, "src/pages/sign-in/[[...sign-in]].tsx"),
      signIn,
    );
    await echo(
      path.join(appDir, "src/pages/sign-up/[[...sign-up]].tsx"),
      signUp,
    );

    await echo(
      path.join(appDir, "src/styles/globals.css"),
      "@layer theme, base, clerk, components, utilities;",
      true,
    );

    // Write envs
    await echo(path.join(appDir, ".env.example"), envs.join("\n"), true);

    return { dependencies, devDependencies };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
