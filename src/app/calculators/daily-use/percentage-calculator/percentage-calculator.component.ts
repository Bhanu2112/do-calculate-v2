import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesModule } from '../../../core/services/services.module';
import { SimilarcalculatorsComponent } from "../../../shared/components/similarcalculators/similarcalculators.component";


interface CalculationType {
  id: string;
  name: string;
  description: string;
}
@Component({
  selector: 'app-percentage-calculator',
  imports: [CommonModule, FormsModule, SimilarcalculatorsComponent,ServicesModule],
  templateUrl: './percentage-calculator.component.html',
  styleUrl: './percentage-calculator.component.css'
})
export class PercentageCalculatorComponent {

  calculators:string[] = []

  Math = Math
  calculationTypes: CalculationType[] = [
    {
      id: 'percentOfNumber',
      name: 'Percentage of a Number',
      description: 'Calculate what percentage value is of a number'
    },
    {
      id: 'percentChange',
      name: 'Percentage Change',
      description: 'Calculate the percentage increase/decrease between two numbers'
    },
    {
      id: 'findPercentage',
      name: 'Find Percentage',
      description: 'Find what percentage one number is of another number'
    },
    {
      id: 'tipCalculator',
      name: 'Tip Calculator',
      description: 'Calculate tip amount and total bill'
    }
  ];

  selectedType: string = 'percentOfNumber';

  // For "Percentage of a Number"
  percentValue: number = 10;
  numberValue: number = 100;
  percentOfNumberResult: number = 10;

  // For "Percentage Change"
  startValue: number = 100;
  endValue: number = 120;
  percentChangeResult: number = 20;

  // For "Find Percentage"
  partValue: number = 25;
  wholeValue: number = 100;
  findPercentageResult: number = 25;

  // For "Tip Calculator"
  billAmount: number = 50;
  tipPercent: number = 15;
  tipAmount: number = 7.5;
  totalBill: number = 57.5;

  // Dark mode
  isDarkMode: boolean = false;

  // History
  calculationHistory: {type: string, inputs: string, result: string, timestamp: Date}[] = [];

  constructor(private routes:ActivatedRoute,private service:ServicesModule){


  }

  ngOnInit(): void {

    this.loadHistory();
    this.calculateResult();

    this.calculators = this.service.findSimilarCalculators(this.routes.snapshot.url.join('/').replace('-',' '));

  }

  selectCalculationType(typeId: string): void {
    this.selectedType = typeId;
    this.calculateResult();
  }

  calculateResult(): void {
    switch(this.selectedType) {
      case 'percentOfNumber':
        this.percentOfNumberResult = (this.percentValue / 100) * this.numberValue;
        this.addToHistory(
          'Percentage of a Number',
          `${this.percentValue}% of ${this.numberValue}`,
          this.percentOfNumberResult.toString()
        );
        break;

      case 'percentChange':
        this.percentChangeResult = ((this.endValue - this.startValue) / Math.abs(this.startValue)) * 100;
        this.addToHistory(
          'Percentage Change',
          `From ${this.startValue} to ${this.endValue}`,
          `${this.percentChangeResult.toFixed(2)}%`
        );
        break;

      case 'findPercentage':
        this.findPercentageResult = (this.partValue / this.wholeValue) * 100;
        this.addToHistory(
          'Find Percentage',
          `${this.partValue} is what % of ${this.wholeValue}`,
          `${this.findPercentageResult.toFixed(2)}%`
        );
        break;

      case 'tipCalculator':
        this.tipAmount = (this.tipPercent / 100) * this.billAmount;
        this.totalBill = this.billAmount + this.tipAmount;
        this.addToHistory(
          'Tip Calculator',
          `${this.tipPercent}% tip on $${this.billAmount.toFixed(2)}`,
          `Tip: $${this.tipAmount.toFixed(2)}, Total: $${this.totalBill.toFixed(2)}`
        );
        break;
    }
  }

  formatNumber(value: number): string {
    if (isNaN(value)) return '0';
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(2);
  }

  addToHistory(type: string, inputs: string, result: string): void {
    this.calculationHistory.unshift({
      type,
      inputs,
      result,
      timestamp: new Date()
    });

    // Keep only last 10 calculations
    if (this.calculationHistory.length > 10) {
      this.calculationHistory.pop();
    }

    this.saveHistory();
  }

  clearHistory(): void {
    this.calculationHistory = [];
    this.saveHistory();
  }

  saveHistory(): void {
    localStorage.setItem('docalculate_percentage_history', JSON.stringify(this.calculationHistory));
  }

  loadHistory(): void {
    const savedHistory = localStorage.getItem('docalculate_percentage_history');
    if (savedHistory) {
      this.calculationHistory = JSON.parse(savedHistory);
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
