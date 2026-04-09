import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAppointment } from './pending-appointment';

describe('PendingAppointment', () => {
  let component: PendingAppointment;
  let fixture: ComponentFixture<PendingAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingAppointment],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
