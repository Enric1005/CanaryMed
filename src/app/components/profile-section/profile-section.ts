import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-profile-section',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './profile-section.html',
  styleUrl: './profile-section.css',
})
export class ProfileSection {
  @Input() titulo: string = '';
  @Input() items: string[] = [];
}
