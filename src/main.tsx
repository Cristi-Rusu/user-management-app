import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dayjs from "dayjs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import relativeTime from "dayjs/plugin/relativeTime";

import { UsersConnectionProvider } from "./UsersConnectionContext.tsx";
import App from "./App.tsx";
import { theme } from "./theme.ts";
import "./index.css";

dayjs.extend(relativeTime);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UsersConnectionProvider>
        <App />
      </UsersConnectionProvider>
    </ThemeProvider>
  </StrictMode>,
);
