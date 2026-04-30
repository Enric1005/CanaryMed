import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-specialty-center',
  standalone: true,
  templateUrl: './specialty-center.html',
  styleUrl: './specialty-center.css',
  imports: [RouterLink]
})
export class SpecialtyCenter implements OnChanges {

  @Input() data: any;

  doctorName = '';
  doctorSchedule: any[] = [];
  doctorHours: any[] = [];

  constructor(private cita: CitaService) {}

  ngOnChanges(): void {
    this.extractDoctor();
  }

  reservar() {
    if (this.cita.origen === 'centro') {
      this.cita.especialidadId = this.data.id;
      this.cita.especialidadNombre = this.data.name;
    } else {
      // ✅ Solo reemplaza espacios, sin quitar tildes
      const centroId = this.data.name?.replace(/\s+/g, '_');

      console.log('🏥 centroId generado:', centroId);

      this.cita.centroId = centroId;
      this.cita.centroNombre = this.data.name;
    }
  }

  private extractDoctor() {
    console.log('SPECIALTY DATA 👉', this.data);

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
      this.doctorSchedule = first?.schedule || [];
      this.doctorHours = first?.hours || [];
      return;
    }

    this.doctorName = doctor.name || '';
    this.doctorSchedule = doctor.schedule || [];
    this.doctorHours = doctor.hours || [];
  }

  private reset() {
    this.doctorName = '';
    this.doctorSchedule = [];
    this.doctorHours = [];
  }
}
