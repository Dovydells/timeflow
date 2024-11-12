import React, { useEffect } from 'react';
import { useTimeFlow } from '../contexts/TimeFlowContext';
import { scheduleTaskReminder } from '../utils/notifications';
import { showMotivationalPrompt } from '../utils/motivationalPrompts';

export const NotificationManager: React.FC = () => {
  const { tasks } = useTimeFlow();

  useEffect(() => {
    const checkReminders = async () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.reminderTime && task.status !== 'completed') {
          const reminderTime = new Date(task.reminderTime);
          if (reminderTime <= now) {
            scheduleTaskReminder(task);
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [tasks]);

  return null; // This component doesn't render anything
}; 