import React, { useEffect, useState } from 'react';
import { useTimeFlow } from '../context/TimeFlowContext';
import { Task } from '../utils/testUtils';

interface NotificationsProps {
  initialTask?: Task;
}

export const Notifications: React.FC<NotificationsProps> = ({ initialTask }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { tasks, updateTask } = useTimeFlow();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    requestPermission();
    if (initialTask) {
      setActiveTask(initialTask);
    }
  }, [initialTask]);

  useEffect(() => {
    if (permissionGranted) {
      const checkTaskReminders = () => {
        const now = new Date();
        tasks.forEach(task => {
          if (
            task.reminderTime && 
            new Date(task.reminderTime) <= now && 
            task.status !== 'completed'
          ) {
            showNotification(task);
          }
        });
      };

      // Check for reminders every minute
      const interval = setInterval(checkTaskReminders, 60000);
      checkTaskReminders(); // Initial check
      
      return () => clearInterval(interval);
    }
  }, [permissionGranted, tasks]);

  const requestPermission = async () => {
    try {
      const permission = await window.systemPermissions.requestNotificationPermission();
      setPermissionGranted(permission === 'granted');
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const showNotification = (task: Task) => {
    if (!permissionGranted) return;

    const notification = new Notification('TimeFlow Task Reminder', {
      body: `Would you like to complete "${task.title}"?`,
      icon: '/icons/timeflow-logo.png',
      tag: task.id, // Prevent duplicate notifications for the same task
      requireInteraction: true, // Keep notification visible until user interacts
    });

    setActiveTask(task);
    notification.addEventListener('click', () => handleNotificationAction(task, 'yes'));
    notification.addEventListener('close', () => handleNotificationAction(task, 'no'));
  };

  const handleNotificationAction = (task: Task, action: 'yes' | 'no') => {
    if (action === 'yes') {
      updateTask({
        ...task,
        status: 'completed',
        endTime: new Date()
      });
      setActiveTask(null);
    } else {
      // Show motivational message and reschedule
      new Notification('Keep Going!', {
        body: 'Every step counts. Would you like to try again later?',
        icon: '/icons/motivation.png'
      });

      // Reschedule reminder for 30 minutes later
      updateTask({
        ...task,
        reminderTime: new Date(Date.now() + 30 * 60 * 1000)
      });
      setActiveTask(null);
    }
  };

  return (
    <div className="notifications">
      {!permissionGranted && (
        <button 
          onClick={requestPermission}
          className="enable-notifications-btn"
        >
          Enable Notifications
        </button>
      )}
      {activeTask && (
        <div className="active-reminder">
          <h3>Current Reminder</h3>
          <p>{activeTask.title}</p>
          <div className="reminder-actions">
            <button onClick={() => handleNotificationAction(activeTask, 'yes')}>
              Complete Task
            </button>
            <button onClick={() => handleNotificationAction(activeTask, 'no')}>
              Remind Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 