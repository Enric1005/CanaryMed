import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Specialty } from '../../components/specialty/specialty';
import { Filter } from '../../components/filter/filter';
import { EspecialidadesService } from '../../services/especialidades';
import { SpecialityModel } from '../../models/speciality';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';
import {
  IonHeader, IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-specialtys',
  standalone: true,
  imports: [CommonModule, Header, Footer, Specialty, Filter, LoadingSpinner,
   IonContent
  ],
  templateUrl: './specialtys.html',
  styleUrl: './specialtys.css',
})
export class Specialtys {
  especialidades$: Observable<SpecialityModel[]>;
  private filters$ = new BehaviorSubject<string[]>([]);
  filteredEspecialidades$: Observable<SpecialityModel[]>;

  constructor(private especialidadesService: EspecialidadesService) {
    this.especialidades$ = this.especialidadesService.getEspecialidades();

    this.filteredEspecialidades$ = combineLatest([
      this.especialidades$,
      this.filters$
    ]).pipe(
      map(([especialidades, filters]) => {
        if (!filters.length) return especialidades;
        return especialidades.filter(e =>
          filters.every(f => e.desc === f)
        );
      })
    );
  }

  applyFilter(filters: string[]) {
    this.filters$.next(filters);
  }
}
