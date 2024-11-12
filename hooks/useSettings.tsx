import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppSettings } from '../types';

const defaultSettings: AppSettings = {
  deadlineThresholds: {
    warning: 14, // 2 weeks
    danger: 7,   // 1 week
  },
  notificationInterval: 2
};

const SettingsContext = createContext<{
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}>({
  settings: defaultSettings,
  updateSettings: () => {}
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('appSettings', JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);