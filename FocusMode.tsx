import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/store';
import { startFocus, endFocus } from '../store/slices/focusSlice';

const FocusMode: React.FC = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.focus.isActive);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [selectedProject, setSelectedProject] = useState('');

  const handleToggleFocus = () => {
    if (isActive) {
      dispatch(endFocus());
    } else if (selectedProject) {
      dispatch(startFocus(selectedProject));
    }
  };

  return (
    <div className="focus-mode" data-testid="focus-mode">
      <h2>Focus Mode</h2>
      <select 
        value={selectedProject} 
        onChange={(e) => setSelectedProject(e.target.value)}
        disabled={isActive}
        data-testid="project-select"
      >
        <option value="">Select a project</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <button 
        onClick={handleToggleFocus}
        data-testid="focus-toggle-button"
        disabled={!isActive && !selectedProject}
      >
        {isActive ? 'End Focus' : 'Start Focus'}
      </button>
    </div>
  );
};

export default FocusMode;