import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedenComponent } from './seden.component';

describe('SedenComponent', () => {
  let component: SedenComponent;
  let fixture: ComponentFixture<SedenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
