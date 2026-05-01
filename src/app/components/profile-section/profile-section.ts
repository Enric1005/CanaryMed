import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.html',
  styleUrl: './profile-section.css',
})
export class ProfileSection {
  @Input() titulo: string = '';
  @Input() items: string[] = [];

  constructor(private router: Router) {}

  verMas() {
    this.router.navigate(['/pendingAppointments'], { queryParams: { titulo: this.titulo } });
  }
}
