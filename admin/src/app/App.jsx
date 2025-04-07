import React, { Suspense } from 'react';
import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { MatxTheme } from "./components";
import SettingsProvider from "./contexts/SettingsContext";
// import { AuthProvider } from "./contexts/JWTAuthContext";
import { AuthProvider } from "../context/AuthContext";
import routes from "./routes";
// FAKE SERVER
import "../__api__";


export default function App() {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          <Suspense fallback={<div>Loading...</div>}>
            {content}
          </Suspense>
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
}
