import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Achievements from "./components/Achievements";
import History from "./components/History";
import Tabs from "./components/Tabs";
import "./style.css";

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Tabs />
      </div>
    </Router>
  );
}