import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorlistcomponentComponent } from './calculatorlistcomponent.component';

describe('CalculatorlistcomponentComponent', () => {
  let component: CalculatorlistcomponentComponent;
  let fixture: ComponentFixture<CalculatorlistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorlistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorlistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
