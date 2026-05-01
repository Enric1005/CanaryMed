import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/dataService';

@Component({
  selector: 'app-profile-section',
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
