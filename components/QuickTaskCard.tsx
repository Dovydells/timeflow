import React, { useState } from 'react';
import { Zap, Plus, Calendar } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import type { Task } from '../types';

export function QuickTaskCard() {
  const { projects, updateProject } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [taskType, setTaskType] = useState<'daily' | 'weekly'>('daily');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !selectedProject) return;

    const project = projects.find(p => p.id === selectedProject);
    if (!project) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      completed: false,
      type: taskType,
      dueDate: new Date(dueDate).toISOString()
    };

    updateProject({
      ...project,
      tasks: [...project.tasks, newTask]
    });

    setTaskTitle('');
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Quick Task</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add a new task</p>
            </div>
          </div>
          <Plus className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Task Type</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setTaskType('daily')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  taskType === 'daily'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setTaskType('weekly')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  taskType === 'weekly'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}