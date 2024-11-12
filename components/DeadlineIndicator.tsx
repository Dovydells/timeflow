import React from 'react';
import { Calendar } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface DeadlineIndicatorProps {
  deadline: string;
}

export function DeadlineIndicator({ deadline }: DeadlineIndicatorProps) {
  const { settings } = useSettings();
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const getDeadlineStatus = () => {
    if (daysUntilDeadline < 0) {
      return {
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        text: 'Vėluoja'
      };
    }
    if (daysUntilDeadline <= settings.deadlineThresholds.danger) {
      return {
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        text: `${daysUntilDeadline}d.`
      };
    }
    if (daysUntilDeadline <= settings.deadlineThresholds.warning) {
      return {
        color: 'text-amber-500',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        text: `${daysUntilDeadline}d.`
      };
    }
    return {
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: `${daysUntilDeadline}d.`
    };
  };

  const status = getDeadlineStatus();

  return (
    <div className="flex items-center space-x-2">
      <Calendar className={`w-4 h-4 ${status.color}`} />
      <div className="flex items-center space-x-2">
        <span>{new Date(deadline).toLocaleDateString('lt-LT')}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
          {status.text}
        </span>
      </div>
    </div>
  );
}