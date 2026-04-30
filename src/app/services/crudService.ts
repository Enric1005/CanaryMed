import {inject, Injectable, NgZone} from '@angular/core';
import {
  collection, addDoc, deleteDoc,
  doc, updateDoc, onSnapshot
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import {db} from '../../environments/environment';
import { Firestore, query, where, collectionData } from '@angular/fire/firestore';
import { arrayUnion } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private ngZone: NgZone) {}

  private firestore = inject(Firestore);

  getWhere<T>(collectionName: string, field: string, op: any, value: any): Observable<T[]> {
    const ref = collection(this.firestore, collectionName);
    const q = query(ref, where(field, op, value));

    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }

  getAll<T>(collectionName: string): Observable<T[]> {
    return new Observable(observer => {
      const ref = collection(db, collectionName);

      const unsubscribe = onSnapshot(ref, snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        this.ngZone.run(() => observer.next(data));
      });

      return () => unsubscribe();
    });
  }

  async add<T extends object>(collectionName: string, data: T) {
    await addDoc(collection(db, collectionName), data);
  }

  async delete(collectionName: string, id: string) {
    await deleteDoc(doc(db, collectionName, id));
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>) {
    await updateDoc(doc(db, collectionName, id), data);
  }

  async addToArray(collectionName: string, id: string, field: string, value: any) {
    await updateDoc(doc(this.firestore, collectionName, id), {
      [field]: arrayUnion(value)
    });
  }


}


