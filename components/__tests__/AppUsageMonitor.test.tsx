import React from 'react';
import { render, screen } from '../../utils/testUtils';
import AppUsageMonitor from '../AppUsageMonitor';
import { RootState } from '../../types/store';
import { act } from 'react';

jest.useFakeTimers();

describe('AppUsageMonitor Component', () => {
  const mockActiveWindow = {
    title: 'TimeFlow Project',
    owner: {
      name: 'Visual Studio Code',
      path: '/Applications/Visual Studio Code.app',
    },
  };

  const initialState: Partial<RootState> = {
    focus: {
      isActive: true,
      currentProjectId: '1',
      startTime: new Date().toISOString(),
      duration: 0,
    },
  };

  beforeEach(() => {
    jest.spyOn(window, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('starts monitoring when focus mode is active', () => {
    const { store } = render(<AppUsageMonitor />, { preloadedState: initialState });
    expect(setInterval).toHaveBeenCalled();
  });

  it('stops monitoring when focus mode is inactive', () => {
    const inactiveState = {
      ...initialState,
      focus: { ...initialState.focus, isActive: false },
    };
    const { store } = render(<AppUsageMonitor />, { preloadedState: inactiveState });
    expect(setInterval).not.toHaveBeenCalled();
  });

  it('records app usage data', () => {
    const { store } = render(<AppUsageMonitor />, { preloadedState: initialState });
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const state = store.getState();
    expect(state.analytics.appUsage).toHaveLength(1);
  });
}); 