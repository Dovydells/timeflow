import React, { useState } from 'react';
import { Bell, Monitor, Clock, Search, Plus } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { ApprovedApps } from './ApprovedApps';

export function Settings() {
  const { settings, updateSettings } = useSettings();
  const [showAddAppModal, setShowAddAppModal] = useState(false);

  const handleUpdateDeadlineThresholds = (field: 'warning' | 'danger', value: number) => {
    updateSettings({
      deadlineThresholds: {
        ...settings.deadlineThresholds,
        [field]: value
      }
    });
  };

  const handleUpdateNotificationInterval = (value: number) => {
    updateSettings({
      notificationInterval: value
    });
  };

  const handleToggleApp = (appName: string) => {
    const currentApps = settings.focusMode.allowedApps;
    const updatedApps = currentApps.includes(appName)
      ? currentApps.filter(app => app !== appName)
      : [...currentApps, appName];

    updateSettings({
      focusMode: {
        ...settings.focusMode,
        allowedApps: updatedApps
      }
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Deadline Settings */}
      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-semibold">Deadline Settings</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Warning Threshold (days)
            </label>
            <input
              type="number"
              value={settings.deadlineThresholds.warning}
              onChange={(e) => handleUpdateDeadlineThresholds('warning', parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Danger Threshold (days)
            </label>
            <input
              type="number"
              value={settings.deadlineThresholds.danger}
              onChange={(e) => handleUpdateDeadlineThresholds('danger', parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-semibold">Notification Settings</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Notification Interval (minutes)
          </label>
          <input
            type="number"
            value={settings.notificationInterval}
            onChange={(e) => handleUpdateNotificationInterval(parseInt(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Approved Apps */}
      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Monitor className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Approved Apps</h3>
          </div>
          <button
            onClick={() => setShowAddAppModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add App</span>
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search apps..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        <ApprovedApps
          allowedApps={settings.focusMode.allowedApps}
          onToggleApp={handleToggleApp}
          showAddModal={showAddAppModal}
          onCloseAddModal={() => setShowAddAppModal(false)}
        />
      </div>
    </div>
  );
}