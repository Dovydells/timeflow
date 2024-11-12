import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppUsageData } from '../types';

interface AnalyticsState {
  appUsage: AppUsageData[];
  dailyStats: {
    totalFocusTime: number;
    completedTasks: number;
    productiveApps: string[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnalyticsState = {
  appUsage: [],
  dailyStats: {
    totalFocusTime: 0,
    completedTasks: 0,
    productiveApps: [],
  },
  status: 'idle',
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    addAppUsage: (state, action: PayloadAction<AppUsageData>) => {
      state.appUsage.push(action.payload);
      state.status = 'succeeded';
    },
    updateDailyStats: (state, action: PayloadAction<typeof initialState.dailyStats>) => {
      state.dailyStats = action.payload;
    },
    clearAnalytics: (state) => {
      state.appUsage = [];
      state.dailyStats = initialState.dailyStats;
    },
  },
});

export const { addAppUsage, updateDailyStats, clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer; 