import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { SciUser, LEVEL_XP_THRESHOLDS } from '../../core/models/user.model';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { PromoCodeComponent } from '../../shared/promo-code/promo-code.component';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PromoCodeComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private quizService = inject(QuizService);

  sciUser = signal<SciUser | null>(null);
  private sub?: Subscription;

  readonly subjects = [
    { id: 'chemistry', label: 'Química', emoji: '🧪', color: 'from-emerald-600 to-teal-500', route: '/chemistry' },
    { id: 'quantum', label: 'Cuántica', emoji: '⚛️', color: 'from-indigo-600 to-purple-500', route: '/quantum' },
    { id: 'nuclear', label: 'Nuclear', emoji: '☢️', color: 'from-amber-600 to-orange-500', route: '/nuclear' },
    { id: 'newtonian', label: 'Newtoniana', emoji: '🍎', color: 'from-blue-600 to-cyan-500', route: '/newtonian' },
    { id: 'biology', label: 'Biología', emoji: '🧬', color: 'from-green-600 to-emerald-500', route: '/biology' },
    { id: 'astronomy', label: 'Astronomía', emoji: '🌌', color: 'from-slate-700 to-indigo-600', route: '/astronomy' },
  ];

  ngOnInit() {
    // Usar getDoc (one-shot) en vez de docData (real-time) para evitar fallos silenciosos
    this.sub = user(this.auth).subscribe(async fireUser => {
      if (!fireUser) { this.sciUser.set(null); return; }
      try {
        const snap = await getDoc(doc(this.firestore, `users/${fireUser.uid}`));
        if (snap.exists()) {
          this.sciUser.set(snap.data() as SciUser);
        }
      } catch (e) {
        console.error('Error loading user doc:', e);
      }
    });

    // Precarga todas las preguntas en background para que el quiz sea instantáneo
    this.quizService.preloadAll();
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  get levelProgress(): number {
    const u = this.sciUser();
    if (!u) return 0;
    const lvl = u.level;
    const current = LEVEL_XP_THRESHOLDS[lvl - 1] || 0;
    const next = LEVEL_XP_THRESHOLDS[lvl] || LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1];
    return Math.min(100, Math.round(((u.xp - current) / (next - current)) * 100));
  }

  getSubjectXp(subjectId: string): number {
    const stats = this.sciUser()?.stats as any;
    return stats?.[subjectId] || 0;
  }

  onPromoRedeemed(xp: number) {
    console.log(`Promo redeemed: +${xp} XP`);
  }

  logout() { this.authService.logout(); }
}
