import React from 'react';
import { AlertCircle, Clock, ArrowUp } from 'lucide-react';
import type { Task } from '../types';

interface TaskPriorityProps {
  tasks: Task[];
  onUpdatePriority: (taskId: string, priority: 'high' | 'medium' | 'low') => void;
}

export function TaskPriority({ tasks, onUpdatePriority }: TaskPriorityProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const suggestPriority = (task: Task) => {
    // Simple priority suggestion based on due date
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilDue <= 2) return 'high';
    if (daysUntilDue <= 5) return 'medium';
    return 'low';
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => {
        const suggestedPriority = suggestPriority(task);
        const priorityColor = getPriorityColor(suggestedPriority);

        return (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${priorityColor}`}>
                {suggestedPriority === 'high' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : suggestedPriority === 'medium' ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onUpdatePriority(task.id, suggestedPriority)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${priorityColor}`}
            >
              {suggestedPriority.charAt(0).toUpperCase() + suggestedPriority.slice(1)} Priority
            </button>
          </div>
        );
      })}
    </div>
  );
}