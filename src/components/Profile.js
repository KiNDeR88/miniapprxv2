import React, { useState, useEffect } from "react";

export default function Profile() {
  const user = {
    name: "Иван Иванов",
    phone: "+7 999 123-45-67",
    email: "ivan.ivanov@mail.ru",
    birthday: "2000-05-06",
    avatar: process.env.PUBLIC_URL + "/avatar-demo.png",
    gender: "Мужской",
    card: "1234 5678 0001 1112"
  };

  const birthRu = user.birthday ? user.birthday.split("-").reverse().join(".") : "";

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto", padding: "22px 10px 82px",
      background: "#f7f7fd", minHeight: "100vh"
    }}>
      <div
        className="card"
        style={{
          maxWidth: 380,
          margin: "24px auto",
          padding: "0 0 22px 0",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 2px 18px 0 rgba(145,94,229,0.08)",
          overflow: "hidden"
        }}
      >
        {/* Верхний блок с градиентом и аватаром */}
        <div
          style={{
            background: "linear-gradient(98deg, #915ee5 0%, #FF731F 120%)",
            height: 95,
            position: "relative",
            marginBottom: 42
          }}
        >
          <img
            src={user.avatar}
            alt="avatar"
            style={{
              width: 86,
              height: 86,
              borderRadius: "50%",
              border: "4px solid #fff",
              boxShadow: "0 3px 14px #915ee526",
              position: "absolute",
              left: "50%",
              bottom: -43,
              transform: "translateX(-50%)",
              objectFit: "cover",
              transition: "box-shadow .22s"
            }}
          />
        </div>
        <div style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            fontWeight: 800,
            fontSize: 24,
            color: "#403688",
            fontFamily: "'Montserrat', Arial, sans-serif",
            marginBottom: 2
          }}>{user.name}</div>
        </div>

        {/* Личные данные */}
        <div style={{
          margin: "19px 0 7px 0",
          fontWeight: 700,
          color: "#403688",
          fontSize: 16,
          paddingLeft: 22
        }}>Личные данные</div>
        <div style={{
          padding: "0 22px"
        }}>
          <ProfileField label="Пол" value={user.gender} />
          <ProfileField label="Дата рождения" value={birthRu} />
        </div>
        <div style={dividerStyle} />

        {/* Контакты */}
        <div style={{
          margin: "13px 0 7px 0",
          fontWeight: 700,
          color: "#403688",
          fontSize: 16,
          paddingLeft: 22
        }}>Контакты</div>
        <div style={{padding:"0 22px"}}>
          <ProfileField label="Телефон" value={user.phone} />
          <ProfileField label="E-mail" value={user.email} />
        </div>
        <div style={dividerStyle} />

        {/* Карта лояльности */}
        <div style={{
          margin: "13px 0 7px 0",
          fontWeight: 700,
          color: "#403688",
          fontSize: 16,
          paddingLeft: 22
        }}>Карта лояльности</div>
        <div style={{padding:"0 22px"}}>
          <ProfileField label="Номер карты" value={user.card} />
        </div>

        {/* Кнопка Редактировать */}
        <button
          style={{
            margin: "28px 16px 0 16px",
            width: "calc(100% - 32px)",
            border: "none",
            borderRadius: 12,
            padding: "13px 0",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(98deg, #915ee5 0%, #FF731F 120%)",
            fontSize: 17,
            cursor: "pointer",
            boxShadow: "0 2px 12px #915ee526"
          }}
          disabled
          title="В следующей версии"
        >
          Редактировать профиль
        </button>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 15
    }}>
      <div style={{color:"#8f8f8f"}}>{label}</div>
      <div style={{color:"#333", fontWeight:600, maxWidth:190, textAlign:"right"}}>{value}</div>
    </div>
  );
}

const dividerStyle = {
  height: 1,
  background: "#ece7ff",
  margin: "18px 0"
};