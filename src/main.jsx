import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ContextState } from "./context/contextState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextState>
    <App />
  </ContextState>
);
