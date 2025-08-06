import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AchievementsProvider } from "./context/AchievementsContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AchievementsProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </AchievementsProvider>
);