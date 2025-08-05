import React, { useState } from "react";
import { useAchievements } from "../context/AchievementsContext";

const ACHIEVEMENTS = [
  {
    key: "cashback-tour",
    title: "Кэшбэк-тур",
    desc: "Совершите покупки в 3 разных точках курорта. Покупки можно делать в разные дни. Как только выполнишь — получи подарок!",
    icon: "🏔️",
    progressKey: ["olympia", "2320", "plateau"],
    goal: 3
  },
  {
    key: "registration",
    title: "Приветственный бонус",
    desc: "Получите бонусы за регистрацию в приложении.",
    icon: "🎁",
    achieved: true
  },
  {
    key: "first-purchase",
    title: "Первая покупка",
    desc: "Совершите первую покупку и получите баллы.",
    icon: "🛍️",
    achieved: false
  }
];

export default function Achievements() {
  const { progress } = useAchievements?.() || { progress: {} };
  const [selected, setSelected] = useState(null);

  const getCurrent = (ach) =>
    ach.progressKey ? ach.progressKey.filter(loc => progress?.[loc]).length : ach.achieved ? 1 : 0;
  const getGoal = (ach) => ach.goal || 1;

  return (
    <div
      className="achievements-root"
      style={{
        minHeight: "100vh",
        background: "#f7f5ff",
        padding: "18px 0 90px 0",
        fontFamily: "'Montserrat', Arial, sans-serif"
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 25,
          margin: "0 0 18px 0",
          textAlign: "center",
          color: "#403688"
        }}
      >
        Ваши достижения
      </div>
      <div
        className="achievements-list"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 19,
          maxWidth: 430,
          margin: "0 auto",
          padding: "0 1rem"
        }}
      >
        {ACHIEVEMENTS.map(ach => {
          let achieved = ach.achieved || false;
          let current = getCurrent(ach);
          let goal = getGoal(ach);
          if (ach.key === "cashback-tour") achieved = current >= goal;

          return (
            <div
              key={ach.key}
              className={`achievement-card${achieved ? " achieved" : ""}`}
              style={{
                borderRadius: 20,
                background: achieved
                  ? "linear-gradient(98deg, #FF731F 10%, #915ee5 90%)"
                  : "linear-gradient(97deg, #fff 65%, #f7f5ff 100%)",
                boxShadow: achieved
                  ? "0 2px 18px 0 #915ee522"
                  : "0 1px 7px 0 rgba(80,90,130,0.09)",
                padding: "22px 17px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                position: "relative",
                cursor: "pointer",
                transition: "transform .08s"
              }}
              onClick={() => setSelected(ach)}
            >
              <div
                style={{
                  fontSize: 38,
                  borderRadius: 12,
                  width: 54,
                  height: 54,
                  background: achieved ? "#fff4eb" : "#efe9ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: achieved
                    ? "0 0 0 3px #fff, 0 0 16px 2px #915ee522"
                    : "0 0 0 1.2px #ece7ff",
                  flexShrink: 0
                }}
              >
                {ach.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: achieved ? "#fff" : "#403688",
                    fontSize: 18,
                    marginBottom: 3,
                    textShadow: achieved ? "0 1px 8px #7c4ae580" : undefined
                  }}
                >
                  {ach.title}
                </div>
                <div
                  style={{
                    fontWeight: 400,
                    color: achieved ? "#f6e1d5" : "#6259a6",
                    fontSize: 15.2,
                    lineHeight: 1.36,
                    marginBottom: ach.key === "cashback-tour" ? 10 : 0
                  }}
                >
                  {ach.desc.length > 38 ? ach.desc.slice(0, 38) + "..." : ach.desc}
                </div>
                {ach.key === "cashback-tour" && (
                  <div>
                    <div
                      style={{
                        width: "100%",
                        height: 9,
                        background: achieved ? "#fff6ef" : "#ece7ff",
                        borderRadius: 7,
                        marginBottom: 6,
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width: `${(current / goal) * 100}%`,
                          height: "100%",
                          background: achieved
                            ? "linear-gradient(95deg, #FF731F 10%, #915ee5 100%)"
                            : "linear-gradient(92deg,#915ee5 50%, #ece7ff 110%)",
                          borderRadius: 7,
                          transition: "width .3s"
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: achieved ? "#fff" : "#403688",
                        fontSize: 14
                      }}
                    >
                      Прогресс: {current} из {goal}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {achieved ? (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#fff",
                      color: "#915ee5",
                      borderRadius: 11,
                      padding: "5px 13px",
                      fontWeight: 700,
                      fontSize: 13.5,
                      boxShadow: "0 1px 10px #f1e4fe40"
                    }}
                  >
                    Получено
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#ece7ff",
                      color: "#403688",
                      borderRadius: 11,
                      padding: "5px 13px",
                      fontWeight: 600,
                      fontSize: 13.5
                    }}
                  >
                    В процессе
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Модальное окно снизу */}
      {selected && (
        <div
          className="modal-achievement"
          style={{
            position: "fixed",
            left: 0, right: 0, bottom: 0,
            zIndex: 1200,
            background: "#fff",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            boxShadow: "0 -4px 24px #40368822",
            padding: "28px 22px 32px 22px",
            maxWidth: 430,
            margin: "0 auto",
            minHeight: 180,
            animation: "slideUp .23s cubic-bezier(.7,0,0,1)",
            willChange: "transform"
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              width: 48, height: 6, background: "#ece7ff", borderRadius: 3,
              margin: "0 auto 18px auto"
            }}
          />
          <div style={{ display: "flex", gap: 15, alignItems: "center", marginBottom: 8 }}>
            <div style={{
              fontSize: 36,
              background: "#efe9ff",
              borderRadius: 11,
              width: 54, height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>{selected.icon}</div>
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: 21,
                color: "#403688",
                marginBottom: 2
              }}>
                {selected.title}
              </div>
              <div style={{
                fontWeight: 400,
                color: "#726da8",
                fontSize: 15.5
              }}>
                {selected.desc}
              </div>
            </div>
          </div>
          {/* Детализация прогресса */}
          <div style={{ marginTop: 15 }}>
            {selected.progressKey ? (
              <>
                <div style={{
                  fontWeight: 600,
                  fontSize: 16,
                  marginBottom: 5,
                  color: "#2a2673"
                }}>
                  Прогресс: {getCurrent(selected)} из {getGoal(selected)}
                </div>
                <div style={{
                  width: "100%",
                  height: 9,
                  background: "#ece7ff",
                  borderRadius: 7,
                  marginBottom: 7,
                  overflow: "hidden"
                }}>
                  <div
                    style={{
                      width: `${(getCurrent(selected) / getGoal(selected)) * 100}%`,
                      height: "100%",
                      background:
                        getCurrent(selected) === getGoal(selected)
                          ? "linear-gradient(95deg, #FF731F 10%, #915ee5 100%)"
                          : "linear-gradient(92deg,#915ee5 50%, #ece7ff 110%)",
                      borderRadius: 7,
                      transition: "width .3s"
                    }}
                  />
                </div>
                <div style={{
                  fontWeight: 400,
                  color: "#444",
                  fontSize: 14,
                  marginTop: 5
                }}>
                  Осталось: {getGoal(selected) - getCurrent(selected)} {getGoal(selected) - getCurrent(selected) === 1 ? "точка" : "точки"}
                </div>
                {getCurrent(selected) === getGoal(selected) && (
                  <div style={{
                    marginTop: 20,
                    fontWeight: 700,
                    color: "#23c27c",
                    fontSize: 17
                  }}>
                    Поздравляем, вы выполнили это достижение!
                  </div>
                )}
              </>
            ) : (
              <div style={{
                fontWeight: 400,
                color: selected.achieved ? "#23c27c" : "#726da8",
                fontSize: 15
              }}>
                {selected.achieved ? "Достижение получено" : "Достижение еще не получено"}
              </div>
            )}
          </div>
          <button
            style={{
              marginTop: 23,
              fontSize: 16.5,
              background: "linear-gradient(98deg, #915ee5 0%, #FF731F 100%)",
              fontFamily: "'Montserrat', Arial, sans-serif",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              padding: "11px 0",
              width: "100%",
              boxShadow: "0 1px 9px #ecedfa40"
            }}
            onClick={e => {
              e.stopPropagation();
              setSelected(null);
            }}
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Анимация для модалки */}
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(140px); opacity: 0.6; }
            to   { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}