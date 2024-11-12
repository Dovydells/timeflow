import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './styles/index.css';
import { systemIntegration } from './services/systemIntegration';
import { SystemPermissions } from './types/global';

// Initialize system integration
const systemPermissions: Partial<SystemPermissions> = {
  requestScreenTime: () => systemIntegration.requestScreenTimePermission(),
  getAppUsage: () => systemIntegration.getAppUsage(),
  requestNotificationPermission: () => systemIntegration.requestNotificationPermission(),
};

window.systemPermissions = systemPermissions as SystemPermissions;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 