import React from 'react';
import Dashboard from './components/Dashboard';
import FocusMode from './components/FocusMode';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import NotificationSystem from './components/NotificationSystem';
import MotivationalPrompt from './components/MotivationalPrompt';

const App: React.FC = () => {
  return (
    <>
      <div className="permissions-status">
        <div className="permissions-warning">
          Please grant necessary permissions for full functionality
        </div>
      </div>
      <h1 data-testid="app-title">TimeFlow</h1>
      <MotivationalPrompt />
      <div className="app-container">
        <Dashboard />
        <FocusMode />
        <AnalyticsDashboard />
      </div>
      <NotificationSystem />
    </>
  );
};

export default App;