import activeWin from 'active-win';

const CREATIVE_APPS = [
  'DaVinci Resolve Studio',
  'Adobe After Effects',
  'Adobe Photoshop',
  'Adobe Premiere Pro',
  'Adobe Illustrator',
  'Final Cut Pro'
];

export const getSystemPermissions = () => {
  return {
    requestScreenTimePermission: async () => {
      try {
        await activeWin();
        return 'granted' as PermissionState;
      } catch {
        return 'denied' as PermissionState;
      }
    },
    
    getAppUsageData: async () => {
      try {
        const activeWindow = await activeWin();
        if (activeWindow?.owner?.name && CREATIVE_APPS.includes(activeWindow.owner.name)) {
          return [{
            appName: activeWindow.owner.name,
            duration: 0,
            lastActive: new Date(),
            icon: `/icons/${activeWindow.owner.name.toLowerCase().replace(/\s+/g, '-')}.png`
          }];
        }
        return [];
      } catch (error) {
        console.error('Error getting app usage:', error);
        return [];
      }
    }
  };
}; 