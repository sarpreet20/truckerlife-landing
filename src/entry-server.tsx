import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.tsx";

export function render(path: string) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}

export { SEO_ROUTES } from "./seoRoutes";
