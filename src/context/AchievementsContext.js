// src/context/AchievementsContext.js
import React, { createContext, useContext, useState } from "react";

const defaultProgress = {
  olympia: true,
  "2320": false,
  plateau: false,
};

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);

  // Для примера: можно передать функцию обновления квеста сюда
  const updateLocation = key => setProgress(p => ({ ...p, [key]: true }));

  return (
    <AchievementsContext.Provider value={{ progress, updateLocation }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  return useContext(AchievementsContext);
}