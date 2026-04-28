import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface SpecialtyCenterData {
  name: string;
  price?: string;
  location?: string;
  doctor?: string | string[];
  src?: string;
  image ?: string;
}

@Component({
  selector: 'app-specialty-center',
  imports: [
    RouterLink
  ],
  templateUrl: './specialty-center.html',
  styleUrl: './specialty-center.css',
})
export class SpecialtyCenter {
  @Input() data!: SpecialtyCenterData;
  protected readonly Array = Array;
}
