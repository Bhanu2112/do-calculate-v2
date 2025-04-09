import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarcalculatorsComponent } from './similarcalculators.component';

describe('SimilarcalculatorsComponent', () => {
  let component: SimilarcalculatorsComponent;
  let fixture: ComponentFixture<SimilarcalculatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarcalculatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarcalculatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
