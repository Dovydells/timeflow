import React, { useState, useEffect } from 'react';
import { Clock, Trash2, Play, Square, Calendar, BarChart2, Filter, CheckCircle } from 'lucide-react';
import { TaskList } from './TaskList';
import type { Project, Task } from '../types';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onUpdate: (project: Project) => void;
}

export function ProjectCard({ project, onDelete, onUpdate }: ProjectCardProps) {
  const [isTracking, setIsTracking] = useState(project.isTracking || false);
  const [elapsedTime, setElapsedTime] = useState(() => {
    const [hours, minutes, seconds] = (project.time || '00:00:00').split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  });
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [taskView, setTaskView] = useState<'daily' | 'weekly'>('daily');
  const [showFinishedTasks, setShowFinishedTasks] = useState(false);

  useEffect(() => {
    if (isTracking) {
      const newTimer = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          const formattedTime = formatTime(newTime);
          onUpdate({
            ...project,
            time: formattedTime,
            totalTime: formattedTime,
            isTracking: true
          });
          return newTime;
        });
      }, 1000);
      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTracking]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startTracking = () => {
    setIsTracking(true);
    onUpdate({
      ...project,
      isTracking: true
    });
  };

  const stopTracking = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setIsTracking(false);
    onUpdate({
      ...project,
      time: formatTime(elapsedTime),
      totalTime: formatTime(elapsedTime),
      isTracking: false
    });
  };

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdate({ ...project, tasks: updatedTasks });
  };

  const handleAddTask = (title: string, type: 'daily' | 'weekly') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      type,
      dueDate: new Date().toISOString()
    };
    onUpdate({
      ...project,
      tasks: [...project.tasks, newTask]
    });
  };

  const activeTasks = project.tasks.filter(task => 
    task.type === taskView && !task.completed
  );

  const finishedTasks = project.tasks.filter(task => 
    task.type === taskView && task.completed
  );

  const calculateProgress = () => {
    const tasksOfType = project.tasks.filter(task => task.type === taskView);
    if (tasksOfType.length === 0) return 0;
    const completedTasks = tasksOfType.filter(task => task.completed).length;
    return Math.round((completedTasks / tasksOfType.length) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'completed': return 'bg-blue-500';
      case 'on-hold': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
      {/* Project Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(project.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Time Tracking */}
      <div className="flex items-center justify-between mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="font-mono">{formatTime(elapsedTime)}</span>
        </div>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isTracking ? 'bg-blue-500 animate-pulse' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min((elapsedTime / (8 * 3600)) * 100, 100)}%` }}
            />
          </div>
        </div>
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`p-2 rounded-lg ${
            isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {isTracking ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-blue-500" />
            <span className="font-medium">Progress</span>
          </div>
          <span className="text-sm font-medium">{calculateProgress()}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Task View Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setTaskView('daily')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              taskView === 'daily' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Daily Tasks
          </button>
          <button
            onClick={() => setTaskView('weekly')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              taskView === 'weekly' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            Weekly Tasks
          </button>
        </div>
        <button
          onClick={() => setShowFinishedTasks(!showFinishedTasks)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            showFinishedTasks
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Finished Tasks</span>
        </button>
      </div>

      {/* Active Tasks */}
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium mb-3">Active Tasks</h4>
          <TaskList
            tasks={activeTasks}
            taskType={taskView}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />
        </div>

        {/* Finished Tasks */}
        {showFinishedTasks && finishedTasks.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-3">Finished Tasks</h4>
            <div className="space-y-2">
              {finishedTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center"
                  >
                    <span className="text-xs">✓</span>
                  </button>
                  <span className="text-gray-500 line-through">
                    {task.title}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}