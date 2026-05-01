import {Component, OnInit, ChangeDetectorRef, inject, OnDestroy} from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { CitaService } from '../../services/cita';
import { CentrosService } from '../../services/centros';
import { CrudService } from '../../services/crudService';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import {Auth, getAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {Subscription, take} from 'rxjs';
import {AppUser} from '../profile/profile';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-make-an-appointment',
  imports: [Header, Footer, FormsModule, NgFor],
  templateUrl: './make-an-appointment.html',
  styleUrl: './make-an-appointment.css',
})
export class MakeAnAppointment implements OnInit, OnDestroy {

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
    private crudService: CrudService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private auth: Auth,
    private ngZone: NgZone
  ) {}

  appuser: AppUser | null | undefined = undefined;
  private userSub!: Subscription;
  private authUnsub!: () => void;

  ngOnInit() {
    this.centroCampo = this.cita.centroNombre || '';
    this.especialidadCampo = this.cita.especialidadNombre || '';

    if (!this.cita.centroId || !this.cita.especialidadNombre) return;

    this.centrosService
      .getDoctorsBySpecialty(this.cita.centroId, this.cita.especialidadNombre)
      .subscribe((medicos: any[]) => {
        this.medicos = medicos || [];
        this.medicoSeleccionadoIndex = '';
        this.cdRef.detectChanges();
      });
    this.authUnsub = this.auth.onAuthStateChanged(user => {
      this.ngZone.run(() => {
        if (this.userSub) this.userSub.unsubscribe();

        if (user) {
          console.log("User found");
          this.userSub = this.crudService
            .getWhere<AppUser>("users", "uid", "==", user.uid)
            .subscribe(res => {
              this.appuser = res[0];
              this.cdRef.detectChanges();
            });
        } else {
          this.appuser = null;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.authUnsub) this.authUnsub();
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

  async confirmarCita() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || (user && this.appuser?.role !== 'Paciente')) {
      alert('Debes iniciar sesión como paciente para reservar una cita');
      return;
    }

    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      alert('Por favor selecciona fecha y hora');
      return;
    }

    const citaString = `${this.fechaSeleccionada}, ${this.horaSeleccionada} - ${this.especialidadCampo} - ${this.centroCampo}`;

    try {
      this.crudService.getWhere<any>('users', 'uid', '==', user.uid)
        .pipe(take(1))
        .subscribe(async (users) => {
          if (users.length === 0) {
            alert('No se encontró tu usuario');
            return;
          }

          const userId = users[0].id;

          await this.crudService.addToArray('users', userId, 'pendientes', citaString);
          await this.centrosService.removeHoraFromSchedule(
            this.cita.centroId!,
            this.cita.especialidadNombre!,
            this.medicoSeleccionado.name,
            this.fechaSeleccionada,
            this.horaSeleccionada
          );
          this.router.navigate(['/profile']);
        });
    } catch (error) {
      alert('Hubo un error al reservar la cita');
    }
  }
}
