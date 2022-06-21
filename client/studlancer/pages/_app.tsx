import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { createClient, Provider } from "urql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily:
          "ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol",
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <Component {...pageProps} />;
    </MantineProvider>
  );
}

export default MyApp;
