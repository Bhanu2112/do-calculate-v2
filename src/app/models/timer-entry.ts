export interface TimerEntry {
  id: number;
  name: string;
  duration: number; // in seconds
  isRunning: boolean;
  startTime?: number; // timestamp
  colorClass: string;
}
