import {Component, Injectable, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {DataService} from '../../services/dataService';

@Component({
  selector: 'app-profile-section',
  imports: [
    NgForOf
  ],
  templateUrl: './profile-section.html',
  styleUrl: './profile-section.css',
})

export class ProfileSection {
  @Input() titulo: string = '';
  @Input() items: string[] = [];

  constructor(private router: Router, private dataService: DataService) {
  }

  verMas() {
    this.dataService.items = this.items;
    this.router.navigate(['/pendingAppointments'], { queryParams: { titulo: this.titulo } });
  }
}
