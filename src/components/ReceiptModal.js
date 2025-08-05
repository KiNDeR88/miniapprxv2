import React from "react";

export default function ReceiptModal({ tx, onClose }) {
  if (!tx || !tx.receipt) return null;
  const { receipt } = tx;
  return (
    <div className="congrats-modal" onClick={onClose} style={{
      position: "fixed", left: 0, top: 0, right: 0, bottom: 0, zIndex: 9999,
      background: "rgba(44,37,78,0.13)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div
        className="congrats-content"
        style={{
          minWidth: 240,
          maxWidth: 370,
          borderRadius: 20,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 8px 38px 0 rgba(68,62,103,0.14)",
          width: "96vw",
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Шапка */}
        <div style={{
          padding: "18px 16px 8px 16px",
          background: "#f8f5ff",
          borderBottom: "1.5px solid #ede9fa",
          position: "relative"
        }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#403688", marginBottom: 1 }}>
            Чек — {receipt.store}
          </div>
          <div style={{ fontSize: 13, color: "#aaa", fontWeight: 500 }}>
            {tx.date}, {receipt.time}
          </div>
          <button
            aria-label="Закрыть"
            style={{
              position: "absolute", top: 8, right: 8, background: "none", border: "none",
              fontSize: 24, color: "#915ee5", cursor: "pointer", lineHeight: 1, fontWeight: 700
            }}
            onClick={onClose}
          >×</button>
        </div>
        {/* Состав чека */}
        <div style={{ padding: "13px 16px 0 16px", flex: 1, overflowY: "auto" }}>
          <div style={{
            fontSize: 15, fontWeight: 800, color: "#403688", marginBottom: 8, lineHeight: 1.1
          }}>
            Состав заказа:
          </div>
          {receipt.items.map((item, idx) => (
            <div key={idx} style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              marginBottom: 6, fontSize: 15, fontWeight: 600
            }}>
              <span style={{ color: "#232345" }}>
                {item.name}
                <span style={{
                  fontWeight: 400, color: "#999", fontSize: 13, marginLeft: 7
                }}>×{item.qty}</span>
              </span>
              <span style={{ fontWeight: 800 }}>{item.price * item.qty} ₽</span>
            </div>
          ))}

          {/* Списано бонусов */}
          {receipt.bonusUsed > 0 && (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px 0 0 0",
              fontWeight: 700,
              color: "#EB5957",
              fontSize: 15
            }}>
              <span>Списано бонусов</span>
              <span>-{receipt.bonusUsed} баллов</span>
            </div>
          )}

          <div style={{
            borderTop: "1.5px solid #ede9fa",
            margin: "13px 0 8px 0"
          }} />

          {/* Итог */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontWeight: 800, fontSize: 17, color: "#403688", marginBottom: 3
          }}>
            <span>Итого</span>
            <span>
              {receipt.total} ₽
              {receipt.bonusUsed > 0 && (
                <span style={{
                  color: "#EB5957", fontWeight: 700, fontSize: 13, marginLeft: 8
                }}>
                  (часть бонусами)
                </span>
              )}
            </span>
          </div>
          <div style={{ color: "#aaa", fontSize: 12, marginTop: 5, fontWeight: 500 }}>
            Кассир: {receipt.cashier}
          </div>
          <button
            className="wheel-spin-btn"
            style={{
              marginTop: 18,
              fontSize: 15,
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