import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app, {
    onRecoverableError: (error, errorInfo) => {
      console.error("[hydration]", error, errorInfo?.componentStack);
    },
  });
} else {
  ReactDOM.createRoot(root).render(app);
}
