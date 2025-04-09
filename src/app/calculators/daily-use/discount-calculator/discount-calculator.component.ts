import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesModule } from '../../../core/services/services.module';
import { SimilarcalculatorsComponent } from "../../../shared/components/similarcalculators/similarcalculators.component";

@Component({
  selector: 'app-discount-calculator',
  imports: [CommonModule, FormsModule, ServicesModule, SimilarcalculatorsComponent],
  templateUrl: './discount-calculator.component.html',
  styleUrl: './discount-calculator.component.css'
})
export class DiscountCalculatorComponent {
  originalPrice: number = 0;
  discountPercent: number = 0;
  discountAmount: number = 0;
  finalPrice: number = 0;


  calculators:string[]=[]

  constructor(private routes:ActivatedRoute,private service:ServicesModule){


  }

  calculateDiscount() {
    if (this.originalPrice >= 0 && this.discountPercent >= 0) {
      this.discountAmount = (this.originalPrice * this.discountPercent) / 100;
      this.finalPrice = this.originalPrice - this.discountAmount;
    }
  }

  ngOnInit(){
    this.calculators = this.service.findSimilarCalculators(this.routes.snapshot.url.join('/').replace('-',' '));
  }
}
