import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Achievements from "./components/Achievements";
import History from "./components/History";
import Profile from "./components/Profile";
import logo from "./assets/logo.webp";

const navItems = [
  { key: "dashboard", label: "Главная", icon: "🏠" },
  { key: "history", label: "История", icon: "📑" },
  { key: "achievements", label: "Достижения", icon: "⭐️" },
  { key: "profile", label: "Профиль", icon: "👤" },
];

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="app-bg">
      <header className="app-header">
        <img src={logo} alt="Роза Хутор" className="logo" />
      </header>
      <main className="app-main">
        {active === "dashboard" && <Dashboard onNav={setActive} />}
        {active === "history" && <History />}
        {active === "achievements" && <Achievements />}
        {active === "profile" && <Profile />}
      </main>
      <nav className="app-nav">
        {navItems.map((item) => (
          <div
            key={item.key}
            className={`nav-tab${active === item.key ? " active" : ""}`}
            onClick={() => setActive(item.key)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}