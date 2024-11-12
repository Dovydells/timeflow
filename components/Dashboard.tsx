import React from 'react';
import { useTimeFlow } from '../contexts/TimeFlowContext';
import ProjectList from './ProjectList';
import { TaskList } from './TaskList';
import AppUsageStats from './AppUsageStats';

const Dashboard: React.FC = () => {
  const { projects, tasks, appUsage } = useTimeFlow();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <ProjectList projects={projects} />
        <TaskList tasks={tasks} />
        <AppUsageStats appUsage={appUsage} />
      </div>
    </div>
  );
};

export default Dashboard;