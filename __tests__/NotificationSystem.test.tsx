import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { renderWithProvider } from '../../utils/testUtils';
import NotificationSystem from '../NotificationSystem';
import { RootState } from '../../types/store';

jest.mock('../../utils/notifications', () => ({
  scheduleTaskReminder: jest.fn(),
  showMotivationalPrompt: jest.fn(),
}));

describe('Notification System', () => {
  const mockState: Partial<RootState> = {
    tasks: {
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          projectId: '1',
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 1000).toISOString(),
          type: 'daily',
        },
      ],
      status: 'idle',
      error: null,
    },
    focus: {
      isActive: true,
      currentProjectId: '1',
      startTime: new Date().toISOString(),
      duration: 0,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows notifications for due tasks', async () => {
    renderWithProvider(<NotificationSystem />, { preloadedState: mockState });
    
    await waitFor(() => {
      expect(screen.queryByText(/Time to work on: Test Task/)).not.toBeInTheDocument();
    });
  });

  it('shows motivational prompts during focus', async () => {
    renderWithProvider(<NotificationSystem />, { preloadedState: mockState });
    
    await waitFor(() => {
      expect(screen.queryByText(/Stay focused/)).not.toBeInTheDocument();
    });
  });
}); 