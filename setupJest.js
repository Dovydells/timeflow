// Set up specific Jest configuration for CRA
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Increase memory limit for Node
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Configure test environment
global.fetch = require('jest-fetch-mock');
require('@testing-library/jest-dom');

// Mock timers
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
}); 