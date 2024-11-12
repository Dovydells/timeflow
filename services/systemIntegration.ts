import { AppUsageData } from '../types/global';

class SystemIntegration {
  private static instance: SystemIntegration;
  private activeApps: Map<string, { startTime: Date; duration: number }>;
  private lastCheck: Date;

  private constructor() {
    this.activeApps = new Map();
    this.lastCheck = new Date();
  }

  static getInstance(): SystemIntegration {
    if (!SystemIntegration.instance) {
      SystemIntegration.instance = new SystemIntegration();
    }
    return SystemIntegration.instance;
  }

  async requestScreenTimePermission(): Promise<'granted' | 'denied'> {
    try {
      // For macOS, we'll use the 'system-permissions' module (you'll need to install it)
      // @ts-ignore
      const { getScreenCaptureAccess } = require('system-permissions');
      const hasPermission = await getScreenCaptureAccess();
      return hasPermission ? 'granted' : 'denied';
    } catch (error) {
      console.error('Error requesting screen time permission:', error);
      return 'denied';
    }
  }

  async getAppUsage(): Promise<AppUsageData[]> {
    try {
      // For macOS, we'll use the 'active-win' module (you'll need to install it)
      // @ts-ignore
      const activeWin = require('active-win');
      const currentWindow = await activeWin();
      
      const currentTime = new Date();
      const usageData: AppUsageData[] = [];

      // Check if the active window is one of our tracked apps
      if (currentWindow) {
        const appName = currentWindow.owner.name;
        if (this.isCreativeApp(appName)) {
          // Update or create app tracking data
          const appData = this.activeApps.get(appName) || {
            startTime: currentTime,
            duration: 0
          };

          const timeDiff = (currentTime.getTime() - this.lastCheck.getTime()) / 1000;
          appData.duration += timeDiff;

          this.activeApps.set(appName, appData);

          usageData.push({
            appName,
            duration: appData.duration,
            lastActive: currentTime,
            icon: this.getAppIcon(appName)
          });
        }
      }

      this.lastCheck = currentTime;
      return usageData;
    } catch (error) {
      console.error('Error getting app usage:', error);
      return [];
    }
  }

  private isCreativeApp(appName: string): boolean {
    const creativeApps = [
      'DaVinci Resolve Studio',
      'Adobe After Effects',
      'Adobe Photoshop'
    ];
    return creativeApps.some(app => appName.includes(app));
  }

  private getAppIcon(appName: string): string {
    const iconMap: { [key: string]: string } = {
      'DaVinci Resolve Studio': '/icons/davinci.png',
      'Adobe After Effects': '/icons/after-effects.png',
      'Adobe Photoshop': '/icons/photoshop.png'
    };
    return iconMap[appName] || '';
  }

  async requestNotificationPermission(): Promise<'granted' | 'denied'> {
    try {
      // Use native macOS notification permissions
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission as 'granted' | 'denied';
      }
      return 'denied';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  showNotification(title: string, options: NotificationOptions): Notification {
    return new Notification(title, {
      ...options,
      silent: false,
    });
  }
}

export const systemIntegration = SystemIntegration.getInstance();