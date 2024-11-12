import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';

interface TimeData {
  daily: Array<{ date: string; hours: number }>;
  weekly: Array<{ week: string; hours: number }>;
}

interface TimeReportProps {
  projectName: string;
  timeData: TimeData;
  onClose: () => void;
}

export function TimeReport({ projectName, timeData, onClose }: TimeReportProps) {
  const [view, setView] = useState<'daily' | 'weekly'>('daily');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatWeek = (week: string) => {
    const [year, weekNum] = week.split('-W');
    return `${year} Week ${weekNum}`;
  };

  const formatTimeDisplay = (hours: number) => {
    const totalMinutes = Math.floor(hours * 60);
    const displayHours = Math.floor(totalMinutes / 60);
    const displayMinutes = totalMinutes % 60;
    
    if (displayHours === 0) {
      return `${displayMinutes}m`;
    }
    
    return displayMinutes > 0 
      ? `${displayHours}h ${displayMinutes}m`
      : `${displayHours}h`;
  };

  const totalHours = view === 'daily'
    ? timeData.daily.reduce((acc, day) => acc + day.hours, 0)
    : timeData.weekly.reduce((acc, week) => acc + week.hours, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">{projectName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Time Report</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setView('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'daily'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'weekly'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Weekly
          </button>
        </div>

        <div className="space-y-4">
          {view === 'daily' ? (
            timeData.daily.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{formatDate(day.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{formatTimeDisplay(day.hours)}</span>
                </div>
              </div>
            ))
          ) : (
            timeData.weekly.map((week, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{formatWeek(week.week)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{formatTimeDisplay(week.hours)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-blue-700 dark:text-blue-400">
              Total Time
            </span>
            <span className="font-mono text-lg text-blue-700 dark:text-blue-400">
              {formatTimeDisplay(totalHours)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}