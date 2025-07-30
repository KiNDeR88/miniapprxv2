import React from "react";
import { FaHome, FaHistory, FaTrophy, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

// Фирменные цвета
const RK_PURPLE = "#915ee5";
const RK_DARK = "#1b1846";
const RK_GREY = "#edeaf7";
const RK_ACCENT = "#ff731f";

const tabs = [
  { key: "main", icon: <FaHome />, label: "Главная", path: "/" },
  { key: "history", icon: <FaHistory />, label: "История", path: "/history" },
  { key: "achievements", icon: <FaTrophy />, label: "Достижения", path: "/achievements" },
  { key: "profile", icon: <FaUser />, label: "Профиль", path: "/profile" }
];

export default function Tabs() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        maxWidth: 500,
        margin: "0 auto",
        height: 70,
        background: "#fff",
        borderTop: `2px solid ${RK_GREY}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        boxShadow: "0 -3px 30px #8b62d719",
        padding: "0 8px"
      }}
    >
      {tabs.map(tab => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.key}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              height: 52,
              margin: "0 6px",
              border: "none",
              background: isActive
                ? `linear-gradient(97deg,${RK_PURPLE} 60%,${RK_ACCENT} 100%)`
                : "transparent",
              color: isActive ? "#fff" : RK_DARK,
              borderRadius: 18,
              boxShadow: isActive
                ? "0 2px 16px #915ee536"
                : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: isActive ? 700 : 500,
              fontSize: 14.3,
              letterSpacing: ".02em",
              cursor: "pointer",
              transition: "all .17s",
              outline: "none"
            }}
          >
            <span
              style={{
                fontSize: 25,
                marginBottom: 1,
                filter: isActive ? "drop-shadow(0 2px 4px #915ee563)" : "none"
              }}
            >
              {tab.icon}
            </span>
            <span
              style={{
                marginTop: 2,
                fontFamily: "'Montserrat', Arial, sans-serif",
                letterSpacing: ".01em"
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}