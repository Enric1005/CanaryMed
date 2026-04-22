import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {Specialty} from '../../components/specialty/specialty';
import {Filter} from '../../components/filter/filter';
import { EspecialidadesService } from '../../services/especialidades';
import { Observable } from 'rxjs';
import {CommonModule} from '@angular/common';
import {Center} from '../../components/center/center';

@Component({
  selector: 'app-specialtys',
  standalone: true,

  imports: [
    CommonModule,
    Header,
    Footer,
    Specialty,
    Filter,
  ],
  templateUrl: './specialtys.html',
  styleUrl: './specialtys.css',
})
export class Specialtys {
  especialidades$: Observable<any[]>;

  constructor(private especialidadesService: EspecialidadesService) {
    this.especialidades$ = this.especialidadesService.getEspecialidadesPares();
  }


}
