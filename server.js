// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_URL = "https://lp-api.rosaresort.com/v2/";
const TOKEN = "f8c7169781a8b60b5abae924e29e9d0b";

// Получить информацию о пользователе через /buyer-info
app.post("/api/profile", async (req, res) => {
  try {
    // Ожидаем только телефон (обязательное поле), например: { phone: "79991234567" }
    if (!req.body || !req.body.phone || typeof req.body.phone !== "string" || !/^79\d{9}$/.test(req.body.phone)) {
      return res.status(400).json({ error: "Номер телефона обязателен и должен быть в формате 79XXXXXXXXX (строка)" });
    }

    const response = await fetch(API_URL + "buyer-info", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone: req.body.phone })
    });

    // Получаем ответ в любом случае (даже если ошибка)
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    // Логируем все обращения для дебага
    console.log("BUYER-INFO:", { req: req.body, status: response.status, resp: data });

    // Возвращаем как есть (статус и тело)
    res.status(response.status).json(data);

  } catch (err) {
    console.error("PROXY ERROR", err);
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

// Получить баланс (по номеру телефона)
app.get("/api/balance", async (req, res) => {
  try {
    const phone = req.query.phone;
    if (!phone || typeof phone !== "string" || !/^79\d{9}$/.test(phone)) {
      return res.status(400).json({ error: "Номер телефона обязателен в query и должен быть в формате 79XXXXXXXXX" });
    }

    const response = await fetch(API_URL + "balance?phone=" + encodeURIComponent(phone), {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

// Получить историю операций (по номеру телефона)
app.get("/api/history", async (req, res) => {
  try {
    const phone = req.query.phone;
    if (!phone || typeof phone !== "string" || !/^79\d{9}$/.test(phone)) {
      return res.status(400).json({ error: "Номер телефона обязателен в query и должен быть в формате 79XXXXXXXXX" });
    }

    const response = await fetch(API_URL + "history?phone=" + encodeURIComponent(phone), {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

// Начислить бонусы (POST /accrual)
app.post("/api/accrual", async (req, res) => {
  try {
    // Требуется как минимум phone, amount
    const { phone, amount, description } = req.body;
    if (!phone || typeof phone !== "string" || !/^79\d{9}$/.test(phone)) {
      return res.status(400).json({ error: "Номер телефона обязателен и должен быть в формате 79XXXXXXXXX" });
    }
    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Поле amount обязательно (число)" });
    }

    const response = await fetch(API_URL + "accrual", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone,
        amount,
        description: description || "Начисление"
      })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

app.listen(4321, () => console.log("PremiumBonus Proxy API started on port 4321"));