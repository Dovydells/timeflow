import React from 'react';
import { render, screen } from '../../utils/testUtils';
import AnalyticsDashboard from '../AnalyticsDashboard';
import { RootState } from '../../types/store';

describe('AnalyticsDashboard', () => {
  const mockState: Partial<RootState> = {
    analytics: {
      appUsage: [
        {
          id: '1',
          appName: 'DaVinci Resolve Studio',
          title: 'Video Editing',
          startTime: new Date().toISOString(),
          duration: 7200, // 2h
        },
        {
          id: '2',
          appName: 'Adobe Premiere Pro',
          title: 'Project Edit',
          startTime: new Date().toISOString(),
          duration: 3600, // 1h
        }
      ],
      dailyStats: {
        totalFocusTime: 10800,
        completedTasks: 2,
        productiveApps: ['DaVinci Resolve Studio', 'Adobe Premiere Pro'],
      },
      status: 'succeeded',
      error: null,
    },
    projects: {
      projects: [
        {
          id: '1',
          name: 'Project 1',
          status: 'active',
          deadline: new Date().toISOString(),
          profit: 1000,
          expenses: 200,
          totalTime: '10:00:00',
          tasks: [],
          appUsage: [],
          isTracking: false,
        },
        {
          id: '2',
          name: 'Project 2',
          status: 'active',
          deadline: new Date().toISOString(),
          profit: 2000,
          expenses: 400,
          totalTime: '20:00:00',
          tasks: [],
          appUsage: [],
          isTracking: false,
        }
      ],
      status: 'succeeded',
      error: null,
    }
  };

  it('displays productivity metrics', () => {
    render(<AnalyticsDashboard />, { preloadedState: mockState });
    expect(screen.getByText('10800s')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Active projects
  });

  it('shows app usage breakdown', () => {
    render(<AnalyticsDashboard />, { preloadedState: mockState });
    expect(screen.getByText('DaVinci Resolve Studio')).toBeInTheDocument();
    expect(screen.getByText('7200s')).toBeInTheDocument();
    expect(screen.getByText('Adobe Premiere Pro')).toBeInTheDocument();
    expect(screen.getByText('3600s')).toBeInTheDocument();
  });
}); 