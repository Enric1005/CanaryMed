import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyPage } from './specialty-page';

describe('SpecialtyPage', () => {
  let component: SpecialtyPage;
  let fixture: ComponentFixture<SpecialtyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialtyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
