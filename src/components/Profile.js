import React from "react";

export default function Profile() {
  // Получение данных из Telegram WebApp API
  const tgUser =
    window?.Telegram?.WebApp?.initDataUnsafe?.user || null;
  const avatarUrl = tgUser?.photo_url || "/avatar-demo.png";
  const name =
    (tgUser?.first_name || "Гость") +
    (tgUser?.last_name ? " " + tgUser.last_name : "");

  // Пример остальных пользовательских данных (можно заменить на реальные)
  const user = {
    level: "Traveler",
    levelProgress: 70,
    bonuses: 1560,
    id: tgUser?.id ? `TG-${tgUser.id}` : "RK-123456"
  };

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        padding: "1rem",
        minHeight: "85vh"
      }}
    >
      <div
        className="card"
        style={{
          marginTop: 22,
          background: "linear-gradient(114deg, #f6f3ff 0%, #e6eaf8 100%)",
          boxShadow: "0 4px 22px 0 #915ee515",
          borderRadius: 32,
          padding: "2.2rem 1.2rem 1.1rem 1.2rem",
          textAlign: "center"
        }}
      >
        <img
          src={avatarUrl}
          alt="Профиль"
          style={{
            width: 82,
            height: 82,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid var(--rk-purple)",
            marginBottom: 8,
            background: "#f3edfa"
          }}
        />
        <div
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "var(--rk-dark)",
            marginBottom: 5
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "var(--rk-blue)",
            fontWeight: 500,
            marginBottom: 11
          }}
        >
          Уровень: {user.level}
        </div>

        {/* Прогресс уровня */}
        <div
          style={{
            background: "#efe7fa",
            borderRadius: 8,
            height: 8,
            width: "84%",
            margin: "0 auto 10px auto",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: user.levelProgress + "%",
              height: "100%",
              borderRadius: 8,
              background: "linear-gradient(90deg, #ff731f 0%, #915ee5 100%)",
              transition: "width .3s"
            }}
          />
        </div>
        <div
          style={{
            color: "#888",
            fontSize: 14,
            marginBottom: 11
          }}
        >
          До следующего уровня: <b>{100 - user.levelProgress}%</b>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            margin: "20px 0 10px 0"
          }}
        >
          <div>
            <div
              style={{
                color: "#aaa",
                fontWeight: 500,
                fontSize: 14,
                marginBottom: 1
              }}
            >
              ID гостя
            </div>
            <div
              style={{
                color: "var(--rk-dark)",
                fontWeight: 600,
                fontSize: 16
              }}
            >
              {user.id}
            </div>
          </div>
          <div>
            <div
              style={{
                color: "#aaa",
                fontWeight: 500,
                fontSize: 14,
                marginBottom: 1
              }}
            >
              Бонусы
            </div>
            <div
              style={{
                color: "#23c27c",
                fontWeight: 700,
                fontSize: 17
              }}
            >
              {user.bonuses} баллов
            </div>
          </div>
        </div>

        {/* Можно добавить быстрые действия */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 18
          }}
        >
          <a
            href="#achievements"
            className="btn-main"
            style={{
              background: "var(--rk-gradient)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 13,
              fontSize: 16,
              padding: "10px 20px",
              textDecoration: "none"
            }}
          >
            Мои достижения
          </a>
          <a
            href="#prizes"
            className="btn-main"
            style={{
              background: "linear-gradient(92deg, #ff731f 0%, #915ee5 100%)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 13,
              fontSize: 16,
              padding: "10px 20px",
              textDecoration: "none"
            }}
          >
            Мои призы
          </a>
        </div>
      </div>
    </div>
  );
}