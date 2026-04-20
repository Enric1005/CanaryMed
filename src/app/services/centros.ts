import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  constructor(private firestore: Firestore) {}

  getCentros(): Observable<any[]> {
    const centrosRef = collection(this.firestore, 'centers');

    const data$ = collectionData(centrosRef, { idField: 'id' });

    data$.subscribe(data => {
      console.log("🔥 DATOS FIREBASE:", data);
    });

    return data$ as Observable<any[]>;
  }
}
