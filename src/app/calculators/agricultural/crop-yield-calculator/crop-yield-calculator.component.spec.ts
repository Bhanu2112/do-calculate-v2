import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropYieldCalculatorComponent } from './crop-yield-calculator.component';

describe('CropYieldCalculatorComponent', () => {
  let component: CropYieldCalculatorComponent;
  let fixture: ComponentFixture<CropYieldCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropYieldCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropYieldCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
