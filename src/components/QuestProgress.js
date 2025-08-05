import React from "react";

export default function QuestProgress({ quest }) {
  if (!quest) return null;
  return (
    <div style={{
      background: "#fafaff",
      padding: "1.1em 1em",
      borderRadius: 18,
      marginBottom: 20
    }}>
      <div style={{ fontWeight: 700, color: "#403688", fontSize: 18, marginBottom: 7 }}>
        Квест: {quest.title}
      </div>
      <div style={{ marginBottom: 5, color: "#666", fontSize: 15 }}>
        {quest.description}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{
          width: 42, height: 42, background: "#ece7ff", borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
        }}>🎯</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 600, color: "#2a2673", fontSize: 15
          }}>
            Прогресс: {quest.progress} из {quest.goal}
          </div>
          <div style={{
            marginTop: 4, color: "#888", fontSize: 15
          }}>
            {quest.status}
          </div>
        </div>
        {/* Прогресс-бар */}
        <div style={{
          width: 54, height: 8, background: "#e6e6e6", borderRadius: 5, marginLeft: 12, marginRight: 2, position: "relative", overflow: "hidden"
        }}>
          <div style={{
            width: `${Math.min(quest.progress / quest.goal * 100, 100)}%`,
            height: "100%", background: "#915ee5", borderRadius: 5, transition: "width .35s"
          }} />
        </div>
      </div>
    </div>
  );
}