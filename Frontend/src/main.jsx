import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "623278303688-t2srv03k0s5494mshrva9uni0prtrs1t.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={clientId}
      scriptProps={{
        async: true,
        defer: true,
        onload: "handleAuthScriptLoad",
      }}
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
