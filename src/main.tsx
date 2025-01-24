import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Helmet>
      <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    </Helmet>
    <App />
  </StrictMode>
);
