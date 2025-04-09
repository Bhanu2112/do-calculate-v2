import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ServicesModule } from '../../../core/services/services.module';
import { SimilarcalculatorsComponent } from "../../../shared/components/similarcalculators/similarcalculators.component";

@Component({
  selector: 'app-digital-storage-converter',
  imports: [CommonModule, FormsModule, MatIconModule, ServicesModule, SimilarcalculatorsComponent],
  templateUrl: './digital-storage-converter.component.html',
  styleUrl: './digital-storage-converter.component.css'
})
export class DigitalStorageConverterComponent {
  inputValue: number = 1;

  fromUnit: string = 'Bytes';
  toUnit: string = 'Kilobytes';

  result: number | null = null;
  toValue: number = 0;
  historyItems: { from: string, to: string, timestamp: Date }[] = [];

  units: { name: string, symbol: string }[] = [
    { name: 'Bits', symbol: 'b' },
    { name: 'Bytes', symbol: 'B' },
    { name: 'Kilobits', symbol: 'Kb' },
    { name: 'Kilobytes', symbol: 'KB' },
    { name: 'Megabits', symbol: 'Mb' },
    { name: 'Megabytes', symbol: 'MB' },
    { name: 'Gigabits', symbol: 'Gb' },
    { name: 'Gigabytes', symbol: 'GB' },
    { name: 'Terabits', symbol: 'Tb' },
    { name: 'Terabytes', symbol: 'TB' },
    { name: 'Petabits', symbol: 'Pb' },
    { name: 'Petabytes', symbol: 'PB' },
    { name: 'Exabits', symbol: 'Eb' },
    { name: 'Exabytes', symbol: 'EB' },
    { name: 'Zettabits', symbol: 'Zb' },
    { name: 'Zettabytes', symbol: 'ZB' },
    { name: 'Yottabits', symbol: 'Yb' },
    { name: 'Yottabytes', symbol: 'YB' }
  ];


  // Conversion rates (relative to Bits)
  conversionRates: { [key: string]: number } = {
    'Bits': 1,
    'Bytes': 8,
    'Kilobits': 1024,
    'Kilobytes': 1024 * 8,
    'Megabits': 1024 ** 2,
    'Megabytes': (1024 ** 2) * 8,
    'Gigabits': 1024 ** 3,
    'Gigabytes': (1024 ** 3) * 8,
    'Terabits': 1024 ** 4,
    'Terabytes': (1024 ** 4) * 8,
    'Petabits': 1024 ** 5,
    'Petabytes': (1024 ** 5) * 8,
    'Exabits': 1024 ** 6,
    'Exabytes': (1024 ** 6) * 8,
    'Zettabits': 1024 ** 7,
    'Zettabytes': (1024 ** 7) * 8,
    'Yottabits': 1024 ** 8,
    'Yottabytes': (1024 ** 8) * 8
  };

  calculators:string[]=[]
  constructor(private routes:ActivatedRoute,private service:ServicesModule){


  }

  ngOnInit(){
    this.convert();
    let categoryName = this.routes.snapshot.url.join('/').replace("-"," ");

    this.calculators = this.service.findSimilarCalculators(categoryName);
    console.log(this.calculators);
  }

  convert() {

    const bits = this.inputValue * this.conversionRates[this.fromUnit];
    // Convert Bits to the target unit
    this.toValue = bits / this.conversionRates[this.toUnit];

    this.addToHistory();

  }


  swapUnits() {

    [this.fromUnit, this.toUnit] = [this.toUnit, this.fromUnit];
    [this.inputValue, this.toValue] = [this.toValue, this.inputValue];
  }

  formatValue(value: number | null): string {
    return value !== null ? parseFloat(value.toFixed(4)).toString() : '';
  }

  onFromValueChange(): void {
    this.convert();
  }

  copyResult(): void {
    const result = `${this.formatValue(this.inputValue)} ${this.fromUnit} = ${this.formatValue(this.toValue)} ${this.toUnit}`;
    navigator.clipboard.writeText(result);
  }

  addToHistory(): void {
    const historyItem = {
      from: `${this.formatValue(this.inputValue)} ${this.fromUnit}`,
      to: `${this.formatValue(this.toValue)} ${this.toUnit}`,
      timestamp: new Date()
    };

    this.historyItems.unshift(historyItem);

    // Keep only the last 10 items
    if (this.historyItems.length > 10) {
      this.historyItems.pop();
    }
  }
  clearHistory(): void {
    this.historyItems = [];
  }

}
