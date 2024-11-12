import { AppUsageData } from './appUsage';
import { Task } from './task';

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  appUsage: AppUsageData[];
}

export interface TimeFlowContextType {
  isTracking: boolean;
  appUsage: AppUsageData[];
  projects: Project[];
  tasks: Task[];
  activeProject: Project | null;
  updateAppUsage: (data: AppUsageData) => void;
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (project: Project) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  setActiveProject: (project: Project | null) => void;
  startTracking: () => void;
  stopTracking: () => void;
} 