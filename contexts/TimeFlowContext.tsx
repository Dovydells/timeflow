import React, { createContext, useContext } from 'react';
import { TimeFlowContextType } from '../types/context';

const defaultContext: TimeFlowContextType = {
  isTracking: false,
  appUsage: [],
  projects: [],
  tasks: [],
  activeProject: null,
  updateAppUsage: () => {},
  addProject: () => {},
  removeProject: () => {},
  updateProject: () => {},
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
  setActiveProject: () => {},
  startTracking: () => {},
  stopTracking: () => {}
};

export const TimeFlowContext = createContext<TimeFlowContextType>(defaultContext);

export const useTimeFlow = () => useContext(TimeFlowContext);

export const TimeFlowProvider: React.FC<{
  children: React.ReactNode;
  value?: Partial<TimeFlowContextType>;
}> = ({ children, value = {} }) => {
  return (
    <TimeFlowContext.Provider value={{ ...defaultContext, ...value }}>
      {children}
    </TimeFlowContext.Provider>
  );
}; 