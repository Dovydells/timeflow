import { Task } from './task';
import { AppUsageData } from './appUsage';

// Re-export all types
export * from './appUsage';
export * from './task';
export * from './store';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  deadline: string;
  profit: number;
  expenses: number;
  totalTime: string;
  tasks: Task[];
  appUsage: AppUsageData[];
  tags?: string[];
  isTracking: boolean;
}

export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'planned';
export type { AppUsageData };  // Use export type
export type { Task };  // Use export type

// Add other type definitions as needed