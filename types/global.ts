export interface AppUsageData {
  appName: string;
  duration: number;
  lastActive: Date;
  icon?: string;
}

export interface SystemPermissions {
  requestScreenTime: () => Promise<PermissionState>;
  getAppUsage: () => Promise<AppUsageData[]>;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  sendSystemNotification: (title: string, body: string, options?: {
    actionButtons?: Array<{
      text: string;
      action: () => void;
    }>;
    timeout?: number;
    sound?: boolean;
  }) => Promise<void>;
}

declare global {
  interface Window {
    systemPermissions: SystemPermissions;
  }
}

export {}; 