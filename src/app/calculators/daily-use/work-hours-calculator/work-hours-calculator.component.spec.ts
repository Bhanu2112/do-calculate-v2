import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHoursCalculatorComponent } from './work-hours-calculator.component';

describe('WorkHoursCalculatorComponent', () => {
  let component: WorkHoursCalculatorComponent;
  let fixture: ComponentFixture<WorkHoursCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkHoursCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkHoursCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
