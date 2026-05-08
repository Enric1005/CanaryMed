import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAnAppointment } from './make-an-appointment';

describe('MakeAnAppointment', () => {
  let component: MakeAnAppointment;
  let fixture: ComponentFixture<MakeAnAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeAnAppointment],
    }).compileComponents();

    fixture = TestBed.createComponent(MakeAnAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
