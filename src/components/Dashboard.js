import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import ReceiptModal from "./ReceiptModal";
import PromoModal from "./PromoModal";

// Промо-акции
const promotions = [
  {
    img: process.env.PUBLIC_URL + "/promo-1.jpg",
    title: "Главная акция июля",
    desc: "Получите 500 баллов при первой покупке на Роза Плато!"
  },
  {
    img: process.env.PUBLIC_URL + "/promo-2.jpg",
    title: "Бонус за регистрацию",
    desc: "Зарегистрируйтесь в приложении и получите 100 бонусов."
  },
  {
    img: process.env.PUBLIC_URL + "/promo-3.jpg",
    title: "Розыгрыш призов",
    desc: "Совершите покупки в 3-х точках и участвуйте в розыгрыше!"
  }
];

const SHOP_URL = "https://shop.rosaski.com/";

// --- QRModal как отдельный компонент ---
function QRModal({ user, open, onClose }) {
  const modalRef = useRef(null);

  // Swipe-вниз для закрытия на мобильных
  useEffect(() => {
    if (!open) return;
    let startY = null;
    function handleTouchStart(e) {
      if (e.touches.length === 1) startY = e.touches[0].clientY;
    }
    function handleTouchMove(e) {
      if (startY !== null && e.touches.length === 1) {
        const diff = e.touches[0].clientY - startY;
        if (diff > 70) {
          onClose();
          startY = null;
        }
      }
    }
    const node = modalRef.current;
    node?.addEventListener("touchstart", handleTouchStart);
    node?.addEventListener("touchmove", handleTouchMove);
    return () => {
      node?.removeEventListener("touchstart", handleTouchStart);
      node?.removeEventListener("touchmove", handleTouchMove);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="congrats-modal" onClick={onClose}>
      <div
        ref={modalRef}
        className="congrats-content qr-modal"
        style={{
          minWidth: 260,
          maxWidth: 350,
          padding: "2.1rem 1.2rem 2.3rem",
          borderRadius: 25,
          background: "#fff",
          animation: "slideUp .25s cubic-bezier(.7,0,0,1)"
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <img
            src={user.avatar}
            alt="avatar"
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              border: "2.5px solid #915ee5",
              objectFit: "cover",
              marginBottom: 4
            }}
          />
        </div>
        <div
          style={{
            marginBottom: 14,
            fontWeight: 700,
            fontSize: 22,
            color: "#050F58",
            textAlign: "center"
          }}
        >
          Ваш QR-код гостя
        </div>
        <div
          style={{
            background: "#fafaff",
            borderRadius: 17,
            padding: 16,
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            boxShadow: "0 1.5px 10px #915ee522"
          }}
        >
          <QRCodeSVG value={user.phone} size={142} bgColor="#fff" fgColor="#403688" />
        </div>
        <div style={{ marginTop: 12, color: "#888", fontSize: 16, textAlign: "center" }}>
          Покажите этот QR на кассе для начисления баллов
        </div>
        <button
          className="wheel-spin-btn"
          style={{
            marginTop: 18,
            fontSize: 17,
            background: "linear-gradient(98deg, #915ee5 0%, #FF731F 100%)"
          }}
          onClick={onClose}
        >
          Закрыть
        </button>
        {/* Анимация */}
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(120px); opacity: 0.72; }
              to   { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
}

// --- Основной Dashboard ---
export default function Dashboard({ history }) {
  const user = {
    name: "Иван Иванов",
    phone: "79991234567",
    avatar: process.env.PUBLIC_URL + "/avatar-demo.png"
  };
  const balance = { bonus: 2350 };

  // Квест переименован в Кэшбэк-тур
  const quest = {
    title: "Кэшбэк-тур",
    description: "Совершите покупки в 3 разных точках курорта и получите кэшбэк-бонус!",
    progress: 2,
    goal: 3,
    status: "В ожидании"
  };

  const [sliderRef, instanceRef] = useKeenSlider({ loop: true });
  const [promoIdx, setPromoIdx] = useState(0);

  // Модалки
  const [openedPromo, setOpenedPromo] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    if (!instanceRef.current) return;
    const unsub = instanceRef.current.on("detailsChanged", s => setPromoIdx(s.track.details.rel));
    return () => unsub && unsub();
  }, [instanceRef]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      paddingBottom: 86,
      position: "relative",
      zIndex: 1
    }}>
      {/* Flex-шапка с крупным логотипом */}
      <header className="header">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Роза Хутор"
          className="roza-logo"
        />
      </header>

      <main style={{ maxWidth: 430, margin: "0 auto", padding: "1rem" }}>
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

        {/* Промо-слайдер */}
        <div className="promo-slider keen-slider" ref={sliderRef} style={{
          marginBottom: 18, minHeight: 128
        }}>
          {promotions.map((promo, idx) => (
            <div className="keen-slider__slide" key={idx}>
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 1px 8px 0 rgba(35, 47, 89, 0.07)",
                  aspectRatio: "16 / 9",
                  background: "#f8f5ff",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 128,
                  maxHeight: 220,
                  cursor: "pointer"
                }}
                onClick={() => setOpenedPromo(promo)}
              >
                <img
                  src={promo.img}
                  alt={promo.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    aspectRatio: "16/9",
                    background: "#ede9fa"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{
          display: "flex", justifyContent: "center", gap: 7, marginTop: 5, marginBottom: 12
        }}>
          {promotions.map((_, i) => (
            <div key={i}
                 onClick={() => instanceRef.current?.moveToIdx(i)}
                 style={{
                   width: 8, height: 8, borderRadius: 4,
                   background: i === promoIdx ? "#915ee5" : "#ccc",
                   cursor: "pointer"
                 }} />
          ))}
        </div>

        {/* Кэшбэк-тур */}
        <div className="card" style={{
          marginBottom: 18,
          background: "#fafaff",
          padding: "1.1em 1em"
        }}>
          <div style={{
            fontWeight: 700,
            color: "#403688",
            fontSize: 18,
            marginBottom: 7
          }}>
            {quest.title}
          </div>
          <div style={{
            marginBottom: 5,
            color: "#666",
            fontSize: 15
          }}>
            {quest.description}
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <div style={{
              width: 42,
              height: 42,
              background: "#ece7ff",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
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
                color: "#888",
                fontSize: 15
              }}>
                {quest.status}
              </div>
            </div>
            <div style={{
              width: 54,
              height: 8,
              background: "#e6e6e6",
              borderRadius: 5,
              marginLeft: 12,
              marginRight: 2,
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${Math.min(quest.progress / quest.goal * 100, 100)}%`,
                height: "100%",
                background: "#915ee5",
                borderRadius: 5,
                transition: "width .35s"
              }} />
            </div>
          </div>
        </div>

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
          {history && history.length === 0 && <div style={{ color: "#888", margin: "1.1em 0" }}>Нет операций</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {history && history.map(tx => (
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
                  {tx.description} <span style={{ color: "#888", fontSize: 13 }}>({tx.date})</span>
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

      {/* QR-код */}
      <QRModal user={user} open={showQR} onClose={() => setShowQR(false)} />

      {/* Интернет-магазин */}
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

      {/* Модалка акции */}
      <PromoModal promo={openedPromo} onClose={() => setOpenedPromo(null)} />

      {/* Модалка чека */}
      <ReceiptModal tx={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
    </div>
  );
}