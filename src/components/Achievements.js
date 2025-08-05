import React, { useState, useEffect } from "react";

const quests = [
  {
    id: 1,
    title: "Купи в 3-х локациях",
    emoji: "🎯",
    progress: 2,
    goal: 3,
    status: "Выполняется",
    reward: "+100 баллов"
  },
  {
    id: 2,
    title: "Первая покупка на курорте",
    emoji: "🎉",
    progress: 1,
    goal: 1,
    status: "Выполнено",
    reward: "+50 баллов"
  },
  {
    id: 3,
    title: "Потрать 500 баллов",
    emoji: "💸",
    progress: 0,
    goal: 1,
    status: "Ожидает",
    reward: "Сувенир"
  }
];

export default function Achievements() {
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
        padding: "24px 10px 18px 10px",
        boxShadow: "0 2px 16px 0 rgba(145,94,229,0.07)",
      }}>
        <h2 style={{
          fontWeight: 800,
          color: "#403688",
          fontSize: 22,
          margin: "0 0 18px 8px",
          fontFamily: "'Montserrat', Arial, sans-serif"
        }}>Достижения и квесты</h2>
        <div style={{display:"flex", flexDirection:"column", gap:18}}>
          {quests.map(q => (
            <div key={q.id}
                 style={{
                   display:"flex",
                   alignItems:"center",
                   borderRadius:18,
                   background: "#f8f5ff",
                   padding: "16px 14px 16px 13px",
                   boxShadow: q.status==="Выполнено" ? "0 0 0 2px #23c27c2c" : undefined,
                   position: "relative"
                 }}>
              {/* Emoji-иконка */}
              <div style={{
                fontSize: 33,
                marginRight: 14,
                background: "#fff",
                borderRadius: "50%",
                width: 49,
                height: 49,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2.5px solid #ece7ff",
                boxShadow: "0 1px 6px #e5e0ff44"
              }}>
                {q.emoji}
              </div>
              {/* Инфо по квесту */}
              <div style={{flex:1, minWidth:0}}>
                <div style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#403688",
                  marginBottom: 1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap"
                }}>{q.title}</div>
                <div style={{fontSize:13, color:"#666", marginBottom:7}}>
                  {q.progress < q.goal
                    ? `Прогресс: ${q.progress} из ${q.goal}`
                    : <span style={{color:"#23c27c",fontWeight:700}}>Выполнено!</span>}
                </div>
                {/* Прогресс-бар */}
                <div style={{
                  height: 8,
                  width: "98%",
                  background: "#ece7ff",
                  borderRadius: 5,
                  overflow: "hidden",
                  marginBottom: 4
                }}>
                  <div style={{
                    width: `${Math.min(q.progress / q.goal * 100, 100)}%`,
                    height: "100%",
                    background: q.progress === q.goal ? "#23c27c" : "#915ee5",
                    transition: "width .3s"
                  }} />
                </div>
                <div style={{fontSize:13, color:"#b3b3b3"}}>
                  {q.status} {q.reward && `| Награда: ${q.reward}`}
                </div>
              </div>
              {/* Бейдж "Выполнено" */}
              {q.status==="Выполнено" &&
                <span style={{
                  background:"#23c27c",
                  color:"#fff",
                  fontWeight:600,
                  borderRadius:13,
                  fontSize:13,
                  padding:"4px 13px",
                  marginLeft:10,
                  position: "absolute",
                  top: 16,
                  right: 20,
                  boxShadow: "0 1.5px 7px #23c27c22"
                }}>Готово</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}