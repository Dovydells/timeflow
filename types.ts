export interface Task {
  id: string;
  title: string;
  completed: boolean;
  type: 'daily' | 'project';
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'planned' | 'active' | 'completed' | 'on-hold';
  deadline: string;
  profit: number;
  expenses: number;
  tasks: Task[];
  time: string;
  totalTime: string;
  isTracking: boolean;
}

export interface MoneyTransaction {
  id: string;
  type: 'project' | 'personal';
  amount: number;
  operation: 'add' | 'subtract';
  description?: string;
  date: string;
}

export interface FocusMode {
  enabled: boolean;
  allowedApps: string[];
  notifyOnDistraction: boolean;
}

export interface AppSettings {
  deadlineThresholds: {
    warning: number;
    danger: number;
  };
  notificationInterval: number;
  focusMode: FocusMode;
}