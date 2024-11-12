import { Mock } from 'jest';

export interface AppUsageData {
  appName: string;
  duration: number;
  icon?: string;
  lastActive?: Date;
}

export interface SystemPermissions {
  requestScreenTime: () => Promise<'granted' | 'denied'>;
  getAppUsage: () => Promise<AppUsageData[]>;
  requestNotificationPermission: () => Promise<'granted' | 'denied'>;
}

declare global {
  namespace NodeJS {
    interface Global {
      systemPermissions: {
        requestScreenTime: Mock;
        getAppUsage: Mock;
        requestNotificationPermission: Mock;
      };
      Notification: Mock & {
        permission: string;
        requestPermission: Mock;
      };
    }
  }

  interface Window {
    systemPermissions: SystemPermissions;
  }
}

export {}; 