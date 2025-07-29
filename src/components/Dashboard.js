import React from "react";
import QuestProgress from "./QuestProgress";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff", // Только белый!
        paddingBottom: 86,
        position: "relative",
        zIndex: 1
      }}
    >
      {/* <div className="bg-gradient" />  — УДАЛЯЕМ! */}

      <header className="header">
        <img src="/logo.svg" alt="Роза Хутор" className="logo-rk" />
        <div
          style={{
            fontWeight: 700,
            fontSize: 28,
            color: "var(--rk-dark)",
            letterSpacing: ".01em"
          }}
        >
          Роза Хутор
        </div>
      </header>

      <main style={{ maxWidth: 430, margin: "0 auto", padding: "1rem" }}>
        {/* Пример карточки профиля */}
        <div className="card" style={{ margin: "22px 0 26px 0", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src="/avatar-demo.png"
              alt="avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                border: "2.5px solid var(--rk-purple)"
              }}
            />
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 21,
                  color: "var(--rk-dark)"
                }}
              >
                Алексей Петров
              </div>
              <div
                style={{
                  fontWeight: 500,
                  color: "var(--rk-blue)"
                }}
              >
                Уровень: Traveler
              </div>
            </div>
          </div>
          <div
            style={{
              margin: "16px 0 0 0",
              background: "#f3edfa",
              borderRadius: 14,
              height: 8,
              width: "100%",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: "55%",
                height: "100%",
                borderRadius: 14,
                background:
                  "linear-gradient(90deg, #ff731f 0%, #915ee5 100%)"
              }}
            />
          </div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 6 }}>
            До следующего: <b>250 баллов</b>
          </div>
        </div>

        {/* Квест с прогрессом из достижений */}
        <QuestProgress />

        {/* История операций — примеры */}
        <div className="card" style={{ background: "#fff" }}>
          <div
            style={{
              fontWeight: 700,
              color: "var(--rk-dark)",
              fontSize: 18,
              marginBottom: 7
            }}
          >
            Последние операции
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7
            }}
          >
            <div
              style={{
                background: "#f8f5ff",
                borderRadius: 14,
                padding: "13px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10
              }}
            >
              <span style={{ fontSize: 22 }}>⛷️</span>
              <span style={{ flex: 1 }}>Баллы за подъемник</span>
              <span style={{ color: "#23c27c", fontWeight: 700 }}>+150</span>
            </div>
            <div
              style={{
                background: "#fff4f4",
                borderRadius: 14,
                padding: "13px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10
              }}
            >
              <span style={{ fontSize: 22 }}>🍰</span>
              <span style={{ flex: 1 }}>Потрачено в кафе</span>
              <span style={{ color: "#eb5957", fontWeight: 700 }}>-90</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}