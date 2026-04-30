import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData, doc, docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {CenterModel} from '../models/center';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  constructor(private firestore: Firestore) {}

  getCentros(): Observable<CenterModel[]> {
    const centrosRef = collection(this.firestore, 'centers');
    return collectionData(centrosRef, { idField: 'id' }) as Observable<CenterModel[]>;
  }

  getCenterById(id: string) {
    const centerRef = doc(this.firestore, `centers/${id}`);
    return docData(centerRef, { idField: 'id' });
  }

}
