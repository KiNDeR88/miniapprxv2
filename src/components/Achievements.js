import React from "react";
import { useAchievements } from "../context/AchievementsContext";

const LOCATIONS = [
  { key: "olympia", title: "Горная Олимпия", icon: <span style={{ fontSize: 33 }}>⛷️</span> },
  { key: "2320", title: "Высота 2320", icon: <span style={{ fontSize: 33 }}>🏔️</span> },
  { key: "plateau", title: "Роза Плато", icon: <span style={{ fontSize: 33 }}>🌲</span> }
];

export default function Achievements() {
  const { progress, updateLocation, resetProgress } = useAchievements();
  const done = Object.values(progress).filter(Boolean).length;
  const completed = done === LOCATIONS.length;

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", padding: "1rem", minHeight: "85vh" }}>
      <div className="card" style={{
        marginTop: 22,
        background: "linear-gradient(114deg, #f6f3ff 0%, #e6eaf8 100%)",
        boxShadow: "0 4px 22px 0 #915ee515",
        borderRadius: 32,
        padding: "2rem 1.2rem"
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 23,
          color: "var(--rk-dark)",
          marginBottom: 12,
          letterSpacing: ".01em",
          lineHeight: 1.14
        }}>
          Прогресс квеста:
        </div>
        <div style={{
          display: "flex",
          gap: 0,
          justifyContent: "space-between",
          alignItems: "flex-end",
          margin: "14px 0 0 0"
        }}>
          {LOCATIONS.map(loc => (
            <div
              key={loc.key}
              style={{
                flex: "1 1 0",
                minWidth: 0,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  background: progress[loc.key] ? "#c1ffd9" : "#fff",
                  width: 48,
                  height: 48,
                  margin: "0 auto 8px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 31,
                  boxShadow: progress[loc.key]
                    ? "0 2px 12px #23c27c44"
                    : "0 0px 0px #0000",
                  border: progress[loc.key]
                    ? "2.2px solid #23c27c"
                    : "2.2px solid #eee"
                }}
              >
                {loc.icon}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14.7,
                  color: "var(--rk-dark)",
                  lineHeight: 1.15,
                  minHeight: 32
                }}
              >
                {loc.title}
              </div>
              {/* Временная кнопка для теста: выполнить локацию */}
              {!progress[loc.key] && (
                <button
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    padding: "3px 11px",
                    borderRadius: 12,
                    border: "1px solid #915ee5",
                    background: "#fff",
                    color: "#915ee5",
                    cursor: "pointer"
                  }}
                  onClick={() => updateLocation(loc.key)}
                >
                  Отметить выполненным
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Статус под иконками */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          marginTop: 2,
          padding: "0 0.3rem"
        }}>
          {LOCATIONS.map(loc => (
            <div
              key={loc.key}
              style={{
                flex: "1 1 0",
                minWidth: 0,
                textAlign: "center",
                fontWeight: 500,
                fontSize: 13.2,
                color: progress[loc.key] ? "#23c27c" : "#bbb",
                opacity: progress[loc.key] ? 1 : 0.82
              }}
            >
              {progress[loc.key] ? "Выполнено" : "Ожидание"}
            </div>
          ))}
        </div>

        {/* Прогрессбар */}
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
        <div style={{ color: "#888", fontSize: 16, marginTop: 4 }}>
          Осталось выполнить: <b>{LOCATIONS.length - done}</b>
        </div>

        {/* Итоговое достижение */}
        <div style={{
          textAlign: "center",
          marginTop: 26,
          padding: "1.1rem 0.7rem 0.7rem 0.7rem"
        }}>
          {completed ? (
            <div>
              <div style={{
                fontSize: 31,
                marginBottom: 5,
                animation: "pop 0.5s"
              }}>🏆</div>
              <div style={{
                fontWeight: 700,
                fontSize: 19,
                color: "var(--rk-dark)",
                marginBottom: 4
              }}>Квест пройден!</div>
              <div style={{
                color: "#23c27c",
                fontWeight: 600,
                fontSize: 16
              }}>
                +500 баллов на ваш счёт!
              </div>
            </div>
          ) : (
            <div style={{
              color: "#aaa",
              fontSize: 15.5,
              fontWeight: 500
            }}>
              Пройдите все локации, чтобы получить награду!
            </div>
          )}
        </div>
        {/* Анимация — для трофея */}
        <style>
          {`
            @keyframes pop {
              0% { transform: scale(0.2);}
              70% { transform: scale(1.23);}
              100% { transform: scale(1);}
            }
          `}
        </style>

        {/* Кнопка сброса — для теста, можешь убрать */}
        <button
          style={{
            marginTop: 18,
            fontSize: 13,
            padding: "3px 11px",
            borderRadius: 12,
            border: "1px solid #bbb",
            background: "#f7f8ff",
            color: "#aaa",
            cursor: "pointer"
          }}
          onClick={resetProgress}
        >
          Сбросить квест (для теста)
        </button>
      </div>
    </div>
  );
}