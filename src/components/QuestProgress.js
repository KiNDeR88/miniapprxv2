import React from "react";
import { useAchievements } from "../context/AchievementsContext";

const LOCATIONS = [
  { key: "olympia", title: "Горная Олимпия", icon: <span style={{ fontSize: 36 }}>⛷️</span> },
  { key: "2320", title: "Высота 2320", icon: <span style={{ fontSize: 36 }}>🏔️</span> },
  { key: "plateau", title: "Роза Плато", icon: <span style={{ fontSize: 36 }}>🌲</span> }
];

export default function QuestProgress() {
  const { progress } = useAchievements();
  const done = Object.values(progress).filter(Boolean).length;
  const completed = done === LOCATIONS.length;

  return (
    <div
      className="card"
      style={{
        margin: "30px 0",
        background: "#fff",
        boxShadow: "0 4px 22px 0 #915ee515",
        padding: "2rem 1rem 1.1rem 1rem",
        borderRadius: 32,
        maxWidth: 540,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 22,
          color: "var(--rk-dark)",
          marginBottom: 18,
          letterSpacing: ".01em",
          lineHeight: 1.15
        }}
      >
        Квест: Купи в трёх локациях
      </div>
      <div
        style={{
          display: "flex",
          gap: 0,
          justifyContent: "space-between",
          alignItems: "flex-end",
          margin: "5px 0 0 0",
          flexWrap: "wrap"
        }}
      >
        {LOCATIONS.map(loc => (
          <div
            key={loc.key}
            style={{
              flex: "1 1 0",
              minWidth: "0px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 2px"
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                background: "#fff",
                width: 54,
                height: 54,
                margin: "0 auto 8px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                boxShadow: progress[loc.key]
                  ? "0 2px 12px #23c27c33"
                  : "0 0px 0px #0000"
              }}
            >
              {loc.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15.5,
                color: "var(--rk-dark)",
                lineHeight: 1.16,
                minHeight: 36,
                maxWidth: 90,
                marginBottom: 0
              }}
            >
              {loc.title}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          marginTop: 1,
          padding: "0 0.3rem"
        }}
      >
        {LOCATIONS.map(loc => (
          <div
            key={loc.key}
            style={{
              flex: "1 1 0",
              minWidth: 0,
              textAlign: "center",
              fontWeight: 500,
              fontSize: 14,
              color: progress[loc.key] ? "#23c27c" : "#bbb",
              opacity: progress[loc.key] ? 1 : 0.82
            }}
          >
            {progress[loc.key] ? "Выполнено" : "Ожидание"}
          </div>
        ))}
      </div>
      <div
        style={{
          background: "#e3e8f7",
          borderRadius: 8,
          height: 7,
          width: "100%",
          margin: "18px 0 10px 0"
        }}
      >
        <div
          style={{
            width: (done / LOCATIONS.length) * 100 + "%",
            height: "100%",
            borderRadius: 8,
            background: completed
              ? "linear-gradient(92deg,#23c27c 0%,#915ee5 100%)"
              : "linear-gradient(92deg,#915ee5 0%,#1c6dd0 100%)",
            transition: "width .3s"
          }}
        />
      </div>
      <div style={{ color: "#888", fontSize: 15.5, marginTop: 5 }}>
        Осталось выполнить: <b>{LOCATIONS.length - done}</b>
      </div>
    </div>
  );
}