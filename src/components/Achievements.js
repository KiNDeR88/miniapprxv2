import React from "react";
import WheelOfFortune from "./WheelOfFortune";

export default function Achievements() {
  return (
    <div className="screen achievements">
      <h2>Достижения и геймификация</h2>
      <div className="achievements-list">
        <div className="achiev-card"><span>🥇</span> Новичок</div>
        <div className="achiev-card"><span>🎿</span> Активный лыжник</div>
        <div className="achiev-card"><span>🏅</span> Друзья</div>
        <div className="achiev-card"><span>🌄</span> Исследователь</div>
      </div>
      <h2 style={{ marginTop: 28 }}>Колесо удачи</h2>
      <WheelOfFortune />
    </div>
  );
}