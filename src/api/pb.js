// src/api/pb.js

const API_URL = "http://localhost:4321/api/";

// Получить профиль пользователя (buyer-info)
export function getUserProfile({ phone }) {
  if (!/^79\d{9}$/.test(phone)) {
    return Promise.reject(new Error("Неверный формат номера телефона (нужен 79XXXXXXXXX)"));
  }
  return fetch(API_URL + "profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  }).then(res => {
    if (!res.ok) throw new Error("Ошибка получения профиля");
    return res.json();
  });
}

// Получить баланс
export function getBalance({ phone }) {
  if (!/^79\d{9}$/.test(phone)) {
    return Promise.reject(new Error("Неверный формат номера телефона (нужен 79XXXXXXXXX)"));
  }
  return fetch(API_URL + `balance?phone=${encodeURIComponent(phone)}`)
    .then(res => {
      if (!res.ok) throw new Error("Ошибка получения баланса");
      return res.json();
    });
}

// Получить историю операций
export function getHistory({ phone }) {
  if (!/^79\d{9}$/.test(phone)) {
    return Promise.reject(new Error("Неверный формат номера телефона (нужен 79XXXXXXXXX)"));
  }
  return fetch(API_URL + `history?phone=${encodeURIComponent(phone)}`)
    .then(res => {
      if (!res.ok) throw new Error("Ошибка получения истории");
      return res.json();
    });
}

// Начислить бонусы
export function accrueBonus({ phone, amount, description }) {
  if (!/^79\d{9}$/.test(phone)) {
    return Promise.reject(new Error("Неверный формат номера телефона (нужен 79XXXXXXXXX)"));
  }
  if (typeof amount !== "number" || isNaN(amount)) {
    return Promise.reject(new Error("Сумма начисления должна быть числом"));
  }
  return fetch(API_URL + "accrual", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone,
      amount,
      description: description || "Начисление"
    })
  }).then(res => {
    if (!res.ok) throw new Error("Ошибка начисления бонусов");
    return res.json();
  });
}