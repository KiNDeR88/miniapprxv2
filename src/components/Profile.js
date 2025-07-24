import React from "react";

export default function Profile() {
  return (
    <div className="screen profile">
      <div className="profile-avatar">
        <img src="https://api.dicebear.com/8.x/adventurer/svg?seed=Alexey" width="96" alt="Аватар" />
      </div>
      <div className="profile-name">Алексей</div>
      <div className="profile-info">
        <div className="profile-row">
          <span className="profile-label">Телефон:</span> +7 912 123-45-67
        </div>
        <div className="profile-row">
          <span className="profile-label">Email:</span> alexey@example.com
        </div>
        <div className="profile-row">
          <span className="profile-label">Уровень:</span> Traveler (1250 баллов)
        </div>
      </div>
      <button className="profile-edit-btn">Редактировать профиль</button>
    </div>
  );
}