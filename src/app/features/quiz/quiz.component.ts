import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { QuizService } from '../../core/services/quiz.service';
import { QuizQuestion, Subject } from '../../core/models/quiz.model';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc, increment } from '@angular/fire/firestore';
import { getLevelFromXp } from '../../core/models/user.model';

type QuizState = 'select' | 'loading' | 'playing' | 'results';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit, OnDestroy {
  readonly Math = Math;
  private quizService = inject(QuizService);
  private route = inject(ActivatedRoute);
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  state = signal<QuizState>('select');
  questions = signal<QuizQuestion[]>([]);
  currentIndex = signal(0);
  answers = signal<number[]>([]);
  selectedOption = signal<number | null>(null);
  showExplanation = signal(false);
  timeLeft = signal(20);
  score = signal(0);
  xpEarned = signal(0);

  private timer: any;
  private sub?: Subscription;
  private currentSubject: Subject | null = null;

  subjects: { id: Subject; label: string; emoji: string; color: string }[] = [
    { id: 'chemistry',  label: 'Química',     emoji: '🧪', color: 'from-emerald-600 to-teal-500' },
    { id: 'quantum',    label: 'Cuántica',     emoji: '⚛️', color: 'from-indigo-600 to-purple-500' },
    { id: 'nuclear',    label: 'Nuclear',      emoji: '☢️', color: 'from-amber-600 to-orange-500' },
    { id: 'newtonian',  label: 'Newtoniana',   emoji: '🍎', color: 'from-blue-600 to-cyan-500' },
    { id: 'astronomy',  label: 'Astronomía',   emoji: '🔭', color: 'from-violet-600 to-indigo-500' },
    { id: 'biology',    label: 'Biología',     emoji: '🧬', color: 'from-green-600 to-emerald-500' },
  ];

  ngOnInit() {
    const sub = this.route.queryParams.subscribe(params => {
      if (params['subject']) {
        this.startQuiz(params['subject'] as Subject);
      }
    });
  }

  get currentQuestion(): QuizQuestion | null {
    return this.questions()[this.currentIndex()] || null;
  }

  get progress(): number {
    return Math.round(((this.currentIndex()) / this.questions().length) * 100);
  }

  get correctCount(): number {
    return this.answers().filter((a, i) => a === this.questions()[i]?.correctIndex).length;
  }

  startQuiz(subject: Subject) {
    this.currentSubject = subject;
    this.state.set('loading');
    this.sub?.unsubscribe();
    this.sub = this.quizService.getAllSubjectQuestions(subject).subscribe(qs => {
      const questions = qs.slice(0, 10);
      this.questions.set(questions);
      this.currentIndex.set(0);
      this.answers.set([]);
      this.selectedOption.set(null);
      this.showExplanation.set(false);
      this.score.set(0);
      this.xpEarned.set(0);
      this.state.set('playing');
      this.startTimer();
    });
  }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft.set(20);
    this.timer = setInterval(() => {
      if (this.timeLeft() <= 1) {
        clearInterval(this.timer);
        if (this.selectedOption() === null) {
          this.selectOption(-1); // time out
        }
      } else {
        this.timeLeft.update(t => t - 1);
      }
    }, 1000);
  }

  selectOption(index: number) {
    if (this.selectedOption() !== null) return;
    clearInterval(this.timer);
    this.selectedOption.set(index);
    this.showExplanation.set(true);

    const q = this.currentQuestion!;
    const correct = index === q.correctIndex;
    if (correct) {
      this.score.update(s => s + 1);
      this.xpEarned.update(x => x + q.xpReward);
    }
    this.answers.update(a => [...a, index]);
  }

  nextQuestion() {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedOption.set(null);
      this.showExplanation.set(false);
      this.startTimer();
    } else {
      clearInterval(this.timer);
      this.state.set('results');
      this.saveProgress();
    }
  }

  private async saveProgress() {
    const xp = this.xpEarned();
    if (xp <= 0) return;

    const fireUser = await firstValueFrom(user(this.auth));
    if (!fireUser) return;

    const userRef = doc(this.firestore, `users/${fireUser.uid}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as any;
    const newXp = (userData?.xp || 0) + xp;
    const newLevel = getLevelFromXp(newXp);

    const updates: any = {
      xp: newXp,
      level: newLevel,
      coins: increment(Math.floor(xp / 10)),
    };

    // Actualiza la stat de la asignatura
    if (this.currentSubject) {
      updates[`stats.${this.currentSubject}`] = (userData?.stats?.[this.currentSubject] || 0) + xp;
    }

    await updateDoc(userRef, updates);
  }

  restart() {
    this.state.set('select');
  }

  getOptionClass(i: number): string {
    const sel = this.selectedOption();
    const correct = this.currentQuestion?.correctIndex;
    if (sel === null) return 'bg-[#1e293b] border-slate-700/50 text-white hover:border-indigo-500';
    if (i === correct) return 'bg-emerald-600/30 border-emerald-500 text-emerald-200';
    if (i === sel && sel !== correct) return 'bg-red-600/30 border-red-500 text-red-200';
    return 'bg-[#1e293b] border-slate-700/30 text-slate-500';
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.sub?.unsubscribe();
  }
}
