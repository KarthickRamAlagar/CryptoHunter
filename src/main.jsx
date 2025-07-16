import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CryptoContext from "./CryptoContext.jsx";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-alice-carousel/lib/alice-carousel.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")).render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </ThemeProvider>
  </StylesProvider>
);
