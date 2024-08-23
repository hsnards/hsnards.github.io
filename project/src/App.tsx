// @ts-nocheck
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "@mui/material";
import theme, { Rtl } from "./core/theme";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./assets/fa/fontiran.css";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Rtl>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={2}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Rtl>
  );
}

export default App;
