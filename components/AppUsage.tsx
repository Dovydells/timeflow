import React, { useEffect, useState } from 'react';
import { useTimeFlow } from '../contexts/TimeFlowContext';
import { formatDuration } from '../utils/timeUtils';
import { AppUsageData } from '../types/global';

const AppUsage: React.FC = () => {
  const { appUsage, isTracking, updateAppUsage } = useTimeFlow();
  const [realTimeData, setRealTimeData] = useState<AppUsageData[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let isFirstUpdate = true;

    const trackRealTimeUsage = async () => {
      if (window.systemPermissions) {
        try {
          const permission = await window.systemPermissions.requestScreenTime();
          if (permission === 'granted') {
            const updateUsage = async () => {
              try {
                const currentUsage = await window.systemPermissions.getAppUsage();
                setRealTimeData(currentUsage);
                
                // Only update and log on first update or when data changes
                if (isFirstUpdate) {
                  console.log('\n=== REAL-TIME APP USAGE ===');
                  currentUsage.forEach(app => {
                    console.log(`
Application: ${app.appName}
Duration: ${formatDuration(app.duration)}
Last Active: ${app.lastActive.toLocaleTimeString()}
-------------------`);
                  });

                  if (updateAppUsage) {
                    currentUsage.forEach(data => updateAppUsage(data));
                  }
                  isFirstUpdate = false;
                }
              } catch (error) {
                console.error('Failed to get app usage:', error);
              }
            };

            await updateUsage(); // Initial update
            intervalId = setInterval(updateUsage, 1000);
          }
        } catch (error) {
          console.error('Failed to initialize app tracking:', error);
        }
      }
    };

    if (isTracking) {
      trackRealTimeUsage();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTracking, updateAppUsage]);

  const displayData = realTimeData.length > 0 ? realTimeData : appUsage;

  return (
    <div>
      <h2>Real-Time App Usage</h2>
      {displayData.map((app, index) => (
        <div key={index}>
          {app.icon && <img src={app.icon} alt={app.appName} />}
          <h3>{app.appName}</h3>
          <p>{formatDuration(app.duration)}</p>
          <p>Last Active: {app.lastActive.toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AppUsage;