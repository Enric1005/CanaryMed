import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Center } from '../../components/center/center';
import { Footer } from '../../components/footer/footer';
import { Filter } from '../../components/filter/filter';
import { CentrosService } from '../../services/centros';
import { CenterModel } from '../../models/center';
import { Observable, BehaviorSubject, combineLatest, map, of } from 'rxjs';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { getAuth } from '@angular/fire/auth';
import { CrudService } from '../../services/crudService';
import {
  IonHeader, IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CommonModule, Header, Center, Footer, Filter, LoadingSpinner, IonContent],
  templateUrl: './centers.html',
  styleUrl: './centers.css',
})
export class Centers {
  private filters$ = new BehaviorSubject<string[]>([]);
  centros$: Observable<CenterModel[]>;
  filteredCentros$: Observable<CenterModel[]>;

  constructor(private centrosService: CentrosService, private crudService: CrudService) {
    this.centros$ = this.centrosService.getCentros();

    const user = getAuth().currentUser;
    const favs$ = user
      ? this.crudService.getWhere<any>('users', 'uid', '==', user.uid).pipe(
        map(users => users[0]?.favs ?? [])
      )
      : of([]);

    this.filteredCentros$ = combineLatest([
      this.centros$,
      this.filters$,
      favs$
    ]).pipe(
      map(([centros, filters, favs]) => {
        const centrosMarcados = centros.map(c => ({
          ...c,
          isFavorite: favs.includes(`${c.name} - ${c.sitio} - ${c.precio}`)
        }));

        if (!filters.length) return centrosMarcados;
        return centrosMarcados.filter(c =>
          filters.every(f => {
            if (f.includes('Precio')) return c.precio === f;
            if (f === 'Norte' || f === 'Sur' || f === 'Ciudad') return c.sitio === f;
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
