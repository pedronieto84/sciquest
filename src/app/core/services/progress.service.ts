import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp, query, orderBy, where, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ProgressSession {
  id: string;
  subject: string;
  correct: number;
  total: number;
  percentage: number;
  date: any;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private firestore = inject(Firestore);

  async saveSession(uid: string, subject: string, correct: number, total: number): Promise<void> {
    if (total <= 0) return;
    const colRef = collection(this.firestore, `studyProgress/${uid}/sessions`);
    await addDoc(colRef, {
      subject,
      correct,
      total,
      percentage: Math.round((correct / total) * 100),
      date: serverTimestamp(),
    });
  }

  getSessions(uid: string): Observable<ProgressSession[]> {
    return new Observable<ProgressSession[]>(subscriber => {
      const colRef = collection(this.firestore, `studyProgress/${uid}/sessions`);
      const q = query(colRef, orderBy('date', 'desc'));
      const unsub = onSnapshot(q, snap => {
        const sessions = snap.docs.map(d => ({ id: d.id, ...d.data() } as ProgressSession));
        subscriber.next(sessions);
      }, err => subscriber.error(err));
      return () => unsub();
    });
  }

  getSessionsBySubject(uid: string, subject: string): Observable<ProgressSession[]> {
    return new Observable<ProgressSession[]>(subscriber => {
      const colRef = collection(this.firestore, `studyProgress/${uid}/sessions`);
      const q = query(colRef, where('subject', '==', subject), orderBy('date', 'desc'));
      const unsub = onSnapshot(q, snap => {
        const sessions = snap.docs.map(d => ({ id: d.id, ...d.data() } as ProgressSession));
        subscriber.next(sessions);
      }, err => subscriber.error(err));
      return () => unsub();
    });
  }
}
