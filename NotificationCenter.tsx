import React from 'react';
import { Bell, AlertCircle, Clock, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'deadline' | 'app-switch' | 'warning';
  title: string;
  message: string;
  time: string;
}

export function NotificationCenter() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'deadline',
      title: 'Upcoming Deadline',
      message: 'Project "Video Editing" needs to be completed in 2 days',
      time: '5 min ago'
    },
    {
      id: '2',
      type: 'app-switch',
      title: 'Wrong Application',
      message: 'Return to DaVinci Resolve Studio',
      time: '1 min ago'
    }
  ];

  return (
    <div className="fixed right-4 top-20 w-80 bg-white dark:bg-[#2c2c2c] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <button className="text-xs text-blue-500 hover:text-blue-600">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <div className="flex items-start space-x-3">
              {notification.type === 'deadline' ? (
                <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{notification.title}</h4>
                  <button className="text-gray-400 hover:text-gray-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}