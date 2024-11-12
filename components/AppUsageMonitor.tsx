import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/store';
import { addAppUsage } from '../store/slices/analyticsSlice';
import { AppUsageData } from '../types/appUsage';

const AppUsageMonitor: React.FC = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.focus.isActive);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        // This is a mock implementation. In a real app, you'd use a native API to get the active window.
        const mockAppUsage: AppUsageData = {
          id: Date.now().toString(),
          appName: 'Visual Studio Code',
          title: 'Working on TimeFlow',
          startTime: new Date().toISOString(),
          duration: 5, // 5 seconds
        };
        dispatch(addAppUsage(mockAppUsage));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isActive, dispatch]);

  return null;
};

export default AppUsageMonitor; 