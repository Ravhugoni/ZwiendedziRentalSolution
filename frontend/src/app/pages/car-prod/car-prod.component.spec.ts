import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarProdComponent } from './car-prod.component';

describe('CarProdComponent', () => {
  let component: CarProdComponent;
  let fixture: ComponentFixture<CarProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
