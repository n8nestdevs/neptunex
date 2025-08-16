import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Si entran a / sin hash, llevamos a #/login ANTES de renderizar
if (!location.hash || location.hash === "#/") {
  location.replace(`${location.origin}${location.pathname}#/login`);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);