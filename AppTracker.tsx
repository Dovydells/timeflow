import React from 'react';
import { Monitor, AlertTriangle } from 'lucide-react';

interface TrackedApp {
  id: string;
  name: string;
  category: 'productive' | 'distracting';
  timeSpent: number;
  icon: string;
}

export function AppTracker() {
  const trackedApps: TrackedApp[] = [
    {
      id: '1',
      name: 'Visual Studio Code',
      category: 'productive',
      timeSpent: 120,
      icon: '💻'
    },
    {
      id: '2',
      name: 'Figma',
      category: 'productive',
      timeSpent: 45,
      icon: '🎨'
    },
    {
      id: '3',
      name: 'YouTube',
      category: 'distracting',
      timeSpent: 15,
      icon: '▶️'
    }
  ];

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Monitor className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">App Usage</h3>
        </div>
      </div>

      <div className="space-y-4">
        {trackedApps.map(app => (
          <div
            key={app.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{app.icon}</span>
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTime(app.timeSpent)}
                </p>
              </div>
            </div>
            {app.category === 'distracting' && (
              <div className="flex items-center space-x-2 text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Distracting</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
          Today's Summary
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              Productive Time
            </p>
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              {formatTime(165)}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              Distracting Time
            </p>
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
              {formatTime(15)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}