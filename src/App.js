import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Achievements from "./components/Achievements";
import History from "./components/History"; // Импортируй History
import Tabs from "./components/Tabs";

export default function App() {
  return (
    <Router>
      <div style={{
        minHeight: "100vh",
        background: "#fff",
        position: "relative",
        paddingBottom: 66 // чтобы контент не перекрывался меню
      }}>
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