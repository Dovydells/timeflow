import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { ProjectStatus } from '../types';

interface StatusBadgeProps {
  status: ProjectStatus;
  showMenu: boolean;
  onToggleMenu: () => void;
}

export function StatusBadge({ status, showMenu, onToggleMenu }: StatusBadgeProps) {
  const statusConfig = {
    active: { 
      label: 'Active', 
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    completed: { 
      label: 'Completed', 
      color: 'bg-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    'on-hold': { 
      label: 'On Hold', 
      color: 'bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    planned: { 
      label: 'Planned', 
      color: 'bg-violet-500',
      textColor: 'text-violet-700 dark:text-violet-300',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20'
    }
  };

  const config = statusConfig[status];
  
  return (
    <button
      onClick={onToggleMenu}
      className={`
        inline-flex items-center space-x-2 px-2 py-1 rounded-md
        ${config.bgColor} ${config.textColor}
        hover:opacity-90 transition-opacity text-sm
      `}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
      <span>{config.label}</span>
      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
    </button>
  );
}