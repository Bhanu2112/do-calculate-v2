import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import * as categoriesData from '../../../../public/calculators.json';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServicesModule {
  categories:Category[] = categoriesData.categories



  findSimilarCalculators(calculator: string) {
    let similarCalculators: string[] = [];
    let categoryq:Category;
    this.categories.forEach((category) => {
      category.calculators.forEach((calculatorName) => {
        if (calculatorName.toLowerCase() === calculator.toLowerCase()) {
          categoryq = category;
          similarCalculators = category.calculators;
        }
      })
    })
    return similarCalculators;
  }
 }
