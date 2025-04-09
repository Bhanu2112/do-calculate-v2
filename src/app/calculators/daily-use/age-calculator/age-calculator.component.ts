import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimilarcalculatorsComponent } from "../../../shared/components/similarcalculators/similarcalculators.component";
import { Category } from '../../../models/category';
import { ActivatedRoute } from '@angular/router';
import { ServicesModule } from '../../../core/services/services.module';

@Component({
  selector: 'app-age-calculator',
  imports: [
    CommonModule,
    FormsModule,
    SimilarcalculatorsComponent,
    ServicesModule
],
  templateUrl: './age-calculator.component.html',
  styleUrl: './age-calculator.component.css'
})
export class AgeCalculatorComponent {
  birthDate: string = '';  // ✅ String type for ngModel binding
  age: { years: number; months: number; days: number;totalDays: number;} | null = null;

  category!:Category

  calculators:string[]=[]

  constructor(private routes:ActivatedRoute,private service:ServicesModule){


  }
  ngOnInit(){
    console.log("Current URL:", this.routes.snapshot.url.join('/').replace("-"," "));
    let categoryName = this.routes.snapshot.url.join('/').replace("-"," ");

    this.calculators = this.service.findSimilarCalculators(categoryName);

  }

  calculateAge() {
    if (this.birthDate) {
      const today = new Date();
      const birthDate = new Date(this.birthDate);

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      // Handle negative days by borrowing from months
      if (days < 0) {
        // Get the number of days in the previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
      }

      // Handle negative months by borrowing from years
      if (months < 0) {
        months += 12;
        years--;
      }

      // Calculate total days more accurately
      const diffTime = Math.abs(today.getTime() - birthDate.getTime());
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      this.age = {
        years,
        months,
        days,
        totalDays
      };
    } else {
      this.age = null;
    }
  }
}
