import React from "react";
export default function History() {
  return (
    <div style={{ maxWidth: 430, margin: "0 auto", padding: "1rem", minHeight: "85vh" }}>
      <div className="card">
        <div className="page-title">История операций</div>
        <div className="page-desc">Ваша активность:</div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:'#f8f5ff',borderRadius:14,padding:'13px 12px',display:'flex',alignItems:'center',gap:10}}>
            <span style={{ fontSize: 22 }}>⛷️</span>
            <span style={{ flex: 1 }}>Баллы за подъемник</span>
            <span style={{ color: "#23c27c", fontWeight: 700 }}>+150</span>
          </div>
          <div style={{background:'#fff4f4',borderRadius:14,padding:'13px 12px',display:'flex',alignItems:'center',gap:10}}>
            <span style={{ fontSize: 22 }}>🍰</span>
            <span style={{ flex: 1 }}>Потрачено в кафе</span>
            <span style={{ color: "#eb5957", fontWeight: 700 }}>-90</span>
          </div>
        </div>
      </div>
    </div>
  );
}