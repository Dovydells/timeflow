import '@testing-library/jest-dom';
import { act } from 'react';

// Mock Notification API
class NotificationMock {
  static permission = 'granted';
  static requestPermission = jest.fn().mockResolvedValue('granted');

  constructor(title: string, options: any) {
    // Constructor implementation
  }
}

global.Notification = NotificationMock as any;

// Increase default timeout
jest.setTimeout(30000);

beforeEach(() => {
  jest.clearAllMocks();

  // Mock window.electron
  (window as any).electron = {
    getCurrentWindow: jest.fn(),
    getActiveWindow: jest.fn().mockResolvedValue({
      appName: 'DaVinci Resolve Studio',
      title: 'Project1.drp',
      isCreative: true
    })
  };

  // Mock window.systemPermissions
  (window as any).systemPermissions = {
    requestNotificationPermission: jest.fn().mockResolvedValue('granted'),
    sendSystemNotification: jest.fn().mockResolvedValue(undefined),
    requestScreenTime: jest.fn().mockResolvedValue('granted'),
    getAppUsage: jest.fn().mockResolvedValue([])
  };

  // Mock timers
  jest.useFakeTimers('modern');
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

// Helper to wait for all pending promises
global.flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

// Helper to wrap async operations
global.actAsync = async (callback: () => Promise<void>) => {
  await act(async () => {
    await callback();
    await global.flushPromises();
  });
};