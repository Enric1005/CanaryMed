import {Component, Input} from '@angular/core';

export interface SpecialtyCenterData {
  name: string;
  price?: string;
  location?: string;
  doctor?: string | string[]; // 👈 aquí está la clave
  src?: string;
  image ?: string;
}

@Component({
  selector: 'app-specialty-center',
  imports: [],
  templateUrl: './specialty-center.html',
  styleUrl: './specialty-center.css',
})
export class SpecialtyCenter {
  @Input() data!: SpecialtyCenterData;
  protected readonly Array = Array;
}
