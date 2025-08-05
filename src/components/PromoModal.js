import React from "react";

export default function PromoModal({ promo, onClose }) {
  if (!promo) return null;
  return (
    <div className="congrats-modal" onClick={onClose} style={{
      position: "fixed", left: 0, top: 0, right: 0, bottom: 0, zIndex: 9999,
      background: "rgba(44,37,78,0.14)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div
        className="congrats-content"
        style={{
          minWidth: 240,
          maxWidth: 370,
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 8px 38px 0 rgba(68,62,103,0.11)",
          width: "96vw",
          maxHeight: "93vh",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Картинка промо */}
        <div style={{
          background: "#f8f5ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 0, height: 120, borderTopLeftRadius: 20, borderTopRightRadius: 20
        }}>
          <img
            src={promo.img}
            alt={promo.title}
            style={{
              maxHeight: 110,
              width: "auto",
              maxWidth: "96%",
              objectFit: "cover",
              borderRadius: 14
            }}
          />
        </div>
        <div style={{ padding: "18px 18px 0 18px", flex: 1, overflowY: "auto" }}>
          <div style={{
            fontWeight: 800,
            color: "#403688",
            fontSize: 20,
            marginBottom: 8
          }}>
            {promo.title}
          </div>
          <div style={{
            fontSize: 15,
            color: "#444",
            marginBottom: 10,
            lineHeight: 1.4
          }}>
            {promo.desc}
          </div>
          <button
            className="wheel-spin-btn"
            style={{
              marginTop: 16,
              fontSize: 16,
              background: "linear-gradient(98deg, #915ee5 0%, #FF731F 100%)",
              fontFamily: "'Montserrat', Arial, sans-serif",
              width: "100%",
              fontWeight: 800,
              borderRadius: 14,
              minHeight: 44,
              color: "#fff"
            }}
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}