interface SystemPermissions {
  requestScreenTime: () => Promise<PermissionState>;
  getAppUsage: () => Promise<AppUsageData[]>;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  sendSystemNotification: (
    title: string, 
    body: string, 
    options?: {
      actionButtons?: Array<{
        text: string;
        action: () => void;
      }>;
      timeout?: number;
      sound?: boolean;
    }
  ) => Promise<void>;
}

declare global {
  interface Window {
    systemPermissions: SystemPermissions;
    electron: {
      getCurrentWindow: () => any;
      getActiveWindow: () => Promise<{
        appName: string;
        title: string;
        isCreative?: boolean;
        timestamp?: Date;
      }>;
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>;
        on: (channel: string, callback: Function) => void;
      };
    };
  }
}

export {}; 