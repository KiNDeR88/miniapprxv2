import React from "react";

const history = [
  {
    id: 1,
    date: "2024-07-01",
    type: "Начисление",
    place: "Кафе Роза Плато",
    amount: 120,
    description: "Покупка на курорте"
  },
  {
    id: 2,
    date: "2024-06-30",
    type: "Списание",
    place: "Интернет-магазин",
    amount: -200,
    description: "Потрачено на мерч"
  },
  {
    id: 3,
    date: "2024-06-29",
    type: "Начисление",
    place: "Горная Олимпия",
    amount: 70,
    description: "Покупка сувениров"
  },
  {
    id: 4,
    date: "2024-06-28",
    type: "Начисление",
    place: "Трактир",
    amount: 40,
    description: "Кофе на вынос"
  }
];

export default function History() {
  return (
    <div style={{
      maxWidth: 430,
      margin: "0 auto",
      padding: "22px 10px 82px",
      background: "#f7f7fd",
      minHeight: "100vh"
    }}>
      <div className="card" style={{
        maxWidth: 420,
        margin: "18px auto",
        background: "#fff",
        borderRadius: 22,
        padding: "24px 10px 20px 10px",
        boxShadow: "0 2px 16px 0 rgba(145,94,229,0.07)"
      }}>
        <h2 style={{
          fontWeight: 800,
          color: "#403688",
          fontSize: 22,
          margin: "0 0 18px 8px",
          fontFamily: "'Montserrat', Arial, sans-serif"
        }}>История операций</h2>
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {history.map(tx => (
            <div
              key={tx.id}
              style={{
                borderRadius: 15,
                background: tx.amount > 0 ? "#f8f5ff" : "#fff4f4",
                padding: "16px 13px 14px 13px",
                display: "flex",
                flexDirection: "column",
                fontSize: 15,
                boxShadow: "0 0.5px 6px #e5e0ff28"
              }}
            >
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:2
              }}>
                <span style={{
                  fontWeight:700, color:"#050F58", fontSize:16, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis"
                }}>{tx.place}</span>
                <span style={{
                  color: tx.amount > 0 ? "#23c27c" : "#eb5957",
                  fontWeight: 800,
                  fontSize: 17,
                  letterSpacing: ".02em"
                }}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount}
                </span>
              </div>
              <div style={{color:"#888", fontSize:14, marginBottom:2}}>
                {tx.description}
              </div>
              <div style={{color:"#b3b3b3", fontSize:12}}>
                {tx.date} &nbsp;|&nbsp; {tx.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}