import React, { useState, useRef, useEffect } from "react";
import { useAchievements } from "../context/AchievementsContext";

// --- ХУК СВАЙПА ВНИЗ ---
function useSwipeClose(open, onClose) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    let startY = null;
    function handleTouchStart(e) {
      if (e.touches.length === 1) startY = e.touches[0].clientY;
    }
    function handleTouchMove(e) {
      if (startY !== null && e.touches.length === 1) {
        const diff = e.touches[0].clientY - startY;
        if (diff > 70) {
          onClose();
          startY = null;
        }
      }
    }
    const node = modalRef.current;
    node?.addEventListener("touchstart", handleTouchStart);
    node?.addEventListener("touchmove", handleTouchMove);
    return () => {
      node?.removeEventListener("touchstart", handleTouchStart);
      node?.removeEventListener("touchmove", handleTouchMove);
    };
  }, [open, onClose]);
  return modalRef;
}

// --- Описание достижений и шагов ---
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

const TOUR_STEPS = [
  { key: "olympia", title: "Горная Олимпия", icon: "🏔️" },
  { key: "2320", title: "Высота 2320", icon: "🍽️" },
  { key: "plateau", title: "Роза Плато", icon: "🌲" }
];

// --- Модалка Кэшбэк-тур ---
function CashbackTourModal({ progressObj, onClose }) {
  const modalRef = useSwipeClose(true, onClose);
  const doneCount = TOUR_STEPS.filter(st => progressObj[st.key]).length;
  const progress = doneCount;
  const total = TOUR_STEPS.length;
  const allDone = progress >= total;

  return (
    <div className="modal-achievement"
      style={{
        position: "fixed",
        left: 0, right: 0, bottom: 0,
        zIndex: 1200,
        background: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        boxShadow: "0 -4px 24px #40368822",
        padding: "36px 18px 32px 18px",
        maxWidth: 480,
        margin: "0 auto",
        animation: "slideUp .23s cubic-bezier(.7,0,0,1)",
        willChange: "transform"
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        style={{}}
        onClick={e => e.stopPropagation()}
      >
        {/* Палка */}
        <div
          style={{
            width: 58, height: 8, background: "#ece7ff", borderRadius: 4,
            margin: "0 auto 26px auto"
          }}
        />
        {/* Иконка и заголовок */}
        <div style={{ textAlign: "center", marginBottom: 11 }}>
          <div style={{
            width: 66, height: 66, background: "#ece7ff",
            borderRadius: 19, display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 10px auto", fontSize: 36
          }}>
            🏔️
          </div>
          <div style={{
            fontWeight: 800, fontSize: 30, color: "#403688", marginBottom: 2, fontFamily: "'Montserrat', Arial, sans-serif"
          }}>
            Кэшбэк-тур
          </div>
          <div style={{
            fontWeight: 500, fontSize: 17, color: "#726da8", margin: "0 auto 10px auto", maxWidth: 400, lineHeight: 1.36
          }}>
            Совершите покупки в 3 разных точках курорта.<br />
            Покупки можно делать в разные дни.<br />
            Как только выполнишь — получи подарок!
          </div>
        </div>

        {/* Прогресс-бар */}
        <div style={{
          width: "100%",
          height: 10,
          background: "#ece7ff",
          borderRadius: 7,
          margin: "0 auto 11px auto",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${(progress / total) * 100}%`,
            height: "100%",
            background: "linear-gradient(95deg, #FF731F 10%, #915ee5 100%)",
            borderRadius: 7,
            transition: "width .3s"
          }} />
        </div>
        <div style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 17,
          color: "#403688",
          marginBottom: 18
        }}>
          Прогресс: {progress} из {total}
        </div>

        {/* Шаги */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          margin: "0 auto 22px auto", maxWidth: 370
        }}>
          {TOUR_STEPS.map((st, i) => (
            <React.Fragment key={st.key}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={{
                  width: 52, height: 52, margin: "0 auto 8px auto", borderRadius: 15,
                  background: progressObj[st.key] ? "#3dcd6c20" : "#ece7ff",
                  border: progressObj[st.key] ? "2.5px solid #3dcd6c" : "2px solid #ece7ff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, position: "relative"
                }}>
                  <span>{st.icon}</span>
                  {progressObj[st.key] &&
                    <span style={{
                      position: "absolute", right: 5, bottom: 5,
                      background: "#3dcd6c", color: "#fff", borderRadius: "50%",
                      width: 18, height: 18, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 5px #d2f0e6"
                    }}>✔</span>
                  }
                </div>
                <div style={{
                  color: "#403688", fontWeight: 600, fontSize: 14, marginBottom: 2
                }}>{st.title}</div>
              </div>
              {/* Разделитель между шагами */}
              {i < TOUR_STEPS.length - 1 && (
                <div style={{ flex: 0, width: 36, height: 3, background: "#ece7ff", borderRadius: 2, margin: "0 3px" }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Кнопка */}
        <button
          disabled={!allDone}
          style={{
            marginTop: 18,
            width: "100%",
            fontWeight: 700,
            fontSize: 25,
            padding: "16px 0 13px 0",
            border: "none",
            borderRadius: 22,
            background: allDone
              ? "linear-gradient(94deg, #9B59FF 0%, #FF731F 110%)"
              : "#ece7ff",
            color: allDone ? "#fff" : "#a6a4bc",
            cursor: allDone ? "pointer" : "not-allowed",
            boxShadow: allDone ? "0 1px 9px #ecedfa40" : "none",
            transition: "all .18s"
          }}
          onClick={e => {
            e.stopPropagation();
            if (allDone) alert("Кэшбэк забран!");
          }}
        >
          Забрать кэшбэк
        </button>
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(140px); opacity: 0.6; }
              to   { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
}

// --- ОСНОВНОЙ КОМПОНЕНТ ---
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

      {/* Модалка Кэшбэк-тур */}
      {selected && selected.key === "cashback-tour" && (
        <CashbackTourModal progressObj={progress} onClose={() => setSelected(null)} />
      )}
      {/* Модалка для других достижений */}
      {selected && selected.key !== "cashback-tour" && (
        <OtherAchievementModal selected={selected} onClose={() => setSelected(null)} />
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

// --- Модалка для обычных достижений со свайпом ---
function OtherAchievementModal({ selected, onClose }) {
  const modalRef = useSwipeClose(true, onClose);

  return (
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
      onClick={onClose}
    >
      <div
        ref={modalRef}
        style={{}}
        onClick={e => e.stopPropagation()}
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
        <div style={{ marginTop: 15 }}>
          <div style={{
            fontWeight: 400,
            color: selected.achieved ? "#23c27c" : "#726da8",
            fontSize: 15
          }}>
            {selected.achieved ? "Достижение получено" : "Достижение еще не получено"}
          </div>
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
            onClose();
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}