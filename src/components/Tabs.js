import React, { useState } from "react";
import { FaHome, FaHistory, FaTrophy, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { key: "/", icon: <FaHome />, label: "Главная" },
  { key: "/history", icon: <FaHistory />, label: "История" },
  { key: "/achievements", icon: <FaTrophy />, label: "Достижения" },
  { key: "/profile", icon: <FaUser />, label: "Профиль" }
];

export default function Tabs() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="tabs-bar">
      {tabs.map(tab => (
        <div
          key={tab.key}
          className={`tab-item${location.pathname === tab.key ? " active" : ""}`}
          onClick={() => navigate(tab.key)}
        >
          <div style={{ fontSize: 22, marginBottom: 2 }}>{tab.icon}</div>
          <div>{tab.label}</div>
        </div>
      ))}
    </div>
  );
}