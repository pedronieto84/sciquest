import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheoryCard } from '../models/theory.model';

@Injectable({ providedIn: 'root' })
export class TheoryService {
  private firestore = inject(Firestore);

  // Caché en memoria por subject
  private cache = new Map<string, TheoryCard[]>();

  getCards(subject: string): Observable<TheoryCard[]> {
    if (this.cache.has(subject)) {
      return from(Promise.resolve(this.cache.get(subject)!));
    }
    const ref = collection(this.firestore, 'theory');
    const q = query(ref, where('subject', '==', subject));
    return from(getDocs(q)).pipe(
      map(snap => {
        const cards = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as TheoryCard))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        this.cache.set(subject, cards);
        return cards;
      })
    );
  }
}
