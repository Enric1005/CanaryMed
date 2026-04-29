import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  @Input() center: any;

  constructor(private cita: CitaService) {}

  seleccionarCentro(centro: any) {
    this.cita.centroId = centro.id;
    this.cita.centroNombre = centro.name;
    this.cita.origen = 'centro';
  }
}
