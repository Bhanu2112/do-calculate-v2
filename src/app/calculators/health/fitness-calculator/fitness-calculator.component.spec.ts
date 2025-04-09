import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessCalculatorComponent } from './fitness-calculator.component';

describe('FitnessCalculatorComponent', () => {
  let component: FitnessCalculatorComponent;
  let fixture: ComponentFixture<FitnessCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
