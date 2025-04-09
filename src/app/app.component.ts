import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgeCalculatorComponent } from "./calculators/daily-use/age-calculator/age-calculator.component";
import { HomeComponent } from "./shared/components/home/home.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { UnitConverterComponent } from "./calculators/daily-use/unit-converter/unit-converter.component";
import { TimeTrackerComponent } from "./calculators/daily-use/time-tracker/time-tracker.component";
import { PercentageCalculatorComponent } from "./calculators/daily-use/percentage-calculator/percentage-calculator.component";
import { DiscountCalculatorComponent } from "./calculators/daily-use/discount-calculator/discount-calculator.component";
import { DigitalStorageConverterComponent } from "./calculators/daily-use/digital-storage-converter/digital-storage-converter.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,
    //  DigitalStorageConverterComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator-app';
}
