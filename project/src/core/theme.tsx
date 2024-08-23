import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { PropsWithChildren } from "react";

// A custom theme for this app
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IRANYekanX, roboto",
    h1: {
      fontWeight: 800,
      fontSize: "2rem", // 32px
      lineHeight: 1.5,
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.5rem", // 24px
      lineHeight: 1.5,
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.25rem", // 20px
      lineHeight: 1.5,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.125rem", // 18px
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 700,
      fontSize: "1rem", // 16px
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 700,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      fontSize: "1rem", // 16px
      lineHeight: 1.25,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem", // 16px
      lineHeight: 1.75,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem", // 14px
      lineHeight: 1.75,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.5,
    },
    overline: {
      fontWeight: 300,
      fontSize: "0.75rem", // 12px
      lineHeight: 1.5,
    },
  },
});

export default theme;

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export function Rtl(props: PropsWithChildren) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
