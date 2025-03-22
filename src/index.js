import React from "react";
import ReactDOM from "react-dom/client";
import Portfolio from "./components/Portfolio";
import "./index.css"; // Create this for global styles if needed

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
