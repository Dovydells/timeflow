import React, { createContext, useContext, useState } from 'react';
import { TimeFlowContextType } from '../types/context';
import { AppUsageData } from '../types/global';
import { Project } from '../types/context';
import { Task } from '../types/task';

const TimeFlowContext = createContext<TimeFlowContextType | null>(null);

export const TimeFlowProvider: React.FC<{ 
  children: React.ReactNode;
  value?: Partial<TimeFlowContextType>;
}> = ({ children, value }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [appUsage, setAppUsage] = useState<AppUsageData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const defaultContext: TimeFlowContextType = {
    isTracking,
    appUsage,
    projects,
    tasks,
    activeProject,
    updateAppUsage: (data: AppUsageData[]) => {
      setAppUsage(data.map(app => ({
        ...app,
        lastActive: app.lastActive || new Date() // Ensure lastActive is always a Date
      })));
    },
    addProject: (project: Project) => setProjects([...projects, project]),
    removeProject: (id: string) => setProjects(projects.filter(p => p.id !== id)),
    updateProject: (project: Project) => {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    },
    addTask: async (task: Omit<Task, 'id'>) => {
      const newTask = { ...task, id: Date.now().toString() };
      setTasks([...tasks, newTask as Task]);
    },
    removeTask: (id: string) => setTasks(tasks.filter(t => t.id !== id)),
    updateTask: (task: Task) => {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    },
    setActiveProject: (project: Project | null) => setActiveProject(project),
    startTracking: () => setIsTracking(true),
    stopTracking: () => setIsTracking(false),
  };

  return (
    <TimeFlowContext.Provider value={{ ...defaultContext, ...value }}>
      {children}
    </TimeFlowContext.Provider>
  );
};

export const useTimeFlow = () => {
  const context = useContext(TimeFlowContext);
  if (!context) {
    throw new Error('useTimeFlow must be used within a TimeFlowProvider');
  }
  return context;
}; 