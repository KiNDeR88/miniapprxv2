import React, { useState, useEffect } from "react";

// Цвета бренда
const BRAND_DARK = "#050F58";
const BRAND_ORANGE = "#FF731F";
const BRAND_PURPLE = "#e0d1ff";

// Сегменты
const segments = [
  { label: "50 баллов", icon: "🎉", color: "#e0d1ff" },
  { label: "100 баллов", icon: "💎", color: "#ffebef" },
  { label: "Пусто", icon: "🙈", color: "#e0d1ff" },
  { label: "Приз!", icon: "🎁", color: "#ffebef" },
  { label: "25 баллов", icon: "🌟", color: "#e0d1ff" },
  { label: "150 баллов", icon: "🏆", color: "#ffebef" },
];

const size = 240; // диаметр SVG
const center = size / 2;
const radius = size / 2 - 6;
const pointerWidth = 38, pointerHeight = 28;
const MAX_SPINS_PER_DAY = 3;
const confettiColors = [
  "#ff9ea8", "#62a3ff", "#ffe071", "#e0d1ff", "#95e3c3", "#624aa1"
];

function getArcPath(startAngle, endAngle, r = radius) {
  const a0 = (Math.PI / 180) * startAngle;
  const a1 = (Math.PI / 180) * endAngle;
  const x0 = center + r * Math.cos(a0);
  const y0 = center + r * Math.sin(a0);
  const x1 = center + r * Math.cos(a1);
  const y1 = center + r * Math.sin(a1);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${center} ${center}`,
    `L ${x0} ${y0}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}`,
    `Z`
  ].join(' ');
}

function Confetti({show = false}) {
  if (!show) return null;
  const pieces = Array.from({length: 22});
  return (
    <div className="confetti-box">
      {pieces.map((_, i) => {
        const left = 8 + Math.random() * 84;
        const duration = 1.6 + Math.random() * 0.7;
        const delay = Math.random() * 0.6;
        const color = confettiColors[i % confettiColors.length];
        const rotate = Math.random() * 360;
        const size = 8 + Math.random() * 8;
        return (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${left}%`,
              background: color,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              transform: `rotate(${rotate}deg)`,
              width: size,
              height: size * (0.45 + Math.random() * 0.8)
            }}
          />
        );
      })}
    </div>
  );
}

const getUserName = () =>
  window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ||
  window?.Telegram?.WebApp?.initDataUnsafe?.user?.username ||
  "Гость";
