import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalStorageConverterComponent } from './digital-storage-converter.component';

describe('DigitalStorageConverterComponent', () => {
  let component: DigitalStorageConverterComponent;
  let fixture: ComponentFixture<DigitalStorageConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalStorageConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalStorageConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
