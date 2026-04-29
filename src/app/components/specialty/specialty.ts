import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {CitaService} from '../../services/cita';

@Component({
  selector: 'app-specialty',
  imports: [CommonModule, RouterLink],
  templateUrl: './specialty.html',
  styleUrl: './specialty.css',
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
