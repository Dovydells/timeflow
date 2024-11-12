import { Task, Project, AppUsageData } from './index';

export interface RootState {
  projects: {
    projects: Project[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  tasks: {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  focus: {
    isActive: boolean;
    currentProjectId: string | null;
    startTime: string | null;
    duration: number;
  };
  analytics: {
    appUsage: AppUsageData[];
    dailyStats: {
      totalFocusTime: number;
      completedTasks: number;
      productiveApps: string[];
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
} 