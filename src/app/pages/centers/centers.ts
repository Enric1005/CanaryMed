import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Center } from '../../components/center/center';
import { Footer } from '../../components/footer/footer';
import { Filter } from '../../components/filter/filter';
import { CentrosService } from '../../services/centros';
import { CenterModel } from '../../models/center';

import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CommonModule, Header, Center, Footer, Filter],
  templateUrl: './centers.html',
  styleUrl: './centers.css',
})
export class Centers {

  private filters$ = new BehaviorSubject<string[]>([]);
  centros$: Observable<CenterModel[]>;
  filteredCentros$: Observable<CenterModel[]>;

  constructor(private centrosService: CentrosService) {
    this.centros$ = this.centrosService.getCentros();
    this.filteredCentros$ = combineLatest([
      this.centros$,
      this.filters$
    ]).pipe(
      map(([centros, filters]) => {
        if (!filters.length) return centros;
        return centros.filter(c =>
          filters.every(f => {
            if (f.includes('Precio')) {
              return c.precio === f;
            }
            if (f === 'Norte' || f === 'Sur' || f === 'Ciudad') {
              return c.sitio === f;
            }
            return true;
          })
        );
      })
    );
  }

  applyFilter(filters: string[]) {
    this.filters$.next(filters);
  }
}
