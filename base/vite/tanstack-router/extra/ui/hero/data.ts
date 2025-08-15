export const hero = `
// hero.ts
import { heroui } from "@heroui/theme";
export default heroui();
`;

export const gloablcss = `
@import "tailwindcss";
@plugin './hero.ts';
/* Note: You may need to change the path to fit your project structure */
@source '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
@custom-variant dark (&:is(.dark *));
`;

export const provider = `
import { HeroUIProvider } from "@heroui/system";

export function Provider({ children }: { children: React.ReactNode }) {

  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
`;

export const main = `
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@/styles/globals.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { Provider } from "@/components/provider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
}
`;
