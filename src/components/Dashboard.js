import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import WheelOfFortune from "./WheelOfFortune";

const USER_ID = "ROZA-987654321";

export default function Dashboard({ onNav }) {
  const [showQR, setShowQR] = useState(false);
  // swipe state для bottom sheet:
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const dragging = useRef(false);

  function onTouchStart(e) {
    if (e.touches && e.touches[0]) {
      dragging.current = true;
      startY.current = e.touches[0].clientY;
      setDragY(0);
    }
  }
  function onTouchMove(e) {
    if (!dragging.current) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) setDragY(delta);
  }
  function onTouchEnd() {
    dragging.current = false;
    if (dragY > 80) {
      setShowQR(false);
    } else {
      setDragY(0);
    }
  }

  return (
    <div className="screen dashboard">
      <div className="level-section">
        <div className="level-badge">🌄</div>
        <div>
          <div className="level-title">Ваш уровень</div>
          <div className="level-value">
            <b>Traveler</b> — 1&nbsp;250 баллов
          </div>
          <div className="level-progressbar">
            <div className="level-progressbar-fill" style={{ width: "70%" }} />
          </div>
          <div className="level-next">До следующего: 250 баллов</div>
        </div>
      </div>

      <div className="action-grid">
        <button className="action-btn accent" onClick={() => setShowQR(true)}>
          Начислить баллы
        </button>
        <button className="action-btn">Потратить баллы</button>
        <button className="action-btn" onClick={() => onNav && onNav("invite")}>
          Пригласить друга
        </button>
        <button className="action-btn" onClick={() => onNav && onNav("achievements")}>
          Мои награды
        </button>
      </div>

      <div className="history-title">Последние операции</div>
      <div className="history-cards">
        <div className="history-card plus">
          <span className="history-icon">🎿</span>
          <div>
            <div className="history-type">Баллы за подъемник</div>
            <div className="history-date">12.07.2025</div>
          </div>
          <div className="history-points">+150</div>
        </div>
        <div className="history-card minus">
          <span className="history-icon">🍰</span>
          <div>
            <div className="history-type">Потрачено в кафе</div>
            <div className="history-date">11.07.2025</div>
          </div>
          <div className="history-points">-90</div>
        </div>
      </div>

      {/* Колесо удачи на главном экране */}
      <h2 style={{ margin: "34px 0 14px 0", color: "#8f6ae0" }}>Колесо удачи</h2>
      <WheelOfFortune />

      {showQR && (
        <div className="bottom-sheet-overlay" onClick={() => setShowQR(false)}>
          <div
            className="bottom-sheet"
            style={{
              transform: `translateY(${dragY}px)`,
              transition: dragging.current ? "none" : "transform 0.38s cubic-bezier(.42,0,.48,1.08)",
            }}
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            tabIndex={-1}
          >
            <div className="sheet-drag-bar" />
            <h3>Ваш QR для начисления баллов</h3>
            <QRCodeSVG value={USER_ID} size={160} />
            <div className="qr-code-value">{USER_ID}</div>
            <div className="modal-desc">
              Покажите этот код кассиру для начисления бонусов.
            </div>
            <button className="modal-close" onClick={() => setShowQR(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}