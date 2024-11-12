import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { NewProjectModal } from './NewProjectModal';
import { useProjects } from '../hooks/useProjects';

export function Projects() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const { projects, addProject, deleteProject, updateProject } = useProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={deleteProject}
            onUpdate={updateProject}
          />
        ))}
      </div>

      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreateProject={addProject}
        />
      )}
    </div>
  );
}