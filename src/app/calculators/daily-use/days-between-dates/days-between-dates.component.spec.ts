import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysBetweenDatesComponent } from './days-between-dates.component';

describe('DaysBetweenDatesComponent', () => {
  let component: DaysBetweenDatesComponent;
  let fixture: ComponentFixture<DaysBetweenDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysBetweenDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysBetweenDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
