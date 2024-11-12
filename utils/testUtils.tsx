import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../types/store';

// Import your reducers
import projectReducer from '../store/slices/projectSlice';
import taskReducer from '../store/slices/taskSlice';
import focusReducer from '../store/slices/focusSlice';
import analyticsReducer from '../store/slices/analyticsSlice';

interface RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore>;
  contextValue?: any;
}

function render(
  ui: ReactElement,
  {
    preloadedState = {} as PreloadedState<RootState>,
    store = configureStore({
      reducer: {
        projects: projectReducer,
        tasks: taskReducer,
        focus: focusReducer,
        analytics: analyticsReducer,
      },
      preloadedState,
    }),
    contextValue,
    ...renderOptions
  }: RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

// For backward compatibility
const renderWithProvider = render;

export * from '@testing-library/react';
export { render, renderWithProvider };