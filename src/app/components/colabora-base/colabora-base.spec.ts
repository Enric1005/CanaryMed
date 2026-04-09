import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboraBase } from './colabora-base';

describe('ColaboraBase', () => {
  let component: ColaboraBase;
  let fixture: ComponentFixture<ColaboraBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboraBase],
    }).compileComponents();

    fixture = TestBed.createComponent(ColaboraBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
