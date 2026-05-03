import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheoryCard } from '../models/theory.model';

@Injectable({ providedIn: 'root' })
export class TheoryService {
  private firestore = inject(Firestore);

  getCards(subject: string): Observable<TheoryCard[]> {
    const ref = collection(this.firestore, 'theory');
    // orderBy eliminado para evitar requerir índice compuesto — se ordena en cliente
    const q = query(ref, where('subject', '==', subject));
    return (collectionData(q, { idField: 'id' }) as Observable<TheoryCard[]>).pipe(
      map(cards => cards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
    );
  }
}
