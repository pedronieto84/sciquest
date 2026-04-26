import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { QuizQuestion, Subject, Difficulty } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private firestore = inject(Firestore);

  getQuestions(subject: Subject, difficulty?: Difficulty, count = 10): Observable<QuizQuestion[]> {
    const ref = collection(this.firestore, 'questions');
    const q = difficulty
      ? query(ref, where('subject', '==', subject), where('difficulty', '==', difficulty))
      : query(ref, where('subject', '==', subject));
    return (collectionData(q, { idField: 'id' }) as Observable<QuizQuestion[]>).pipe(
      map(qs => this.shuffle(qs).slice(0, count))
    );
  }

  getAllSubjectQuestions(subject: Subject): Observable<QuizQuestion[]> {
    const ref = collection(this.firestore, 'questions');
    const q = query(ref, where('subject', '==', subject));
    return (collectionData(q, { idField: 'id' }) as Observable<QuizQuestion[]>).pipe(
      map(qs => this.shuffle(qs))
    );
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
