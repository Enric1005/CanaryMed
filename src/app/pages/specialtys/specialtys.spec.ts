import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Specialtys } from './specialtys';

describe('Specialtys', () => {
  let component: Specialtys;
  let fixture: ComponentFixture<Specialtys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Specialtys],
    }).compileComponents();

    fixture = TestBed.createComponent(Specialtys);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
