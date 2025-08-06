import React, { createContext, useContext, useState } from "react";

const defaultProgress = {
  olympia: true,      // Вот здесь true!
  "2320": false,
  plateau: false,
};

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);

  // функция для обновления шага
  const updateLocation = key => setProgress(prev => ({ ...prev, [key]: true }));

  return (
    <AchievementsContext.Provider value={{ progress, updateLocation }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  return useContext(AchievementsContext);
}