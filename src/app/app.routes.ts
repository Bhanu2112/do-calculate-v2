import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { AgeCalculatorComponent } from './calculators/daily-use/age-calculator/age-calculator.component';
import { UnitConverterComponent } from './calculators/daily-use/unit-converter/unit-converter.component';
import { TimeTrackerComponent } from './calculators/daily-use/time-tracker/time-tracker.component';
import { PercentageCalculatorComponent } from './calculators/daily-use/percentage-calculator/percentage-calculator.component';
import { DiscountCalculatorComponent } from './calculators/daily-use/discount-calculator/discount-calculator.component';
import { DigitalStorageConverterComponent } from './calculators/daily-use/digital-storage-converter/digital-storage-converter.component';

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'calculators/categories/:category',
    component: CategoryComponent
  },
  {
    path:'calculator',
    children:[
      {
        path:'age-calculator',
        component: AgeCalculatorComponent
      },
      {
        path:'unit-converter',
        component:UnitConverterComponent
      },
      {
        path:'time-tracker',
        component:TimeTrackerComponent
      },
      {
        path:'percentage-calculator',
        component:PercentageCalculatorComponent
      },
      {
        path:'discount-calculator',
        component:DiscountCalculatorComponent
      },
      {
        path:'digital-storage-converter',
        component:DigitalStorageConverterComponent
      }
    ]
  }
];
