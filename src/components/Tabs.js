import React from "react";
import { FaHome, FaHistory, FaTrophy, FaUser } from "react-icons/fa";

const tabs = [
  { key: "main", icon: <FaHome />, label: "Главная" },
  { key: "history", icon: <FaHistory />, label: "История" },
  { key: "achievements", icon: <FaTrophy />, label: "Достижения" },
  { key: "profile", icon: <FaUser />, label: "Профиль" }
];

export default function Tabs({ current, onNav }) {
  return (
    <div className="tabs-bar">
      {tabs.map(tab => (
        <div
          key={tab.key}
          className={`tab-item${current === tab.key ? " active" : ""}`}
          onClick={() => onNav(tab.key)}
        >
          <div style={{ fontSize: 22, marginBottom: 2 }}>{tab.icon}</div>
          <div>{tab.label}</div>
        </div>
      ))}
    </div>
  );
}