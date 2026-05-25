import React from "react";
import { createRoot } from "react-dom/client";
import { Index } from "./routes/index";
import "./styles.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se encontró el contenedor #root para montar la aplicación.");
}

createRoot(root).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);
