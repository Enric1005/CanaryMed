import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.html',
  styleUrl: './profile-section.css',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel],
})
export class ProfileSection {
  @Input() titulo: string = '';
  @Input() items: string[] = [];

  constructor(private router: Router) {}

  verMas() {
    this.router.navigate(['/pendingAppointments'], { queryParams: { titulo: this.titulo } });
  }
}
