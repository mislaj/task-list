import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@assets/scss/styles.scss";
// import '@assets/scss/_variables.scss'
import App from "./App.tsx";

// Servers
// import { server as any } from "./mocks/msw/node";
// Mocking the API
// server.listen();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
