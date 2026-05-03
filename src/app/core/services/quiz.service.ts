import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { QuizQuestion, Subject, Difficulty } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private firestore = inject(Firestore);

  // Caché en memoria: evita ir a Firestore en cada quiz
  private cache = new Map<string, QuizQuestion[]>();

  private async fetchSubject(subject: Subject): Promise<QuizQuestion[]> {
    if (this.cache.has(subject)) return this.cache.get(subject)!;

    const ref = collection(this.firestore, 'questions');
    const q = query(ref, where('subject', '==', subject));
    const snap = await getDocs(q);
    const questions = snap.docs.map(d => {
      const data = d.data() as any;
      return {
        id: d.id,
        ...data,
        correctIndex: data.correctIndex ?? data.correct,
      } as QuizQuestion;
    });
    this.cache.set(subject, questions);
    return questions;
  }

  getQuestions(subject: Subject, difficulty?: Difficulty, count = 10): Observable<QuizQuestion[]> {
    return from(this.fetchSubject(subject)).pipe(
      map(qs => {
        const filtered = difficulty ? qs.filter(q => q.difficulty === difficulty) : qs;
        return this.shuffle(filtered).slice(0, count);
      })
    );
  }

  getAllSubjectQuestions(subject: Subject): Observable<QuizQuestion[]> {
    return from(this.fetchSubject(subject)).pipe(
      map(qs => this.shuffle(qs))
    );
  }

  /** Precarga todas las asignaturas en background para que el primer quiz sea instantáneo */
  preloadAll() {
    const subjects: Subject[] = ['chemistry', 'quantum', 'nuclear', 'newtonian', 'biology', 'astronomy'];
    subjects.forEach(s => this.fetchSubject(s).catch(() => {}));
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
