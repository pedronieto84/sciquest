import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ChallengeService } from '../../core/services/challenge.service';
import { SciUser } from '../../core/models/user.model';
import { Challenge } from '../../core/models/challenge.model';
import { QuizService } from '../../core/services/quiz.service';
import { QuizQuestion, Subject } from '../../core/models/quiz.model';
import { switchMap, of, Subscription, Observable, take, filter } from 'rxjs';

type CompState = 'lobby' | 'create' | 'waiting' | 'playing' | 'waiting_results' | 'results';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './competition.component.html',
})
export class CompetitionComponent implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private challengeService = inject(ChallengeService);
  private quizService = inject(QuizService);

  state = signal<CompState>('lobby');
  currentUser = signal<SciUser | null>(null);
  allUsers = signal<SciUser[]>([]);
  pendingChallenges = signal<Challenge[]>([]);
  selectedOpponents = signal<string[]>([]);
  selectedSubject = signal<string>('mixed');
  currentChallenge = signal<Challenge | null>(null);
  questions = signal<QuizQuestion[]>([]);
  currentIndex = signal(0);
  answers = signal<number[]>([]);
  selectedOption = signal<number | null>(null);
  showExplanation = signal(false);
  myScore = signal(0);
  timeLeft = signal(20);
  loading = signal(false);
  error = signal('');

  private userSub?: Subscription;
  private challengeUnsub?: () => void;
  private timer: any;

  readonly subjects = [
    { id: 'mixed', label: 'Mixto', emoji: '🎲' },
    { id: 'chemistry', label: 'Química', emoji: '🧪' },
    { id: 'quantum', label: 'Cuántica', emoji: '⚛️' },
    { id: 'nuclear', label: 'Nuclear', emoji: '☢️' },
    { id: 'newtonian', label: 'Newtoniana', emoji: '🍎' },
    { id: 'biology', label: 'Biología', emoji: '🧬' },
    { id: 'astronomy', label: 'Astronomía', emoji: '🔭' },
  ];

  ngOnInit() {
    // Mantener currentUser actualizado en tiempo real (sin recargar la lista de usuarios)
    this.userSub = user(this.auth).pipe(
      switchMap(u => u
        ? (docData(doc(this.firestore, `users/${u.uid}`)) as Observable<SciUser>)
        : of(null)
      ),
    ).subscribe(u => {
      if (u) this.currentUser.set(u as SciUser);
    });

    // Carga inicial de datos: espera al primer usuario autenticado real (ignora null inicial)
    user(this.auth).pipe(
      filter(u => !!u),
      take(1),
    ).subscribe(async () => {
      await this.loadData();
    });
  }

  async loadData() {
    this.loading.set(true);

    // Carga usuarios y retos de forma independiente para que un fallo no bloquee lo otro
    try {
      const users = await this.challengeService.getAllUsers();
      this.allUsers.set(users.filter(u => u.uid !== this.currentUser()?.uid));
    } catch (e) {
      console.error('Error cargando usuarios:', e);
    }

    try {
      const pending = await this.challengeService.getPendingChallenges(this.currentUser()!.uid);
      // Only show challenges NOT created by current user (opponent's challenges to accept)
      this.pendingChallenges.set(pending.filter(c => c.createdBy !== this.currentUser()?.uid));
    } catch (e) {
      console.error('Error cargando retos pendientes (puede faltar índice en Firestore):', e);
    }

    this.loading.set(false);
  }

  toggleOpponent(uid: string) {
    const curr = this.selectedOpponents();
    if (curr.includes(uid)) {
      this.selectedOpponents.set(curr.filter(u => u !== uid));
    } else {
      this.selectedOpponents.set([...curr, uid]);
    }
  }

  async createChallenge() {
    if (!this.selectedOpponents().length || !this.currentUser()) return;
    this.loading.set(true);
    this.error.set('');
    try {
      const challengeId = await this.challengeService.createChallenge(
        this.selectedOpponents(),
        this.selectedSubject(),
        this.currentUser()!
      );
      // Go to waiting state — watch for opponent to accept
      this.state.set('waiting');
      this.challengeUnsub = this.challengeService.watchChallenge(challengeId, c => {
        this.currentChallenge.set(c);
        if (c.status === 'active' && this.state() === 'waiting') {
          // Opponent accepted — start playing
          this.loadQuestionsAndPlay(c);
        }
        if (c.status === 'finished') {
          this.state.set('results');
          this.stopTimer();
        }
      });
    } catch (e: any) {
      this.error.set(e.message || 'Error al crear el reto');
    }
    this.loading.set(false);
  }

  async acceptChallenge(challenge: Challenge) {
    this.loading.set(true);
    this.error.set('');
    try {
      // Accept — sets status to 'active'
      await this.challengeService.acceptChallenge(challenge.id!, this.currentUser()!.uid, []);
      const activeChallenge = { ...challenge, status: 'active' as const };
      this.currentChallenge.set(activeChallenge);

      // Watch for updates (finish)
      this.challengeUnsub = this.challengeService.watchChallenge(challenge.id!, c => {
        this.currentChallenge.set(c);
        if (c.status === 'finished') {
          this.state.set('results');
          this.stopTimer();
        }
      });

      // Start playing
      this.loadQuestionsAndPlay(activeChallenge);
    } catch (e: any) {
      this.error.set(e.message || 'Error al aceptar el reto');
    }
    this.loading.set(false);
  }

  private loadQuestionsAndPlay(challenge: Challenge) {
    const subject = challenge.subject;
    const subjectToLoad: Subject = (subject === 'mixed' ? 'chemistry' : subject) as Subject;

    this.quizService.getAllSubjectQuestions(subjectToLoad).pipe(take(1)).subscribe(qs => {
      const selected = qs.slice(0, 10);
      if (selected.length === 0) {
        this.error.set('No hay preguntas disponibles para esta materia');
        this.state.set('lobby');
        return;
      }
      this.questions.set(selected);
      this.currentIndex.set(0);
      this.answers.set([]);
      this.myScore.set(0);
      this.state.set('playing');
      this.nextQuestion();
    });
  }

  nextQuestion() {
    const idx = this.currentIndex();
    if (idx >= this.questions().length) {
      this.finishQuiz();
      return;
    }
    this.selectedOption.set(null);
    this.showExplanation.set(false);
    this.timeLeft.set(20);
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => {
      const t = this.timeLeft() - 1;
      if (t <= 0) {
        this.stopTimer();
        this.recordAnswer(-1);
      } else {
        this.timeLeft.set(t);
      }
    }, 1000);
  }

  stopTimer() { clearInterval(this.timer); }

  selectAnswer(optIndex: number) {
    if (this.selectedOption() !== null) return;
    this.stopTimer();
    this.selectedOption.set(optIndex);
    this.showExplanation.set(true);
    const q = this.questions()[this.currentIndex()];
    if (optIndex === q.correctIndex) {
      this.myScore.update(s => s + 10);
    } else {
      this.myScore.update(s => s - 3);
    }
    this.answers.update(a => [...a, optIndex]);
    setTimeout(() => {
      this.currentIndex.update(i => i + 1);
      this.nextQuestion();
    }, 1800);
  }

  recordAnswer(optIndex: number) {
    this.answers.update(a => [...a, optIndex]);
    this.currentIndex.update(i => i + 1);
    this.nextQuestion();
  }

  async finishQuiz() {
    this.stopTimer();
    const challenge = this.currentChallenge();
    if (!challenge) return;
    // Go to waiting_results state
    this.state.set('waiting_results');
    await this.challengeService.submitAnswers(
      challenge.id!,
      this.currentUser()!.uid,
      this.answers(),
      this.myScore()
    );
    // If challenge is now finished (we were the last), watcher will trigger results
  }

  get currentQuestion(): QuizQuestion | null {
    const qs = this.questions();
    const idx = this.currentIndex();
    return idx < qs.length ? qs[idx] : null;
  }

  get winner(): string | null {
    const c = this.currentChallenge();
    if (!c || c.status !== 'finished') return null;
    const sorted = Object.entries(c.scores).sort(([,a], [,b]) => b - a);
    return sorted[0]?.[0] || null;
  }

  get iWon(): boolean {
    return this.winner === this.currentUser()?.uid;
  }

  get xpChange(): number {
    const c = this.currentChallenge();
    const uid = this.currentUser()?.uid;
    if (!c?.xpTransfers || !uid) return 0;
    const gained = c.xpTransfers.filter(t => t.to === uid).reduce((s, t) => s + t.amount, 0);
    const lost = c.xpTransfers.filter(t => t.from === uid).reduce((s, t) => s + t.amount, 0);
    return gained - lost;
  }

  get sortedScores(): { uid: string; name: string; avatar: string; score: number }[] {
    const c = this.currentChallenge();
    if (!c) return [];
    return Object.entries(c.scores)
      .sort(([,a], [,b]) => b - a)
      .map(([uid, score]) => ({
        uid,
        name: c.participantNames?.[uid] || 'Jugador',
        avatar: c.participantAvatars?.[uid] || '🧑‍🔬',
        score,
      }));
  }

  async goToCreate() {
    this.selectedOpponents.set([]);
    this.selectedSubject.set('mixed');
    this.error.set('');
    this.loading.set(false); // Seguridad: nunca entrar en create con loading activo
    this.state.set('create');
    // Recargar la lista de usuarios al entrar (por si no cargó en ngOnInit)
    if (this.allUsers().length === 0) {
      await this.loadData();
    }
  }

  goToLobby() {
    this.challengeUnsub?.();
    this.challengeUnsub = undefined;
    this.state.set('lobby');
    this.selectedOpponents.set([]);
    this.currentChallenge.set(null);
    this.error.set('');
    this.loadData();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.challengeUnsub?.();
    this.stopTimer();
  }
}
