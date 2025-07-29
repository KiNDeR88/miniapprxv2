import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Achievements from "./components/Achievements";
import Profile from "./components/Profile";
import Tabs from "./components/Tabs";

export default function App() {
  const [tab, setTab] = useState("main");

  let Screen;
  if (tab === "main") Screen = Dashboard;
  else if (tab === "history") Screen = History;
  else if (tab === "achievements") Screen = Achievements;
  else if (tab === "profile") Screen = Profile;

  return (
    <div>
      <Screen />
      <Tabs current={tab} onNav={setTab} />
    </div>
  );
}