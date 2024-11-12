import React, { useEffect, useState } from 'react';
import { useTimeFlow } from '../contexts/TimeFlowContext';

export const SystemPermissionsManager: React.FC = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const { startTracking, stopTracking } = useTimeFlow();

  useEffect(() => {
    const requestPermissions = async () => {
      if (window.systemPermissions) {
        try {
          const screenTimePermission = await window.systemPermissions.requestScreenTime();
          const notificationPermission = await window.systemPermissions.requestNotificationPermission();
          
          setHasPermissions(
            screenTimePermission === 'granted' && 
            notificationPermission === 'granted'
          );

          if (screenTimePermission === 'granted') {
            startTracking();
          } else {
            stopTracking();
          }
        } catch (error) {
          console.error('Failed to request permissions:', error);
          setHasPermissions(false);
          stopTracking();
        }
      }
    };

    requestPermissions();
  }, [startTracking, stopTracking]);

  return (
    <div className="permissions-status">
      {!hasPermissions && (
        <div className="permissions-warning">
          Please grant necessary permissions for full functionality
        </div>
      )}
    </div>
  );
}; 