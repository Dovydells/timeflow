import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../store/slices/projectSlice';
import { Project, ProjectStatus } from '../types';

const ProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: name.trim(),
        status: 'active' as ProjectStatus,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        profit: 0,
        expenses: 0,
        totalTime: '00:00:00',
        tasks: [],
        appUsage: [],
        isTracking: false,
      };
      dispatch(addProject(newProject));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="project-form">
      <label htmlFor="project-name">Project Name</label>
      <input
        id="project-name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Project Name"
      />
      <button type="submit" data-testid="save-project-button">Save Project</button>
    </form>
  );
};

export default ProjectForm; 