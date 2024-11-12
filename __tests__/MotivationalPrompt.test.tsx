import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { renderWithProvider } from '../../utils/testUtils';
import MotivationalPrompt from '../MotivationalPrompt';
import { RootState } from '../../types/store';

describe('MotivationalPrompt', () => {
  const mockState: Partial<RootState> = {
    focus: {
      isActive: false,
      currentProjectId: null,
      startTime: null,
      duration: 0,
    },
  };

  it('shows and hides prompts', async () => {
    renderWithProvider(<MotivationalPrompt />, { preloadedState: mockState });
    
    // Initially not visible
    expect(screen.queryByText(/Stay focused/)).not.toBeInTheDocument();

    // When focus mode is active
    const activeState = {
      ...mockState,
      focus: { ...mockState.focus, isActive: true },
    };
    
    renderWithProvider(<MotivationalPrompt />, { preloadedState: activeState });
    expect(screen.getByTestId('prompt-text')).toBeInTheDocument();
  });
}); 