const getUserAvatar = () =>
  window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url || null;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function WheelOfFortunePiePlus() {
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(MAX_SPINS_PER_DAY);
  const [lastSpin, setLastSpin] = useState(null);
  const [prizes, setPrizes] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const todayKey = getTodayKey();
    const spins = Number(localStorage.getItem("spinsLeft_" + todayKey)) || MAX_SPINS_PER_DAY;
    setSpinsLeft(spins);

    const last = localStorage.getItem("lastSpin_" + todayKey);
    setLastSpin(last ? Number(last) : null);

    const prizeData = JSON.parse(localStorage.getItem("prizes") || "[]");
    setPrizes(prizeData);

    const achData = JSON.parse(localStorage.getItem("achievements") || "[]");
    setAchievements(achData);
  }, []);

  useEffect(() => {
    const todayKey = getTodayKey();
    localStorage.setItem("spinsLeft_" + todayKey, spinsLeft);
    if (lastSpin !== null) localStorage.setItem("lastSpin_" + todayKey, lastSpin);
    localStorage.setItem("prizes", JSON.stringify(prizes));
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [spinsLeft, lastSpin, prizes, achievements]);

  // Таймер до следующей попытки
  const [timer, setTimer] = useState("");
  useEffect(() => {
    if (spinsLeft > 0) return;
    const updateTimer = () => {
      const now = new Date();
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
      const diff = Math.max(0, nextDay - now);
      const h = String(Math.floor(diff / 3.6e6)).padStart(2, '0');
      const m = String(Math.floor((diff % 3.6e6) / 6e4)).padStart(2, '0');
      const s = String(Math.floor((diff % 6e4) / 1000)).padStart(2, '0');
      setTimer(`${h}:${m}:${s}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [spinsLeft]);

  // Теперь pointerAngle = 90, а формула + angle/2 (НОСИК ВВЕРХ!)
  function spin() {
    if (spinning || spinsLeft < 1) return;
    setSpinning(true);
    setSelected(null);

    if (window.navigator?.vibrate) window.navigator.vibrate([60, 30, 100]);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }

    const segmentCount = segments.length;
    const prize = Math.floor(Math.random() * segmentCount);
    const turns = 5 + Math.random() * 1.5;
    const angle = 360 / segmentCount;
    const pointerAngle = 90; // pointer снизу, носик вверх

    // ВНИМАНИЕ: теперь ПЛЮС angle / 2
    const finalRotation = 360 * turns + pointerAngle - prize * angle + angle / 2;

    setRotation(finalRotation);

    setTimeout(() => {
      setSelected(prize);
      setSpinning(false);
      setShowCongrats(true);

      setPrizes(prev => [...prev, { idx: prize, ts: Date.now() }]);
      setSpinsLeft(prev => prev - 1);
      setLastSpin(Date.now());

      let ach = [];
      if (prizes.length + 1 >= 5 && !achievements.includes("gamer")) ach.push("gamer");
      if (
        prizes.length > 1 &&
        prizes.slice(-2).every(p => p.idx !== 2) &&
        prize !== 2 &&
        !achievements.includes("streak")
      )
        ach.push("streak");
      if (ach.length) setAchievements(prev => [...prev, ...ach]);
    }, 2600);
  }

  const rarePrizes = prizes.filter(p => p.idx === 3).length;
  const userName = getUserName();
  const userAvatar = getUserAvatar();
  const sectorAngle = 360 / segments.length;

  return (
    <div
      className="wheel-container"
      style={{
        background: "#fff",
        borderRadius: 32,
        boxShadow: "0 4px 16px #050F5810",
        padding: "22px 12px 12px 12px",
        maxWidth: 420,
        margin: "26px auto",
        border: `2px solid ${BRAND_PURPLE}`,
        fontFamily: "'Montserrat', 'Arial', 'Helvetica', sans-serif",
      }}
    >
      <Confetti show={showCongrats} />
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        {userAvatar && (
          <img
            src={userAvatar}
            alt="avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `2.5px solid ${BRAND_PURPLE}`,
              marginBottom: 6,
            }}
          />
        )}
        <div
          style={{
            fontWeight: 700,
            fontSize: 28,
            color: BRAND_DARK,
            margin: userAvatar ? "0 0 2px 0" : "0",
            fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
          }}
        >
          Привет, {userName}!
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 21,
            color: "#8f6ae0",
            margin: "2px 0 0 0",
            letterSpacing: ".01em",
          }}
        >
          Попыток сегодня: {spinsLeft}
        </div>
        {spinsLeft === 0 && (
          <span style={{ color: "#fa8383", fontWeight: 500, fontSize: 17, marginLeft: 8 }}>
            До обновления: {timer}
          </span>
        )}
      </div>

      {/* --- Колесо с pointer --- */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size + pointerHeight,
          margin: "18px auto 0 auto",
        }}
      >
        {/* Колесо */}
        <svg
          width={size}
          height={size}
          style={{
            transition: "transform 2.3s cubic-bezier(.33,.74,.33,1)",
            transform: `rotate(${rotation}deg)`,
            display: "block",
            margin: "0 auto",
          }}
        >
          {segments.map((seg, i) => {
            const start = i * sectorAngle - 90;
            const end = (i + 1) * sectorAngle - 90;
            const mid = (start + end) / 2;
            const isWin = selected === i;
            const textRadius = radius * 0.68;
            const textX = center + textRadius * Math.cos((Math.PI / 180) * mid);
            const textY = center + textRadius * Math.sin((Math.PI / 180) * mid);

            const lines = seg.label.split(' ');
            const iconY = textY - (lines.length === 2 ? 15 : 9);
            const labelY = textY + (lines.length === 2 ? 2 : 7);

            return (
              <g key={i}>
                <path
                  d={getArcPath(start, end)}
                  fill={seg.color}
                  stroke={BRAND_PURPLE}
                  strokeWidth="2.5"
                  className={isWin ? "win-sector" : ""}
                  style={{
                    opacity: isWin ? 1 : 0.94,
                    transition: "filter .2s",
                  }}
                />
                {/* Emoji */}
                <text
                  x={textX}
                  y={iconY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="23"
                  className={isWin ? "win-icon" : ""}
                  style={{
                    userSelect: "none",
                    fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
                  }}
                >
                  {seg.icon}
                </text>
                {/* Многострочный текст */}
                <text
                  x={textX}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="13"
                  fill={BRAND_DARK}
                  style={{
                    fontWeight: isWin ? 700 : 500,
                    userSelect: "none",
                    fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
                  }}
                >
                  {lines.map((line, idx) => (
                    <tspan x={textX} dy={idx === 0 ? 0 : 13} key={idx}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
          {/* Центр колеса - маленький круг */}
          <circle cx={center} cy={center} r={22} fill="#fff" stroke={BRAND_PURPLE} strokeWidth={2} />
        </svg>

        {/* POINTER — снизу, носик вверх, заходит на половину */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: `${size - pointerHeight / 2}px`,
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <svg width={pointerWidth} height={pointerHeight} viewBox={`0 0 ${pointerWidth} ${pointerHeight}`}>
            {/* Носик вверх */}
            <polygon points={`${pointerWidth/2},0 0,${pointerHeight} ${pointerWidth},${pointerHeight}`} fill={BRAND_ORANGE} />
          </svg>
        </div>
      </div>

      <button
        className="wheel-spin-btn"
        style={{
          margin: "28px 0 0 0",
          background: BRAND_DARK,
          color: "#fff",
          fontWeight: 700,
          fontSize: 19,
          borderRadius: 16,
          fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
        }}
        onClick={spin}
        disabled={spinning || spinsLeft === 0}
      >
        {spinning ? "Крутим..." : spinsLeft === 0 ? "Попытки закончились" : "Крутить колесо"}
      </button>

      {/* Поздравление */}
      {showCongrats && selected !== null && (
        <div className="congrats-modal" onClick={() => setShowCongrats(false)}>
          <div className="congrats-content" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 54 }}>{segments[selected].icon}</div>
            <div style={{ fontWeight: 700, fontSize: 27, margin: "12px 0", color: BRAND_DARK }}>
              Поздравляем!
            </div>
            <div style={{ fontSize: 19 }}>
              Вы выиграли <b>{segments[selected].label}</b>
            </div>
            <button
              className="wheel-spin-btn"
              style={{
                marginTop: 18,
                background: BRAND_ORANGE,
                fontSize: 18,
              }}
              onClick={() => setShowCongrats(false)}
            >
              Забрать приз
            </button>
          </div>
        </div>
      )}

      {/* Коллекция призов */}
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div
          style={{
            fontWeight: 700,
            color: BRAND_DARK,
            fontSize: 20,
            marginBottom: 8,
            fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
          }}
        >
          Мои призы:
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 7,
            marginBottom: 12,
          }}
        >
          {prizes.length === 0 ? (
            <span style={{ color: "#bbb" }}>Нет призов</span>
          ) : (
            prizes.map((p, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  padding: "8px 11px",
                  borderRadius: 13,
                  background: "#f6f3ff",
                  color: BRAND_DARK,
                  fontWeight: 600,
                  fontSize: 16,
                  border: segments[p.idx].color + " 2px solid",
                  fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
                }}
              >
                {segments[p.idx].icon} {segments[p.idx].label}
              </span>
            ))
          )}
        </div>
        {rarePrizes > 0 && (
          <div style={{ color: BRAND_ORANGE, fontWeight: 600, fontSize: 17 }}>
            Вы получили {rarePrizes} супер-приз(а) 🎁!
          </div>
        )}
      </div>
      {/* Ачивки */}
      <div style={{ margin: "18px 0 10px 0", textAlign: "center" }}>
        <span style={{ fontSize: 15, color: "#888" }}>Достижения:</span>{" "}
        {achievements.includes("gamer") && (
          <span style={{ fontWeight: 600, color: "#7b39e4" }}>Опытный игрок 🏅</span>
        )}
        {achievements.includes("streak") && (
          <span style={{ fontWeight: 600, color: "#ea8547", marginLeft: 8 }}>Везунчик 🎲</span>
        )}
        {!achievements.length && <span style={{ color: "#bbb" }}>—</span>}
      </div>
    </div>
  );
}