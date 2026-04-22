import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private firestore: Firestore) {}

  getEspecialidades(): Observable<any[]> {
    const especialidadesRef = collection(this.firestore, 'specialities');
    return collectionData(especialidadesRef, { idField: 'id' }) as Observable<any[]>;
  }

  getEspecialidadesPares(): Observable<any[][]> {
    return this.getEspecialidades().pipe(
      map(lista => {
        const pares = [];
        for (let i = 0; i < lista.length; i += 2) {
          pares.push(lista.slice(i, i + 2));
        }
        return pares;
      })
    );
  }
}
