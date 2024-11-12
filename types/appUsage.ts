export interface AppUsageData {
  id: string;
  appName: string;
  title: string;
  url?: string;
  startTime: string;
  endTime?: string;
  duration: number;
  projectId?: string;
}

export interface AppUsageStats {
  totalTime: number;
  appBreakdown: {
    [key: string]: number;
  };
  mostUsedApps: string[];
} 