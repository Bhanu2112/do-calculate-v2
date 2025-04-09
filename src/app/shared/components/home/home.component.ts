import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import * as categoriesData from '../../../../../public/calculators.json';
import { Category } from '../../../models/category';
import { WhychooseusComponent } from "../whychooseus/whychooseus.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    WhychooseusComponent,
    FooterComponent,

    RouterModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories:Category[] = categoriesData.categories


  constructor() {


   }

   ngOnInit(){
   console.log(this.categories);
   }

   getGradient(color: string): string {
    if (this.isHexColor(color)) {
      const rgbaColor = this.hexToRgba(color, 0.8); // Convert hex to RGBA with 10% opacity
      return `linear-gradient(135deg, ${rgbaColor}, white)`;
    }
    return `linear-gradient(135deg, ${color}, white)`;
  }

   isHexColor(color: string): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
  }

   hexToRgba(hex: string, alpha: number): string {
    let r = 0, g = 0, b = 0;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

}
