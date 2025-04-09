import { ServicesModule } from './../../../core/services/services.module';
import { Component } from '@angular/core';
import { TimerEntry } from '../../../models/timer-entry';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimilarcalculatorsComponent } from "../../../shared/components/similarcalculators/similarcalculators.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-tracker',
  imports: [
    CommonModule,
    FormsModule,
    SimilarcalculatorsComponent,
    ServicesModule
],
  templateUrl: './time-tracker.component.html',
  styleUrl: './time-tracker.component.css'
})
export class TimeTrackerComponent {

  timers: TimerEntry[] = [];
  newTimerName: string = '';
  totalTime: number = 0;
  isDarkMode: boolean = false;
  timerInterval: any;
  colorClasses: string[] = [
    'bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-pink-500',
    'bg-purple-500', 'bg-indigo-500', 'bg-teal-500', 'bg-red-500'
  ];

  calculators:string[]=[]

  constructor(private routes:ActivatedRoute,private service:ServicesModule){


  }

  ngOnInit(): void {
    this.loadTimers();
    this.startTimerUpdates();

    this.routes.snapshot.url.join('/').replace('-',' ');

    this.calculators = this.service.findSimilarCalculators(this.routes.snapshot.url.join('/').replace('-',' '));
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimerUpdates(): void {
    this.timerInterval = setInterval(() => {
      let needsUpdate = false;
      const now = Date.now();

      for (const timer of this.timers) {
        if (timer.isRunning && timer.startTime) {
          const elapsedSeconds = Math.floor((now - timer.startTime) / 1000);
          timer.duration += elapsedSeconds;
          timer.startTime = now;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        this.updateTotalTime();
        this.saveTimers();
      }
    }, 1000);
  }

  createTimer(): void {
    if (!this.newTimerName.trim()) return;

    const randomColorClass = this.colorClasses[Math.floor(Math.random() * this.colorClasses.length)];

    const newTimer: TimerEntry = {
      id: Date.now(),
      name: this.newTimerName.trim(),
      duration: 0,
      isRunning: false,
      colorClass: randomColorClass
    };

    this.timers.push(newTimer);
    this.newTimerName = '';
    this.saveTimers();
  }

  toggleTimer(timer: TimerEntry): void {
    if (timer.isRunning) {
      // Stop the timer
      timer.isRunning = false;
      if (timer.startTime) {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - timer.startTime) / 1000);
        timer.duration += elapsedSeconds;
        timer.startTime = undefined;
      }
    } else {
      // Start the timer
      timer.isRunning = true;
      timer.startTime = Date.now();
    }

    this.saveTimers();
  }

  resetTimer(timer: TimerEntry): void {
    timer.duration = 0;
    if (timer.isRunning) {
      timer.startTime = Date.now();
    }
    this.updateTotalTime();
    this.saveTimers();
  }

  deleteTimer(timer: TimerEntry): void {
    this.timers = this.timers.filter(t => t.id !== timer.id);
    this.updateTotalTime();
    this.saveTimers();
  }

  updateTotalTime(): void {
    this.totalTime = this.timers.reduce((sum, timer) => sum + timer.duration, 0);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  saveTimers(): void {
    localStorage.setItem('docalculate_timers', JSON.stringify(this.timers));
  }

  loadTimers(): void {
    const savedTimers = localStorage.getItem('docalculate_timers');
    if (savedTimers) {
      this.timers = JSON.parse(savedTimers);
      // Ensure no timers are running after page reload
      this.timers.forEach(timer => {
        timer.isRunning = false;
        timer.startTime = undefined;
      });
      this.updateTotalTime();
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  loadThemePreference(): void {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference) {
      this.isDarkMode = savedPreference === 'true';
      this.applyTheme();
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDarkMode = true;
        this.applyTheme();
      }
    }
  }

  applyTheme(): void {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
