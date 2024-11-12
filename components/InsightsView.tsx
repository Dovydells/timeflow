import React from 'react';
import { useTimeFlow } from '../context/TimeFlowContext';

export const InsightsView: React.FC = () => {
  const { appUsage, projects } = useTimeFlow();

  // Implementation will be added later
  return null;
};

export default InsightsView; 