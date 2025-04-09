import { Category } from './../../../models/category';
import { Component } from '@angular/core';
import * as categoriesData from '../../../../../public/calculators.json';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { log } from 'console';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { CalculatorlistcomponentComponent } from "../calculatorlistcomponent/calculatorlistcomponent.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone:true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    RouterModule,
    CalculatorlistcomponentComponent,
    FormsModule
],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

   categories:Category[] = categoriesData.categories

   filter=""
   category!:Category;
   searchTerm:string=""


   filteredCalculators:string[] = []

   calculators:string[] = []

   constructor(private routes:ActivatedRoute){

   }




   ngOnInit(){
    console.log(this.categories)

    this.routes.paramMap.subscribe((params) => {
      console.log(params.get('category'));

     this.filter = params.get('category')!;


     this.categories.filter((category) => {
       if(category.id == this.filter){
         this.category = category;
         console.log(this.category);

         this.calculators = this.category.calculators
         console.log(this.calculators);


       }
     })



    });


   }


   filterCalculators() {
    if (!this.category || !this.category.calculators) {
      this.filteredCalculators = [];
      return;
    }

    if (!this.searchTerm) {
      this.filteredCalculators = this.category.calculators;
      return;
    }

    this.filteredCalculators = this.category.calculators.filter(calculator =>
      calculator.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



   onSubmit() {
   // this.filterCalculators(); // Call filterCalculators when the form is submitted

   if(this.searchTerm.length > 0){
    console.log(this.searchTerm);
    this.filterCalculators();

    console.log(this.filteredCalculators);



   }


  }



}
