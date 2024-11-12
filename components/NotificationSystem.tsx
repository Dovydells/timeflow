import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types/store';
import { Task } from '../types/task';

interface NotificationOptions {
  body: string;
  icon?: string;
  data?: any;
}

const NotificationSystem: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isActive = useSelector((state: RootState) => state.focus.isActive);

  const showNotification = useCallback((title: string, options: NotificationOptions) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }, []);

  const handleTaskReminder = useCallback((task: Task) => {
    showNotification('Task Reminder', {
      body: `Time to work on: ${task.title}`,
      data: { taskId: task.id }
    });
  }, [showNotification]);

  const showMotivationalPrompt = useCallback(() => {
    const prompts = [
      'Stay focused! You\'re doing great!',
      'Keep up the momentum!',
      'You\'re making excellent progress!',
      'Every minute counts towards your goals!',
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    showNotification('TimeFlow', {
      body: randomPrompt
    });
  }, [showNotification]);

  // Request notification permissions
  useEffect(() => {
    const requestPermissions = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted') {
        try {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            console.warn('Notification permission denied');
          }
        } catch (error) {
          console.warn('Notification API not supported');
        }
      }
    };
    requestPermissions();
  }, []);

  // Task reminders
  useEffect(() => {
    const checkDueTasks = setInterval(() => {
      tasks.forEach(task => {
        if (!task.completed && new Date(task.dueDate) <= new Date()) {
          handleTaskReminder(task);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkDueTasks);
  }, [tasks, handleTaskReminder]);

  // Motivational prompts during focus mode
  useEffect(() => {
    let promptInterval: NodeJS.Timeout;
    
    if (isActive) {
      promptInterval = setInterval(() => {
        showMotivationalPrompt();
      }, 30 * 60000); // Show every 30 minutes
    }

    return () => clearInterval(promptInterval);
  }, [isActive, showMotivationalPrompt]);

  return null; // This is a background component
};

export default NotificationSystem; 