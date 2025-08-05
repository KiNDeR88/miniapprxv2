import React, { useState } from "react";
import ReceiptModal from "./ReceiptModal";

export default function History({ history }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  return (
    <div style={{ padding: "20px 12px 80px 12px", maxWidth: 480, margin: "0 auto" }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 22,
        margin: "12px 0 22px 0",
        color: "#403688"
      }}>
        История операций
      </h2>
      {history.length === 0 && (
        <div style={{ color: "#888", margin: "2.3em 0" }}>Нет операций</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {history.map(tx => (
          <div
            key={tx.id || tx.date + tx.amount}
            style={{
              background: tx.amount > 0 ? "#f8f5ff" : "#fff4f4",
              borderRadius: 14,
              padding: "13px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 15,
              cursor: tx.receipt ? "pointer" : "default",
              opacity: tx.receipt ? 1 : 0.65
            }}
            onClick={() => tx.receipt && setSelectedReceipt(tx)}
          >
            <span style={{ flex: 1 }}>
              {tx.description}
              <span style={{ color: "#888", fontSize: 13 }}> ({tx.date})</span>
            </span>
            <span style={{
              color: tx.amount > 0 ? "#23c27c" : "#eb5957",
              fontWeight: 700
            }}>
              {tx.amount > 0 ? "+" : ""}{tx.amount}
            </span>
          </div>
        ))}
      </div>
      {/* Модалка состава чека — общая! */}
      <ReceiptModal tx={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
    </div>
  );
}