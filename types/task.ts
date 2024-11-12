export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  projectId: string;
  createdAt: string;
  dueDate: string;
  type: 'daily' | 'project';
}

export const completeTask = (taskId: string) => {
  // Implementation
}; 