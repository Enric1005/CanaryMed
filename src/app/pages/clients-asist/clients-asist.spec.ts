import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAsist } from './clients-asist';

describe('ClientsAsist', () => {
  let component: ClientsAsist;
  let fixture: ComponentFixture<ClientsAsist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsAsist],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsAsist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
