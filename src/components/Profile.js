import React, { useState } from "react";

export default function Profile() {
  // Сохраняем стейт пользователя
  const [user, setUser] = useState({
    name: "Иван Иванов",
    phone: "+7 999 123-45-67",
    email: "ivan.ivanov@mail.ru",
    birthday: "2000-05-06",
    avatar: process.env.PUBLIC_URL + "/avatar-demo.png",
    gender: "Мужской",
    card: "1234 5678 0001 1112"
  });

  const birthRu = user.birthday ? user.birthday.split("-").reverse().join(".") : "";

  // Состояния для модалки редактирования
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState(user);
  const [error, setError] = useState({});

  // Открыть окно редактирования
  const handleEdit = () => {
    setForm(user);
    setEditOpen(true);
    setError({});
  };

  // Валидация
  const validate = (values) => {
    const err = {};
    if (!values.name.trim()) err.name = "Введите имя";
    if (!/^(\+7|7|8)\s?\d{3}\s?-?\d{3}-?\d{2}-?\d{2}$/.test(values.phone)) err.phone = "Телефон в формате +7 999 123-45-67";
    if (!/\S+@\S+\.\S+/.test(values.email)) err.email = "Неверный email";
    if (!values.birthday) err.birthday = "Введите дату";
    return err;
  };

  // Сохранить изменения
  const handleSave = () => {
    const err = validate(form);
    setError(err);
    if (Object.keys(err).length) return;
    setUser(form);
    setEditOpen(false);
  };

  // Изменение поля
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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
        <div style={{ padding: "0 22px" }}>
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
        <div style={{ padding: "0 22px" }}>
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
        <div style={{ padding: "0 22px" }}>
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
          onClick={handleEdit}
        >
          Редактировать профиль
        </button>
      </div>

      {/* Модалка редактирования */}
      {editOpen && (
        <div
          className="modal-profile-edit"
          style={{
            position: "fixed",
            left: 0, right: 0, bottom: 0,
            zIndex: 1200,
            background: "#fff",
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            boxShadow: "0 -4px 24px #40368822",
            padding: "25px 20px 28px 20px",
            maxWidth: 430,
            margin: "0 auto",
            animation: "slideUp .23s cubic-bezier(.7,0,0,1)"
          }}
          onClick={() => setEditOpen(false)}
        >
          <div
            style={{
              width: 48, height: 6, background: "#ece7ff", borderRadius: 3,
              margin: "0 auto 18px auto"
            }}
          />
          <div style={{ fontWeight: 700, fontSize: 21, color: "#403688", marginBottom: 18 }}>
            Редактирование профиля
          </div>
          <form
            style={{ display: "flex", flexDirection: "column", gap: 15 }}
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
            onClick={e => e.stopPropagation()}
            autoComplete="off"
          >
            <label style={{ fontWeight: 500, fontSize: 16, color: "#403688" }}>
              Имя
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                autoFocus
              />
              {error.name && <div style={{ color: "#eb5957", fontSize: 14, marginTop: 2 }}>{error.name}</div>}
            </label>
            <label style={{ fontWeight: 500, fontSize: 16, color: "#403688" }}>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
              {error.email && <div style={{ color: "#eb5957", fontSize: 14, marginTop: 2 }}>{error.email}</div>}
            </label>
            <label style={{ fontWeight: 500, fontSize: 16, color: "#403688" }}>
              Телефон
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                style={inputStyle}
                placeholder="+7 999 123-45-67"
              />
              {error.phone && <div style={{ color: "#eb5957", fontSize: 14, marginTop: 2 }}>{error.phone}</div>}
            </label>
            <label style={{ fontWeight: 500, fontSize: 16, color: "#403688" }}>
              Дата рождения
              <input
                name="birthday"
                type="date"
                value={form.birthday}
                onChange={handleChange}
                style={inputStyle}
              />
              {error.birthday && <div style={{ color: "#eb5957", fontSize: 14, marginTop: 2 }}>{error.birthday}</div>}
            </label>
            <label style={{ fontWeight: 500, fontSize: 16, color: "#403688" }}>
              Пол
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
                <option value="">-</option>
              </select>
            </label>
            <button
              type="submit"
              style={{
                background: "linear-gradient(98deg, #915ee5 0%, #FF731F 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "12px 0",
                border: "none",
                borderRadius: 10,
                marginTop: 8
              }}
            >
              Сохранить
            </button>
            <button
              type="button"
              style={{
                background: "#ece7ff",
                color: "#403688",
                fontWeight: 600,
                fontSize: 15,
                padding: "10px 0",
                border: "none",
                borderRadius: 9
              }}
              onClick={() => setEditOpen(false)}
            >
              Отмена
            </button>
          </form>
        </div>
      )}

      {/* Анимация для модалки */}
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(140px); opacity: 0.6; }
            to   { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
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
      <div style={{ color: "#8f8f8f" }}>{label}</div>
      <div style={{
        color: "#333", fontWeight: 600, maxWidth: 190, textAlign: "right",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
      }}>{value}</div>
    </div>
  );
}

const dividerStyle = {
  height: 1,
  background: "#ece7ff",
  margin: "18px 0"
};

const inputStyle = {
  width: "100%",
  border: "1.2px solid #ece7ff",
  borderRadius: 10,
  padding: "11px 11px",
  fontSize: 16,
  fontFamily: "'Montserrat', Arial, sans-serif",
  marginTop: 3,
  marginBottom: 2
};