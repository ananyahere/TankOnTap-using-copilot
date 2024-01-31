import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuelComponent } from './add-fuel.component';

describe('AddFuelComponent', () => {
  let component: AddFuelComponent;
  let fixture: ComponentFixture<AddFuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFuelComponent]
    });
    fixture = TestBed.createComponent(AddFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
