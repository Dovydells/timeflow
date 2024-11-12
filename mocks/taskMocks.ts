import { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Setup',
    description: 'Initial project configuration and dependencies',
    completed: false,
    projectId: '1',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    type: 'project'
  },
  {
    id: '2',
    title: 'Write Documentation',
    description: 'Create comprehensive documentation for the project',
    completed: false,
    projectId: '1',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    type: 'project'
  },
]; 