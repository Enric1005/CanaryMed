import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSection } from './profile-section';

describe('ProfileSection', () => {
  let component: ProfileSection;
  let fixture: ComponentFixture<ProfileSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
