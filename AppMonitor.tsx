import React, { useEffect, useState } from 'react';
import { Monitor, AlertTriangle, X } from 'lucide-react';
import type { MonitoredApp } from '../types';

export function AppMonitor() {
  const [runningApps, setRunningApps] = useState<MonitoredApp[]>([
    {
      id: '1',
      name: 'DaVinci Resolve Studio',
      processName: 'resolve.exe',
      allowed: true,
      icon: '🎬',
      category: 'design'
    },
    {
      id: '4',
      name: 'YouTube (Chrome)',
      processName: 'chrome.exe',
      allowed: false,
      icon: '▶️',
      category: 'entertainment'
    }
  ]);

  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const disallowedApps = runningApps.filter(app => !app.allowed);
      if (disallowedApps.length > 0) {
        setWarnings(prev => [
          ...prev,
          `Please close: ${disallowedApps[0].name}`
        ]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [runningApps]);

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-2xl p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Active Applications</h3>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="mb-4 space-y-2">
          {warnings.map((warning, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{warning}</span>
              </div>
              <button 
                onClick={() => setWarnings(prev => prev.filter((_, i) => i !== index))}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {runningApps.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{app.icon}</span>
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {app.allowed ? 'Allowed' : 'Not Allowed'}
                </p>
              </div>
            </div>
            {!app.allowed && (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
          Active Monitoring
        </h4>
        <p className="text-sm text-blue-600 dark:text-blue-300">
          The system is actively monitoring your application usage to help maintain focus on project-related tasks.
        </p>
      </div>
    </div>
  );
}