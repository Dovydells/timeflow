import React, { useState, useCallback } from 'react';
import { TimeFlowContext } from '../contexts/TimeFlowContext';
import { Project, Task, AppUsageData } from '../types';

export const TimeFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [appUsage, setAppUsage] = useState<AppUsageData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const startTracking = useCallback(() => {
    setIsTracking(true);
  }, []);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
  }, []);

  const updateAppUsage = useCallback((data: AppUsageData) => {
    setAppUsage(prev => [...prev, data]);
    if (activeProject) {
      setProjects(prev => 
        prev.map(p => 
          p.id === activeProject.id 
            ? { ...p, appUsage: [...p.appUsage, data] }
            : p
        )
      );
    }
  }, [activeProject]);

  const addProject = useCallback((project: Project) => {
    setProjects(prev => [...prev, project]);
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProject?.id === id) {
      setActiveProject(null);
    }
  }, [activeProject]);

  const updateProject = useCallback((project: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === project.id ? project : p)
    );
  }, []);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
    if (task.projectId) {
      setProjects(prev => 
        prev.map(p => 
          p.id === task.projectId 
            ? { ...p, tasks: [...p.tasks, task] }
            : p
        )
      );
    }
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setProjects(prev => 
      prev.map(p => ({
        ...p,
        tasks: p.tasks.filter(t => t.id !== id)
      }))
    );
  }, []);

  const updateTask = useCallback((task: Task) => {
    setTasks(prev => 
      prev.map(t => t.id === task.id ? task : t)
    );
    setProjects(prev => 
      prev.map(p => ({
        ...p,
        tasks: p.tasks.map(t => t.id === task.id ? task : t)
      }))
    );
  }, []);

  return (
    <TimeFlowContext.Provider
      value={{
        isTracking,
        appUsage,
        projects,
        tasks,
        activeProject,
        updateAppUsage,
        addProject,
        removeProject,
        updateProject,
        addTask,
        removeTask,
        updateTask,
        setActiveProject,
        startTracking,
        stopTracking
      }}
    >
      {children}
    </TimeFlowContext.Provider>
  );
}; 