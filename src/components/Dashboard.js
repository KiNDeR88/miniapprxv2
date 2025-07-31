import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const SHOP_URL = "https://shop.rosaski.com/";

export default function Dashboard() {
  // Мок-данные пользователя
  const user = {
    name: "Иван Иванов",
    phone: "79991234567",
    avatar: "/avatar-demo.png"
  };
  // Мок-баланс
  const balance = { bonus: 2350 };
  // Мок-история операций
  const history = [
    { id: "1", date: "2024-07-01", description: "Покупка в ресторане", amount: 100 },
    { id: "2", date: "2024-06-30", description: "Начисление за регистрацию", amount: 50 },
    { id: "3", date: "2024-06-27", description: "Потрачено в интернет-магазине", amount: -300 }
  ];
  // Мок-квест
  const quest = {
    title: "Купи в 3-х разных локациях",
    progress: 2,
    goal: 3,
    status: "В ожидании"
  };

  // Для модалок
  const [showQR, setShowQR] = useState(false);
  const [showShop, setShowShop] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      paddingBottom: 86,
      position: "relative",
      zIndex: 1
    }}>
      {/* Шапка */}
      <header className="header">
        <img src="/logo.svg" alt="Роза Хутор" className="logo-rk" />
        <div style={{
          fontWeight: 700,
          fontSize: 28,
          color: "#050F58",
          letterSpacing: ".01em"
        }}>
          Роза Хутор
        </div>
      </header>

      <main style={{ maxWidth: 430, margin: "0 auto", padding: "1rem" }}>
        {/* Карточка профиля */}
        <div className="card" style={{ margin: "22px 0 18px 0", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={user.avatar}
              alt="avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                border: "2.5px solid #915ee5"
              }}
            />
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: 21,
                color: "#050F58",
                fontFamily: "'Montserrat', Arial, sans-serif"
              }}>
                {user.name}
              </div>
              <div style={{
                fontWeight: 500,
                color: "#1c6dd0",
                fontFamily: "'Montserrat', Arial, sans-serif"
              }}>
                Телефон: {user.phone}
              </div>
            </div>
          </div>
          <div style={{
            margin: "14px 0 0 0",
            color: "#050F58",
            fontWeight: 700,
            fontSize: 16
          }}>
            Баланс: {balance.bonus} баллов
          </div>
          <div className="dashboard-actions" style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button
              className="btn-main"
              style={{
                background: "linear-gradient(98deg, #915ee5 0%, #FF731F 130%)"
              }}
              onClick={() => setShowQR(true)}
            >
              QR-код
            </button>
            <button
              className="btn-main"
              style={{
                background: "#FF731F"
              }}
              onClick={() => setShowShop(true)}
            >
              Потратить баллы
            </button>
          </div>
        </div>

        {/* Квест */}
        {quest && (
          <div className="card" style={{ marginBottom: 18, background: "#fafaff" }}>
            <div style={{
              fontWeight: 700,
              color: "#403688",
              fontSize: 18,
              marginBottom: 7
            }}>
              Квест: {quest.title}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 48, height: 48, background: "#ece7ff", borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
              }}>🎯</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 600,
                  color: "#2a2673",
                  fontSize: 15
                }}>
                  Прогресс: {quest.progress} из {quest.goal}
                </div>
                <div style={{
                  marginTop: 4,
                  color: "#888"
                }}>
                  {quest.status}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* История операций */}
        <div className="card" style={{ background: "#fff" }}>
          <div style={{
            fontWeight: 700,
            color: "#050F58",
            fontSize: 18,
            marginBottom: 7
          }}>
            Последние операции
          </div>
          {history.length === 0 && <div style={{color:"#888",margin:"1.1em 0"}}>Нет операций</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
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
                  fontSize: 15
                }}
              >
                <span style={{ flex: 1 }}>
                  {tx.description} <span style={{color:"#888",fontSize:13}}>({tx.date})</span>
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
        </div>
      </main>

      {/* Модалка с QR-кодом */}
      {showQR && (
        <div className="congrats-modal" onClick={() => setShowQR(false)}>
          <div
            className="congrats-content"
            style={{ minWidth: 240, padding: "2.2rem 1.3rem" }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                marginBottom: 14,
                fontWeight: 700,
                fontSize: 23,
                color: "#050F58",
                fontFamily: "'Montserrat', Arial, sans-serif"
              }}
            >
              Ваш QR-код гостя
            </div>
            <QRCodeSVG value={user.phone} size={160} bgColor="#fff" fgColor="#050f58" />
            <div style={{ marginTop: 16, color: "#888", fontSize: 16 }}>
              Покажите этот QR на кассе для начисления баллов
            </div>
            <button
              className="wheel-spin-btn"
              style={{
                marginTop: 18,
                fontSize: 17,
                background: "linear-gradient(98deg, #915ee5 0%, #FF731F 100%)",
                fontFamily: "'Montserrat', Arial, sans-serif"
              }}
              onClick={() => setShowQR(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Модалка интернет-магазина */}
      {showShop && (
        <div className="congrats-modal" onClick={() => setShowShop(false)}>
          <div
            className="congrats-content"
            style={{
              minWidth: 300,
              width: "94vw",
              maxWidth: 540,
              padding: 0,
              borderRadius: 24,
              background: "#fff",
              overflow: "hidden",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              background: "#f8f7fd"
            }}>
              <div style={{ fontWeight: 700, color: "#403688", fontSize: 19 }}>
                Интернет-магазин
              </div>
              <button
                className="wheel-spin-btn"
                style={{
                  background: "none",
                  color: "#915ee5",
                  fontWeight: 700,
                  fontSize: 19,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', Arial, sans-serif"
                }}
                onClick={() => setShowShop(false)}
              >
                ×
              </button>
            </div>
            <iframe
              src={SHOP_URL}
              title="Интернет-магазин Роза Хутор"
              style={{
                border: "none",
                width: "100%",
                height: "70vh",
                background: "#fff"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}