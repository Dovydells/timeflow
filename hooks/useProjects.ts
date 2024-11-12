import { useState, useEffect } from 'react';
import type { Project, Task } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        return JSON.parse(savedProjects);
      }
      return [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, [projects]);

  const addProject = (project: Omit<Project, 'id' | 'tasks' | 'time' | 'isTracking' | 'progress' | 'totalTime'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      tasks: [],
      time: '00:00:00',
      totalTime: '00:00:00',
      isTracking: false,
      progress: 0
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const updateProject = (project: Project) => {
    setProjects(prev => prev.map(p => 
      p.id === project.id ? {
        ...project,
        progress: calculateProjectProgress(project)
      } : p
    ));
  };

  const calculateProjectProgress = (project: Project): number => {
    const totalTasks = project.tasks.length;
    if (totalTasks === 0) return 0;
    
    const completedTasks = project.tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return {
    projects,
    addProject,
    deleteProject,
    updateProject
  };
}