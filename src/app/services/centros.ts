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
    return collectionData(centrosRef, { idField: 'id' }) as Observable<any[]>;
  }
}
