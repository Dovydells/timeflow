import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';
import ProjectForm from './ProjectForm';

const ProjectList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <button 
        data-testid="add-project-button"
        onClick={() => setShowForm(true)}
      >
        Add Project
      </button>
      {showForm && <ProjectForm />}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList; 