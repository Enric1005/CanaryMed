import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEdit } from './register-edit';

describe('RegisterEdit', () => {
  let component: RegisterEdit;
  let fixture: ComponentFixture<RegisterEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
