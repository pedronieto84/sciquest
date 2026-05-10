import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { QuizService } from '../../core/services/quiz.service';
import { ProgressService } from '../../core/services/progress.service';
import { QuizQuestion, Subject } from '../../core/models/quiz.model';

interface SubjectCard {
  id: Subject;
  emoji: string;
  label: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
  private router = inject(Router);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private quizService = inject(QuizService);
  private progressService = inject(ProgressService);

  step = signal<1 | 2 | 3>(1);
  selectedSubjects = signal<Set<Subject>>(new Set());

  // Quiz state
  questions = signal<QuizQuestion[]>([]);
  currentQ = signal(0);
  correctCount = signal(0);
  selectedOption = signal<number | null>(null);
  saving = signal(false);

  readonly subjects: SubjectCard[] = [
    { id: 'chemistry', emoji: '🧪', label: 'Química' },
    { id: 'quantum', emoji: '⚛️', label: 'Cuántica' },
    { id: 'nuclear', emoji: '☢️', label: 'Nuclear' },
    { id: 'newtonian', emoji: '🍎', label: 'Newtoniana' },
    { id: 'biology', emoji: '🧬', label: 'Biología' },
    { id: 'astronomy', emoji: '🌌', label: 'Astronomía' },
  ];

  toggleSubject(id: Subject) {
    const current = new Set(this.selectedSubjects());
    if (current.has(id)) current.delete(id);
    else current.add(id);
    this.selectedSubjects.set(current);
  }

  isSelected(id: Subject): boolean {
    return this.selectedSubjects().has(id);
  }

  async goToStep2() {
    this.step.set(2);
    // Fetch 10 questions mixing selected subjects
    const selected = Array.from(this.selectedSubjects());
    const perSubject = Math.ceil(10 / selected.length);
    let allQs: QuizQuestion[] = [];
    for (const sub of selected) {
      const qs = await firstValueFrom(this.quizService.getQuestions(sub, undefined, perSubject));
      allQs.push(...qs);
    }
    // Shuffle and take 10
    allQs = allQs.sort(() => Math.random() - 0.5).slice(0, 10);
    this.questions.set(allQs);
    this.currentQ.set(0);
    this.correctCount.set(0);
    this.selectedOption.set(null);
  }

  get currentQuestion(): QuizQuestion | null {
    return this.questions()[this.currentQ()] ?? null;
  }

  selectAnswer(index: number) {
    if (this.selectedOption() !== null) return;
    this.selectedOption.set(index);
    const q = this.currentQuestion!;
    if (index === q.correctIndex) {
      this.correctCount.update(c => c + 1);
    }
    // Auto-advance after 800ms
    setTimeout(() => {
      if (this.currentQ() < this.questions().length - 1) {
        this.currentQ.update(i => i + 1);
        this.selectedOption.set(null);
      } else {
        this.step.set(3);
      }
    }, 800);
  }

  getOptionClass(i: number): string {
    const sel = this.selectedOption();
    const correct = this.currentQuestion?.correctIndex;
    if (sel === null) return 'bg-[#1e293b] border border-slate-700/50 text-white hover:border-indigo-500';
    if (i === correct) return 'bg-emerald-600/30 border border-emerald-500 text-emerald-200';
    if (i === sel && sel !== correct) return 'bg-red-600/30 border border-red-500 text-red-200';
    return 'bg-[#1e293b] border border-slate-700/30 text-slate-500';
  }

  get percentage(): number {
    return Math.round((this.correctCount() / this.questions().length) * 100);
  }

  get scoreMessage(): string {
    const pct = this.percentage;
    if (pct > 70) return '¡Impresionante! 🌟';
    if (pct >= 40) return '¡Buen comienzo! 🔥';
    return '¡Hay mucho camino por recorrer! 💪';
  }

  async finishOnboarding() {
    this.saving.set(true);
    try {
      const fireUser = await firstValueFrom(user(this.auth));
      if (!fireUser) return;

      const uid = fireUser.uid;
      const selected = Array.from(this.selectedSubjects());
      const pct = this.percentage;

      // Build baselines: same percentage for all selected subjects (from the mixed quiz)
      const subjectBaselines: { [key: string]: number } = {};
      for (const sub of selected) {
        subjectBaselines[sub] = pct;
      }

      // Update user doc
      const userRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userRef, {
        onboardingCompleted: true,
        subjectInterests: selected,
        subjectBaselines,
      });

      // Save progress sessions for each subject
      for (const sub of selected) {
        await this.progressService.saveSession(uid, sub, this.correctCount(), this.questions().length);
      }

      this.router.navigate(['/home']);
    } catch (e) {
      console.error('Error finishing onboarding:', e);
    } finally {
      this.saving.set(false);
    }
  }
}
