import React, { createContext, useContext, useState } from "react";

// Можно доработать: брать из Telegram WebApp
const defaultUser = {
  id: "RK-123456",
  name: "Алексей Петров",
  avatar: "/avatar-demo.png",
  level: "Traveler",
  levelProgress: 70, // процентов
  bonuses: 1560,
};

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  // Для обновления данных пользователя
  const updateUser = updates => setUser(u => ({ ...u, ...updates }));

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}