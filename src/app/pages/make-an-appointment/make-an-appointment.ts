import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { CitaService } from '../../services/cita';
import { CentrosService } from '../../services/centros';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-make-an-appointment',
  imports: [Header, Footer, FormsModule, NgFor],
  templateUrl: './make-an-appointment.html',
  styleUrl: './make-an-appointment.css',
})
export class MakeAnAppointment implements OnInit {

  centroCampo = '';
  especialidadCampo = '';

  medicos: any[] = [];
  fechas: string[] = [];
  horas: string[] = [];

  medicoSeleccionadoIndex: any = '';
  medicoSeleccionado: any = null;
  fechaSeleccionada = '';
  horaSeleccionada = '';

  constructor(
    private cita: CitaService,
    private centrosService: CentrosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.centroCampo = this.cita.centroNombre || '';
    this.especialidadCampo = this.cita.especialidadNombre || '';

    if (!this.cita.centroId || !this.cita.especialidadNombre) {
      return;
    }

    this.centrosService
      .getDoctorsBySpecialty(
        this.cita.centroId,
        this.cita.especialidadNombre
      )
      .subscribe((medicos: any[]) => {
        this.medicos = medicos || [];
        this.medicoSeleccionadoIndex = '';
        this.cdRef.detectChanges();
      });
  }

  onMedicoChange() {
    if (this.medicoSeleccionadoIndex === '' || this.medicoSeleccionadoIndex === undefined) return;

    this.medicoSeleccionado = this.medicos[this.medicoSeleccionadoIndex];

    if (this.medicoSeleccionado?.schedule) {
      this.fechas = Object.keys(this.medicoSeleccionado.schedule);
      this.fechaSeleccionada = '';
      this.horas = [];
      this.horaSeleccionada = '';
    }

    this.cdRef.detectChanges();
  }

  onFechaChange() {
    if (this.medicoSeleccionado?.schedule && this.fechaSeleccionada) {
      this.horas = this.medicoSeleccionado.schedule[this.fechaSeleccionada] || [];
      this.horaSeleccionada = '';
    }

    this.cdRef.detectChanges();
  }
}
