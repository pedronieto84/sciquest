import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, where, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TheoryCard } from '../models/theory.model';

@Injectable({ providedIn: 'root' })
export class TheoryService {
  private firestore = inject(Firestore);

  getCards(subject: string): Observable<TheoryCard[]> {
    const ref = collection(this.firestore, 'theory');
    const q = query(ref, where('subject', '==', subject), orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<TheoryCard[]>;
  }
}
