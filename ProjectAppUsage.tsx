import React from 'react';
import { useTimeFlow } from '../contexts/TimeFlowContext';

interface AppData {
  projectId: string;
  apps: {
    name: string;
    windowTitle: string;
    startTime: Date;
    endTime: Date;
    duration: number;
  }[];
}

interface ProjectAppUsageProps {
  appData: AppData;
}

const ProjectAppUsage: React.FC<ProjectAppUsageProps> = ({ appData }) => {
  const { currentProject } = useTimeFlow();

  return (
    <div>
      <h2>App Usage for {currentProject?.name}</h2>
      <div>
        {appData.apps.map((app, index) => (
          <div key={index}>
            <h3>{app.name}</h3>
            <p>Window: {app.windowTitle}</p>
            <p>Duration: {app.duration / 1000 / 60} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAppUsage; 