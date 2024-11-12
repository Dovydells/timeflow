import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvider } from '../../utils/testUtils';
import FocusMode from '../FocusMode';
import { RootState } from '../../types/store';

describe('Focus Mode', () => {
  const mockState: Partial<RootState> = {
    focus: {
      isActive: false,
      currentProjectId: null,
      startTime: null,
      duration: 0,
    },
    projects: {
      projects: [
        {
          id: '1',
          name: 'Test Project',
          status: 'active',
          deadline: new Date().toISOString(),
          profit: 1000,
          expenses: 200,
          totalTime: '10:00:00',
          tasks: [],
          appUsage: [],
          isTracking: false,
        }
      ],
      status: 'succeeded',
      error: null,
    }
  };

  it('starts focus session', () => {
    renderWithProvider(<FocusMode />, { preloadedState: mockState });
    
    const projectSelect = screen.getByRole('combobox');
    fireEvent.change(projectSelect, { target: { value: '1' } });
    
    const startButton = screen.getByTestId('focus-toggle-button');
    fireEvent.click(startButton);
    
    expect(screen.getByText('End Focus')).toBeInTheDocument();
  });

  it('handles focus breaks', () => {
    const activeState = {
      ...mockState,
      focus: { ...mockState.focus, isActive: true, currentProjectId: '1' }
    };
    
    renderWithProvider(<FocusMode />, { preloadedState: activeState });
    
    const stopButton = screen.getByTestId('focus-toggle-button');
    fireEvent.click(stopButton);
    
    expect(screen.getByText('Start Focus')).toBeInTheDocument();
  });
});