import { Component, Input, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import { CitaService } from '../../services/cita';
import {getAuth} from '@angular/fire/auth';
import {
  IonCard, IonCardContent, IonCardTitle, IonCardSubtitle,
  IonButton, IonText, IonModal,
  IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-specialty-center',
  standalone: true,
  templateUrl: './specialty-center.html',
  styleUrl: './specialty-center.css',
  imports: [
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonText,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class SpecialtyCenter implements OnChanges {
  @Input() data: any;
  @Input() centroId: string = '';
  @Input() centroNombre: string = '';

  showLoginPopup = false;
  doctorName = '';
  doctorSchedule: Record<string, string[]> = {};
  doctorHours: string[] = [];

  constructor(
    private cita: CitaService,
    private router: Router,
  ) {}

  ngOnChanges(): void {
    this.extractDoctor();
  }

  reservar() {
    const user = getAuth().currentUser;

    if (user) {
      this.cita.centroId = this.centroId;
      this.cita.centroNombre = this.centroNombre;
      this.cita.especialidadNombre = this.data.name;
      this.cita.origen = 'centro';
      this.router.navigate(['/make-an-appointment']);
    } else {
      this.showLoginPopup = true;
    }
  }

  goToLogin() {
    this.showLoginPopup = false;
    this.router.navigate(['/login']);
  }

  private extractDoctor() {
    const doctor = this.data?.doctor;
    if (!doctor) {
      this.reset();
      return;
    }
    if (typeof doctor === 'string') {
      this.doctorName = doctor;
      return;
    }
    if (Array.isArray(doctor)) {
      const first = doctor[0];
      this.doctorName = first?.name || first?.doctor || '';
      this.doctorSchedule = first?.schedule || {};
      this.doctorHours = first?.hours || [];
      return;
    }
    this.doctorName = doctor.name || '';
    this.doctorSchedule = doctor.schedule || {};
    this.doctorHours = doctor.hours || [];
  }

  private reset() {
    this.doctorName = '';
    this.doctorSchedule = {};
    this.doctorHours = [];
  }
}
