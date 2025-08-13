
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
          {...pageProps}
          appearance={{
            cssLayerName: 'clerk',
          }}
        >
       
          <Component {...pageProps} />;
       
    </ClerkProvider>
  );
}
