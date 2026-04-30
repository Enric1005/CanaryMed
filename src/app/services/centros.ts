import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDoc
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  constructor(private firestore: Firestore) {}

  getCentros(): Observable<any[]> {
    const centrosRef = collection(this.firestore, 'centers');
    return collectionData(centrosRef, { idField: 'id' }) as Observable<any[]>;
  }

  getCenterById(id: string) {
    const centerRef = doc(this.firestore, `centers/${id}`);
    return from(getDoc(centerRef)).pipe(
      map(snap => snap.exists() ? ({ id: snap.id, ...snap.data() }) : null)
    );
  }

  getDoctorsBySpecialty(centerId: string, specialtyName: string): Observable<any[]> {
    return this.getCenterById(centerId).pipe(
      map((center: any) => {
        console.log('🏥 Centro completo:', center);
        console.log('🔍 Buscando especialidad:', specialtyName);
        console.log('📋 Especialidades disponibles:', center?.specialities?.map((s: any) => s.desc));

        const specialty = center?.specialities?.find(
          (s: any) =>
            s.desc?.toLowerCase() === specialtyName?.toLowerCase() ||
            s.name?.toLowerCase() === specialtyName?.toLowerCase()
        );

        console.log('✅ Especialidad encontrada:', specialty);
        console.log('👨‍⚕️ Médicos:', specialty?.doctor);

        return specialty?.doctor || [];
      })
    );
  }

  getHoursByDoctor(centerId: string, specialtyName: string, doctorName: string): Observable<string[]> {
    return this.getCenterById(centerId).pipe(
      map((center: any) => {
        const specialty = center?.specialities?.find(
          (s: any) =>
            s.desc?.toLowerCase() === specialtyName?.toLowerCase() ||
            s.name?.toLowerCase() === specialtyName?.toLowerCase()
        );
        const doctor = specialty?.doctor?.find((d: any) => d.name === doctorName);
        return doctor?.hours || [];
      })
    );
  }

  getDatesByDoctor(centerId: string, specialtyName: string, doctorName: string): Observable<any> {
    return this.getCenterById(centerId).pipe(
      map((center: any) => {
        const specialty = center?.specialities?.find(
          (s: any) =>
            s.desc?.toLowerCase() === specialtyName?.toLowerCase() ||
            s.name?.toLowerCase() === specialtyName?.toLowerCase()
        );
        const doctor = specialty?.doctor?.find((d: any) => d.name === doctorName);
        return doctor?.schedule || {};
      })
    );
  }
}
