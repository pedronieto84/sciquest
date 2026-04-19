import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Firestore, docData } from '@angular/fire/firestore';
import { SciUser, LEVEL_XP_THRESHOLDS } from '../../core/models/user.model';
import { Auth, user } from '@angular/fire/auth';
import { switchMap, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  sciUser = signal<SciUser | null>(null);
  private sub?: Subscription;

  readonly subjects = [
    { id: 'chemistry', label: 'Química', emoji: '🧪', color: 'from-emerald-600 to-teal-500', route: '/chemistry' },
    { id: 'quantum', label: 'Cuántica', emoji: '⚛️', color: 'from-indigo-600 to-purple-500', route: '/quantum' },
    { id: 'nuclear', label: 'Nuclear', emoji: '☢️', color: 'from-amber-600 to-orange-500', route: '/nuclear' },
    { id: 'newtonian', label: 'Newtoniana', emoji: '🍎', color: 'from-blue-600 to-cyan-500', route: '/newtonian' },
  ];

  ngOnInit() {
    this.sub = user(this.auth).pipe(
      switchMap(u => {
        if (!u) return of(null);
        return docData(this.authService.getUserDoc(u.uid)) as any;
      }),
    ).subscribe(u => this.sciUser.set(u as SciUser | null));
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

  logout() { this.authService.logout(); }
}
