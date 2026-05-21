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
import {updateDoc} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  constructor(private firestore: Firestore) {}

  getCentros(): Observable<any[]> {
    const centrosRef = collection(this.firestore, 'centers');
    return collectionData(centrosRef, { idField: 'id' }) as Observable<any[]>;
  }

  getCenterById(id: string): Observable<any> {
    const centerRef = doc(this.firestore, `centers/${id}`);
    return from(getDoc(centerRef)).pipe(
      map(snap => snap.exists() ? ({ id: snap.id, ...snap.data() } as any) : null)
    );
  }

  getDoctorsBySpecialty(centerId: string, specialtyName: string): Observable<any[]> {
    return this.getCenterById(centerId).pipe(
      map((center: any) => {
        const specialty = center?.specialities?.find(
          (s: any) =>
            s.desc?.toLowerCase() === specialtyName?.toLowerCase() ||
            s.name?.toLowerCase() === specialtyName?.toLowerCase()
        );

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

  async removeHoraFromSchedule(
    centerId: string,
    specialtyName: string,
    doctorName: string,
    fecha: string,
    hora: string
  ) {
    const centerRef = doc(this.firestore, `centers/${centerId}`);
    const snap = await getDoc(centerRef);

    if (!snap.exists()) return;

    const center = snap.data() as any;

    const specialities = center.specialities.map((s: any) => {
      const matchEsp =
        s.desc?.toLowerCase() === specialtyName?.toLowerCase() ||
        s.name?.toLowerCase() === specialtyName?.toLowerCase();

      if (!matchEsp) return s;

      const doctors = s.doctor.map((d: any) => {
        if (d.name !== doctorName) return d;

        const horasActuales = d.schedule[fecha] || [];
        const horasActualizadas = horasActuales.filter((h: string) => h !== hora);

        return {
          ...d,
          schedule: {
            ...d.schedule,
            [fecha]: horasActualizadas
          }
        };
      });

      return { ...s, doctor: doctors };
    });

    await updateDoc(centerRef, { specialities });
  }
}
