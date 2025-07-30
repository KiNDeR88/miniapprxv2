import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { AchievementsProvider } from "./context/AchievementsContext";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <AchievementsProvider>
      <App />
    </AchievementsProvider>
  </UserProvider>
);