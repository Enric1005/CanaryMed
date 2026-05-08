import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { SpecialityModel } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private firestore: Firestore) {}

  getEspecialidades(): Observable<SpecialityModel[]> {
    const ref = collection(this.firestore, 'specialities');
    return collectionData(ref, { idField: 'id' }) as Observable<SpecialityModel[]>;
  }

  getEspecialidadById(id: string): Observable<SpecialityModel> {
    const ref = doc(this.firestore, `specialities/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<SpecialityModel>;
  }
}
