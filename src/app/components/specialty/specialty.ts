import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {CitaService} from '../../services/cita';
import {
  IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-specialty',
  imports: [
    CommonModule,
    RouterLink,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
  ],
  templateUrl: './specialty.html',
  styleUrl: './specialty.css',
  standalone: true,
})
export class Specialty {
  @Input() specialty1: any;
  @Input() specialty2: any;

  constructor(private cita: CitaService) {}

  seleccionarEspecialidad(specialty: any) {
    this.cita.especialidadId = specialty.id;
    this.cita.especialidadNombre = specialty.name;
    this.cita.origen = 'especialidad';
  }
}
