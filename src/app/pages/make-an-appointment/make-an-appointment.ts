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

    console.log("🏥 CENTRO ID:", this.cita.centroId);
    console.log("🩺 ESPECIALIDAD NOMBRE:", this.cita.especialidadNombre);
    console.log("📍 ORIGEN:", this.cita.origen);

    if (!this.cita.centroId || !this.cita.especialidadNombre) {
      console.error("❌ Faltan datos:", {
        centroId: this.cita.centroId,
        especialidadNombre: this.cita.especialidadNombre
      });
      return;
    }

    this.centrosService
      .getDoctorsBySpecialty(
        this.cita.centroId,
        this.cita.especialidadNombre
      )
      .subscribe((medicos: any[]) => {
        console.log("📦 MÉDICOS RECIBIDOS:", medicos);
        this.medicos = medicos || [];
        this.medicoSeleccionadoIndex = '';
        this.cdRef.detectChanges(); // ✅ fuerza actualización del DOM
      });
  }

  onMedicoChange() {
    if (this.medicoSeleccionadoIndex === '' || this.medicoSeleccionadoIndex === undefined) return;

    this.medicoSeleccionado = this.medicos[this.medicoSeleccionadoIndex];

    console.log("➡️ MÉDICO SELECCIONADO:", this.medicoSeleccionado);

    if (this.medicoSeleccionado?.schedule) {
      this.fechas = Object.keys(this.medicoSeleccionado.schedule);
      console.log("📅 FECHAS DISPONIBLES:", this.fechas);
      this.fechaSeleccionada = '';
      this.horas = [];
      this.horaSeleccionada = '';
    } else {
      console.warn("⚠️ Este médico no tiene schedule");
    }

    this.cdRef.detectChanges(); // ✅ fuerza actualización del DOM
  }

  onFechaChange() {
    console.log("📅 FECHA SELECCIONADA:", this.fechaSeleccionada);

    if (this.medicoSeleccionado?.schedule && this.fechaSeleccionada) {
      this.horas = this.medicoSeleccionado.schedule[this.fechaSeleccionada] || [];
      console.log("⏰ HORAS DISPONIBLES:", this.horas);
      this.horaSeleccionada = '';
    } else {
      console.warn("⚠️ No hay horas disponibles");
    }

    this.cdRef.detectChanges(); // ✅ fuerza actualización del DOM
  }
}
