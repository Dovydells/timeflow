import { useState, useEffect } from 'react';
import type { AppSettings } from '../types';

const defaultSettings: AppSettings = {
  deadlineThresholds: {
    warning: 14, // 2 weeks
    danger: 7,   // 1 week
  },
  notificationInterval: 2,
  focusMode: {
    enabled: false,
    allowedApps: ['Visual Studio Code', 'DaVinci Resolve', 'Final Cut Pro'],
    notifyOnDistraction: true
  }
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        // Ensure focusMode exists in saved settings
        if (!parsed.focusMode) {
          parsed.focusMode = defaultSettings.focusMode;
        }
        setSettings(parsed);
      } catch (error) {
        console.error('Error parsing settings:', error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem('appSettings', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return { settings, updateSettings };
}