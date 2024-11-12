import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FocusState {
  isActive: boolean;
  currentProjectId: string | null;
  startTime: string | null;
  duration: number;
}

const initialState: FocusState = {
  isActive: false,
  currentProjectId: null,
  startTime: null,
  duration: 0,
};

const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    startFocus: (state, action: PayloadAction<string>) => {
      state.isActive = true;
      state.currentProjectId = action.payload;
      state.startTime = new Date().toISOString();
    },
    endFocus: (state) => {
      state.isActive = false;
      state.currentProjectId = null;
      state.startTime = null;
    },
    updateDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
});

export const { startFocus, endFocus, updateDuration } = focusSlice.actions;
export default focusSlice.reducer; 