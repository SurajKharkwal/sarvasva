// WTF:: I know I should give up

export const appLayout = (addClerk: boolean, addHeroUi: boolean) => {
  const CLERK_IMPORT = addClerk
    ? `import { ClerkProvider } from "@clerk/nextjs";`
    : ``;

  const CLERK_PROVIDER_START = addClerk
    ? `<ClerkProvider
          {...pageProps}
          appearance={{
            cssLayerName: 'clerk',
          }}
        >`
    : ``;
  const CLERK_PROVIDER_END = addClerk ? `</ClerkProvider>` : ``;

  const HEROUI_IMPORT = addHeroUi
    ? `import { Providers } from "@/components/provider";`
    : ``;

  const HEROUI_START = addHeroUi
    ? `<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>`
    : ``;
  const HEROUI_END = addHeroUi ? `</Providers>` : ``;

  return `
import type { AppProps } from "next/app";
import "@/styles/globals.css";
${CLERK_IMPORT}
${HEROUI_IMPORT}

export default function App({ Component, pageProps }: AppProps) {
  return (
    ${CLERK_PROVIDER_START}
       ${HEROUI_START}
          <Component {...pageProps} />
       ${HEROUI_END}
    ${CLERK_PROVIDER_END}
  );
}
`;
};
