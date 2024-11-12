import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Project, ProjectStatus } from '../types';

interface NewProjectModalProps {
  onClose: () => void;
  onCreateProject: (project: Omit<Project, 'id' | 'tasks' | 'time' | 'isTracking' | 'progress'>) => void;
}

export function NewProjectModal({ onClose, onCreateProject }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    profit: '',
    expenses: '',
    tags: '',
    status: 'planned' as ProjectStatus
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const project = {
      name: formData.name,
      deadline: formData.deadline,
      profit: Number(formData.profit) || 0,
      expenses: Number(formData.expenses) || 0,
      status: formData.status,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    onCreateProject(project);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] w-full max-w-lg rounded-xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">New Project</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#2c2c2c] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#2c2c2c] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Design, Development"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#2c2c2c] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#2c2c2c] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Expected Profit (€)
                </label>
                <input
                  type="number"
                  name="profit"
                  required
                  value={formData.profit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2c2c2c] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Expected Expenses (€)
                </label>
                <input
                  type="number"
                  name="expenses"
                  required
                  value={formData.expenses}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2c2c2c] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-400 hover:text-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}