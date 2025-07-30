import React, { createContext, useContext, useState } from "react";

// Квест: три локации
const defaultProgress = {
  olympia: true,
  "2320": false,
  plateau: false,
};

const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);

  // Обновить статус локации (например, после покупки)
  const updateLocation = key =>
    setProgress(prev => ({ ...prev, [key]: true }));

  // Сбросить (для теста)
  const resetProgress = () => setProgress(defaultProgress);

  return (
    <AchievementsContext.Provider value={{ progress, updateLocation, resetProgress }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  return useContext(AchievementsContext);
}