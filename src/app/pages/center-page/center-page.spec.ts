import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPage } from './center-page';

describe('CenterPage', () => {
  let component: CenterPage;
  let fixture: ComponentFixture<CenterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CenterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
