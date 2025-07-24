import React from "react";

const history = [
  { icon: "🎿", type: "Баллы за подъемник", date: "12.07.2025", points: "+150", className: "plus" },
  { icon: "🍰", type: "Потрачено в кафе", date: "11.07.2025", points: "-90", className: "minus" },
  { icon: "🎁", type: "Приз за колесо", date: "10.07.2025", points: "+50", className: "plus" }
];

export default function History() {
  return (
    <div className="screen history">
      <h2>История операций</h2>
      <div className="history-cards">
        {history.map((item, idx) => (
          <div key={idx} className={`history-card ${item.className}`}>
            <span className="history-icon">{item.icon}</span>
            <div>
              <div className="history-type">{item.type}</div>
              <div className="history-date">{item.date}</div>
            </div>
            <div className="history-points">{item.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}