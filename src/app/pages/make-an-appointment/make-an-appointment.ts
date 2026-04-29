import { Component, OnInit } from '@angular/core';
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

  medicoSeleccionado = '';
  fechaSeleccionada = '';
  horaSeleccionada = '';

  private especialidad: any = null;

  constructor(private cita: CitaService, private centrosService: CentrosService) {}

  ngOnInit() {
    this.centroCampo = this.cita.centroNombre || '';
    this.especialidadCampo = this.cita.especialidadNombre || '';

    if (this.cita.centroId) {
      this.centrosService.getCenterById(String(this.cita.centroId)).subscribe((centro: any) => {
        const especialidades = centro?.specialities || [];
        this.especialidad = especialidades.find(
          (e: any) => e.desc === this.cita.especialidadNombre || e.name === this.cita.especialidadNombre
        );

        if (this.especialidad) {
          this.medicos = this.especialidad.doctor || [];
        }
      });
    }
  }

  onMedicoChange() {
    const medico = this.medicos.find(m => m.name === this.medicoSeleccionado);
    if (medico?.schedule) {
      this.fechas = Object.keys(medico.schedule);
      this.horas = [];
      this.fechaSeleccionada = '';
      this.horaSeleccionada = '';
    }
  }

  onFechaChange() {
    const medico = this.medicos.find(m => m.name === this.medicoSeleccionado);
    if (medico?.schedule && this.fechaSeleccionada) {
      this.horas = medico.schedule[this.fechaSeleccionada] || [];
      this.horaSeleccionada = '';
    }
  }
}
