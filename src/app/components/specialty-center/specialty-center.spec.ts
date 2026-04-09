import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyCenter } from './specialty-center';

describe('SpecialtyCenter', () => {
  let component: SpecialtyCenter;
  let fixture: ComponentFixture<SpecialtyCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtyCenter],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialtyCenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
