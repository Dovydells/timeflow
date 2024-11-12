export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  if (minutes > 0) {
    return `${minutes}m${remainingSeconds > 0 ? ` ${remainingSeconds}s` : ''}`;
  }
  return `${remainingSeconds}s`;
};

export const formatTimeRange = (startTime: Date, endTime: Date): string => {
  return `${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`;
};

export const calculateDuration = (startTime: Date, endTime: Date): number => {
  return endTime.getTime() - startTime.getTime();
}; 