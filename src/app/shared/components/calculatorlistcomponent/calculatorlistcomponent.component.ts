import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calculatorlistcomponent',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './calculatorlistcomponent.component.html',
  styleUrl: './calculatorlistcomponent.component.css'
})
export class CalculatorlistcomponentComponent {
  @Input() calculators: string[] = []; // Ensure correct type
  @Input() searchTerm: string = '';

  filteredCalculators: string[] = [];

  ngOnInit() {
    this.filterCalculators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] || changes['calculators']) {
      this.filterCalculators();
    }
  }

  private filterCalculators() {
    if (!this.calculators) return;
    this.filteredCalculators = this.calculators.filter((calculator: string) =>
      calculator.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
