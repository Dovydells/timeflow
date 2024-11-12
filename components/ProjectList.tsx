import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';

const ProjectList: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <button data-testid="add-project-button">Add Project</button>
      {projects.map(project => (
        <div key={project.id} className="project-item">
          <h3>{project.name}</h3>
          <p>Tasks: {project.tasks.length}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList; 