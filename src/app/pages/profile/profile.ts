import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {ProfileSection} from '../../components/profile-section/profile-section';

@Component({
  selector: 'app-profile',
  imports: [
    Header,
    ProfileSection
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}
