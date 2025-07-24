import React, { useState } from "react";

// Описания сегментов (можно менять любые значения)
const segments = [
  { label: "50 баллов", icon: "🎉", color: "#e0d1ff" },
  { label: "100 баллов", icon: "💎", color: "#ffebef" },
  { label: "Пусто", icon: "🙈", color: "#e0d1ff" },
  { label: "Приз!", icon: "🎁", color: "#ffebef" },
  { label: "25 баллов", icon: "🌟", color: "#e0d1ff" },
  { label: "150 баллов", icon: "🏆", color: "#ffebef" },
];

const size = 260; // Диаметр SVG
const center = size / 2;
const radius = size / 2 - 6;

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

// Конфетти-компонент
function Confetti({show = false}) {
  if (!show) return null;
  const pieces = Array.from({length: 22});
  return (
    <div className="confetti-box">
      {pieces.map((_, i) => {
        const left = 8 + Math.random() * 84; // %
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

export default function WheelOfFortunePie() {
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState(0);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setSelected(null);

    const segmentCount = segments.length;
    const prize = Math.floor(Math.random() * segmentCount);
    const turns = 5 + Math.random() * 1.5;
    const angle = 360 / segmentCount;
    const finalRotation = 360 * turns - prize * angle - angle / 2;

    setRotation(finalRotation);

    setTimeout(() => {
      setSelected(prize);
      setSpinning(false);
    }, 2600);
  }

  const sectorAngle = 360 / segments.length;

  return (
    <div className="wheel-container" style={{ position: "relative" }}>
      <Confetti show={selected !== null} />
      <div style={{ position: "relative", display: "inline-block" }}>
        <svg
          width={size}
          height={size}
          style={{
            transition: "transform 2.3s cubic-bezier(.33,.74,.33,1)",
            transform: `rotate(${rotation}deg)`,
            display: "block",
            margin: "0 auto"
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

            return (
              <g key={i}>
                <path
                  d={getArcPath(start, end)}
                  fill={seg.color}
                  stroke="#e0d1ff"
                  strokeWidth="3"
                  className={isWin ? "win-sector" : ""}
                  style={{
                    opacity: isWin ? 1 : 0.95,
                    transition: "filter .2s"
                  }}
                />
                <text
                  x={textX}
                  y={textY - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="28"
                  className={isWin ? "win-icon" : ""}
                  style={{
                    userSelect: "none"
                  }}
                >
                  {seg.icon}
                </text>
                <text
                  x={textX}
                  y={textY + 18}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fill="#624aa1"
                  className={isWin ? "win-sector" : ""}
                  style={{
                    fontWeight: isWin ? 700 : 500,
                    userSelect: "none"
                  }}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
          {/* Кружок в центре */}
          <circle cx={center} cy={center} r={34} fill="#fff" stroke="#e0d1ff" strokeWidth={2} />
        </svg>
        <div className="wheel-pointer-pie">▲</div>
      </div>
      <button className="wheel-spin-btn" onClick={spin} disabled={spinning}>
        {spinning ? "Крутим..." : "Крутить колесо"}
      </button>
      {selected !== null && (
        <div className="wheel-result" style={{ marginTop: 18 }}>
          Ваш приз: <b style={{ fontSize: 21 }}>{segments[selected].icon} {segments[selected].label}</b>
        </div>
      )}
    </div>
  );
}