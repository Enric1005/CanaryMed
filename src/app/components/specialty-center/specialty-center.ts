import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-specialty-center',
  standalone: true,
  templateUrl: './specialty-center.html',
  styleUrl: './specialty-center.css',
  imports: [
    RouterLink
  ]
})
export class SpecialtyCenter implements OnChanges {

  @Input() data: any;

  doctorName = '';
  doctorSchedule: any[] = [];
  doctorHours: any[] = [];

  ngOnChanges(): void {
    this.extractDoctor();
  }

  private extractDoctor() {
    console.log('SPECIALTY DATA 👉', this.data);

    const doctor = this.data?.doctor;

    if (!doctor) {
      this.reset();
      return;
    }

    // ✔ string
    if (typeof doctor === 'string') {
      this.doctorName = doctor;
      return;
    }

    // ✔ array
    if (Array.isArray(doctor)) {
      const first = doctor[0];
      this.doctorName = first?.name || first?.doctor || '';
      this.doctorSchedule = first?.schedule || [];
      this.doctorHours = first?.hours || [];
      return;
    }

    // ✔ objeto
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
