import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-similarcalculators',
  imports: [CommonModule],
  templateUrl: './similarcalculators.component.html',
  styleUrl: './similarcalculators.component.css'
})
export class SimilarcalculatorsComponent {

  @Input() relatedCalculators: string[] = [];
  // relatedCalculators: string[] = [
  //   'Pet Food Portion Calculator',
  //   'Pet Age Calculator',
  //   'Pet Travel Cost Estimator'
  // ];
  showAll = false;

}
