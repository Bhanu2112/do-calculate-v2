import { Component } from '@angular/core';
import { UnitCategory } from '../../../models/unit-category';
import { Unit } from '../../../models/unit';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SimilarcalculatorsComponent } from "../../../shared/components/similarcalculators/similarcalculators.component";
import { ActivatedRoute } from '@angular/router';
import { ServicesModule } from '../../../core/services/services.module';

@Component({
  selector: 'app-unit-converter',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    SimilarcalculatorsComponent,
    ServicesModule

],
  templateUrl: './unit-converter.component.html',
  styleUrl: './unit-converter.component.css'
})
export class UnitConverterComponent {


  categories: UnitCategory[] = [
    {
      name: 'Length',
      units: [
        { name: 'Millimeter', value: 0.001, symbol: 'mm' },
        { name: 'Centimeter', value: 0.01, symbol: 'cm' },
        { name: 'Meter', value: 1, symbol: 'm' },
        { name: 'Kilometer', value: 1000, symbol: 'km' },
        { name: 'Inch', value: 0.0254, symbol: 'in' },
        { name: 'Foot', value: 0.3048, symbol: 'ft' },
        { name: 'Yard', value: 0.9144, symbol: 'yd' },
        { name: 'Mile', value: 1609.34, symbol: 'mi' },
      ]
    },
    {
      name: 'Weight',
      units: [
        { name: 'Milligram', value: 0.000001, symbol: 'mg' },
        { name: 'Gram', value: 0.001, symbol: 'g' },
        { name: 'Kilogram', value: 1, symbol: 'kg' },
        { name: 'Metric Ton', value: 1000, symbol: 't' },
        { name: 'Ounce', value: 0.0283495, symbol: 'oz' },
        { name: 'Pound', value: 0.453592, symbol: 'lb' },
        { name: 'Stone', value: 6.35029, symbol: 'st' },
      ]
    },
    {
      name: 'Volume',
      units: [
        { name: 'Milliliter', value: 0.000001, symbol: 'ml' },
        { name: 'Liter', value: 0.001, symbol: 'L' },
        { name: 'Cubic Meter', value: 1, symbol: 'm³' },
        { name: 'Fluid Ounce', value: 0.0000295735, symbol: 'fl oz' },
        { name: 'Cup', value: 0.000236588, symbol: 'cup' },
        { name: 'Pint', value: 0.000473176, symbol: 'pt' },
        { name: 'Gallon', value: 0.00378541, symbol: 'gal' },
      ]
    },
    {
      name: 'Temperature',
      units: [
        { name: 'Celsius', value: 1, symbol: '°C' },
        { name: 'Fahrenheit', value: 1, symbol: '°F' },
        { name: 'Kelvin', value: 1, symbol: 'K' },
      ]
    },
    {
      name: 'Area',
      units: [
        { name: 'Square Meter', value: 1, symbol: 'm²' },
        { name: 'Square Kilometer', value: 1000000, symbol: 'km²' },
        { name: 'Square Inch', value: 0.00064516, symbol: 'in²' },
        { name: 'Square Foot', value: 0.092903, symbol: 'ft²' },
        { name: 'Square Yard', value: 0.836127, symbol: 'yd²' },
        { name: 'Acre', value: 4046.86, symbol: 'acre' },
        { name: 'Hectare', value: 10000, symbol: 'ha' },
      ]
    },
    {
      name: 'Time',
      units: [
        { name: 'Millisecond', value: 0.001, symbol: 'ms' },
        { name: 'Second', value: 1, symbol: 's' },
        { name: 'Minute', value: 60, symbol: 'min' },
        { name: 'Hour', value: 3600, symbol: 'hr' },
        { name: 'Day', value: 86400, symbol: 'day' },
        { name: 'Week', value: 604800, symbol: 'week' },
        { name: 'Month (avg)', value: 2629800, symbol: 'month' },
        { name: 'Year', value: 31557600, symbol: 'year' },
      ]
    },
  ];

  calculators:string[]=[]

  constructor(private routes:ActivatedRoute,private service:ServicesModule){


  }

  selectedCategory: UnitCategory = this.categories[0];
  fromUnit: Unit = this.selectedCategory.units[0];
  toUnit: Unit = this.selectedCategory.units[2];
  fromValue: number = 1;
  toValue: number = 0;
  historyItems: { from: string, to: string, timestamp: Date }[] = [];
  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.convert();

    let categoryName = this.routes.snapshot.url.join('/').replace("-"," ");

    this.calculators = this.service.findSimilarCalculators(categoryName);
  console.log(this.calculators);

  }

  onCategoryChange(categoryName: string): void {
    this.selectedCategory = this.categories.find(cat => cat.name === categoryName) || this.categories[0];
    this.fromUnit = this.selectedCategory.units[0];
    this.toUnit = this.selectedCategory.units[1];
    this.convert();
  }

  convert(): void {
    if (this.selectedCategory.name === 'Temperature') {
      this.convertTemperature();
    } else {
      // For non-temperature conversions
      const baseValue = this.fromValue * this.fromUnit.value;
      this.toValue = baseValue / this.toUnit.value;
    }

    this.addToHistory();
  }

  convertTemperature(): void {
    if (this.fromUnit.name === 'Celsius' && this.toUnit.name === 'Fahrenheit') {
      this.toValue = (this.fromValue * 9/5) + 32;
    } else if (this.fromUnit.name === 'Celsius' && this.toUnit.name === 'Kelvin') {
      this.toValue = this.fromValue + 273.15;
    } else if (this.fromUnit.name === 'Fahrenheit' && this.toUnit.name === 'Celsius') {
      this.toValue = (this.fromValue - 32) * 5/9;
    } else if (this.fromUnit.name === 'Fahrenheit' && this.toUnit.name === 'Kelvin') {
      this.toValue = (this.fromValue - 32) * 5/9 + 273.15;
    } else if (this.fromUnit.name === 'Kelvin' && this.toUnit.name === 'Celsius') {
      this.toValue = this.fromValue - 273.15;
    } else if (this.fromUnit.name === 'Kelvin' && this.toUnit.name === 'Fahrenheit') {
      this.toValue = (this.fromValue - 273.15) * 9/5 + 32;
    } else {
      // Same unit, no conversion needed
      this.toValue = this.fromValue;
    }
  }

  swapUnits(): void {
    [this.fromUnit, this.toUnit] = [this.toUnit, this.fromUnit];
    [this.fromValue, this.toValue] = [this.toValue, this.fromValue];
    this.addToHistory();
  }

  onFromValueChange(): void {
    this.convert();
  }

  formatValue(value: number): string {
    if (value === 0) return '0';

    // Handle very small and very large numbers
    if (Math.abs(value) < 0.000001 || Math.abs(value) > 1000000) {
      return value.toExponential(6);
    }

    // Regular formatting with appropriate decimal places
    return value.toPrecision(7).replace(/\.?0+$/, '');
  }

  addToHistory(): void {
    const historyItem = {
      from: `${this.formatValue(this.fromValue)} ${this.fromUnit.symbol}`,
      to: `${this.formatValue(this.toValue)} ${this.toUnit.symbol}`,
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

  copyResult(): void {
    const result = `${this.formatValue(this.fromValue)} ${this.fromUnit.symbol} = ${this.formatValue(this.toValue)} ${this.toUnit.symbol}`;
    navigator.clipboard.writeText(result);
  }




}
