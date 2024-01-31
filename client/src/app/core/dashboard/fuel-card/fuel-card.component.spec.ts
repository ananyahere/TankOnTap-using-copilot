import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCardComponent } from './fuel-card.component';

describe('FuelCardComponent', () => {
  let component: FuelCardComponent;
  let fixture: ComponentFixture<FuelCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelCardComponent]
    });
    fixture = TestBed.createComponent(FuelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
