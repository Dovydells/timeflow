import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';

const AnalyticsDashboard: React.FC = () => {
  const { appUsage, dailyStats } = useSelector((state: RootState) => state.analytics);
  const projects = useSelector((state: RootState) => state.projects.projects);

  const totalCreativeTime = appUsage.reduce((total, usage) => total + usage.duration, 0);
  const activeProjects = projects.filter(project => project.status === 'active').length;

  return (
    <div className="analytics-dashboard">
      <h2>Productivity Analytics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Creative Time</h3>
          <p>{totalCreativeTime}s</p>
        </div>
        <div className="metric-card">
          <h3>Task Completion</h3>
          <p>{dailyStats.completedTasks / projects.reduce((total, project) => total + project.tasks.length, 0) * 100}%</p>
          <small>{dailyStats.completedTasks} of {projects.reduce((total, project) => total + project.tasks.length, 0)} tasks</small>
        </div>
        <div className="metric-card">
          <h3>Active Projects</h3>
          <p>{activeProjects}</p>
        </div>
      </div>
      <div className="app-usage-chart">
        <h3>App Usage Breakdown</h3>
        {appUsage.map(usage => (
          <div key={usage.id}>
            <span>{usage.appName}</span>
            <span>{usage.duration}s</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 