import React from 'react';
import { AppUsageData } from '../types/appUsage';
import { formatDuration } from '../utils/timeUtils';

interface AppUsageStatsProps {
  appUsage: AppUsageData[];
}

const AppUsageStats: React.FC<AppUsageStatsProps> = ({ appUsage }) => {
  return (
    <div className="app-usage-stats">
      <h2>App Usage</h2>
      {appUsage.map((app, index) => (
        <div key={index} className="app-stat">
          <h3>{app.appName}</h3>
          <p>Duration: {formatDuration(app.duration)}</p>
        </div>
      ))}
    </div>
  );
};

export default AppUsageStats; 