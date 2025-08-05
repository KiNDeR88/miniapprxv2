import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Achievements from "./components/Achievements";
import History from "./components/History";
import Tabs from "./components/Tabs";
import "./style.css";

// История — один массив на всё приложение!
const initialHistory = [
  {
    id: "1",
    date: "2024-07-01",
    description: "Покупка в ресторане",
    amount: 100,
    receipt: {
      store: "Ресторан Высота 2320",
      total: 1450,
      items: [
        { name: "Борщ", qty: 1, price: 390 },
        { name: "Чай облепиховый", qty: 2, price: 200 },
        { name: "Пельмени с брусникой", qty: 1, price: 660 }
      ],
      bonusUsed: 300,
      time: "12:15",
      cashier: "Иванова О."
    }
  },
  {
    id: "2",
    date: "2024-06-30",
    description: "Начисление за регистрацию",
    amount: 50,
    receipt: null
  },
  {
    id: "3",
    date: "2024-06-27",
    description: "Потрачено в интернет-магазине",
    amount: -300,
    receipt: {
      store: "Интернет-магазин",
      total: 300,
      items: [
        { name: "Сувенирный браслет", qty: 1, price: 300 }
      ],
      bonusUsed: 0,
      time: "17:30",
      cashier: "Online"
    }
  }
];

export default function App() {
  const [history, setHistory] = useState(initialHistory);

  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard history={history} />} />
          <Route path="/history" element={<History history={history} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Tabs />
      </div>
    </Router>
  );
}