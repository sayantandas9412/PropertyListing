import "../styles/globals.css";
import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import BaseComponent from "../components/BaseComponent";

const colors = {
  background: {
    100: "#eeeeee87",
    200: "#eee",
    300: "#ff4500b5",
  },
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  primary: {
    heading: `'Josefin Sans', sans-serif `,
  },
};
const theme = extendTheme({ colors, fonts });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <BaseComponent>
        <Component {...pageProps} />
      </BaseComponent>
    </ChakraProvider>
  );
}

export default MyApp;
