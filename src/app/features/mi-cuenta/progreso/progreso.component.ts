import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ProgressService, ProgressSession } from '../../../core/services/progress.service';
import { SciUser } from '../../../core/models/user.model';

interface SubjectProgress {
  id: string;
  emoji: string;
  label: string;
  baseline: number;
  currentAvg: number;
  sessions: ProgressSession[];
}

const SUBJECT_META: Record<string, { emoji: string; label: string }> = {
  chemistry: { emoji: '🧪', label: 'Química' },
  quantum: { emoji: '⚛️', label: 'Cuántica' },
  nuclear: { emoji: '☢️', label: 'Nuclear' },
  newtonian: { emoji: '🍎', label: 'Newtoniana' },
  biology: { emoji: '🧬', label: 'Biología' },
  astronomy: { emoji: '🌌', label: 'Astronomía' },
};

@Component({
  selector: 'app-progreso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progreso.component.html',
})
export class ProgresoComponent implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private progressService = inject(ProgressService);

  subjectProgress = signal<SubjectProgress[]>([]);
  loading = signal(true);
  private subs: Subscription[] = [];

  ngOnInit() {
    this.subs.push(
      user(this.auth).subscribe(async fireUser => {
        if (!fireUser) return;
        const uid = fireUser.uid;

        // Load user doc for interests and baselines
        const snap = await getDoc(doc(this.firestore, `users/${uid}`));
        if (!snap.exists()) { this.loading.set(false); return; }
        const sciUser = snap.data() as SciUser;
        const interests = sciUser.subjectInterests || [];
        const baselines = sciUser.subjectBaselines || {};

        if (interests.length === 0) { this.loading.set(false); return; }

        // Load all sessions
        this.subs.push(
          this.progressService.getSessions(uid).subscribe(allSessions => {
            const progress: SubjectProgress[] = interests.map(sub => {
              const meta = SUBJECT_META[sub] || { emoji: '📚', label: sub };
              const sessions = allSessions
                .filter(s => s.subject === sub)
                .slice(0, 10); // last 10
              const last5 = sessions.slice(0, 5);
              const currentAvg = last5.length > 0
                ? Math.round(last5.reduce((sum, s) => sum + s.percentage, 0) / last5.length)
                : 0;
              return {
                id: sub,
                emoji: meta.emoji,
                label: meta.label,
                baseline: baselines[sub] || 0,
                currentAvg,
                sessions: [...sessions].reverse(), // chronological for sparkline
              };
            });
            this.subjectProgress.set(progress);
            this.loading.set(false);
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  getSparklinePoints(sessions: ProgressSession[]): string {
    if (sessions.length === 0) return '';
    if (sessions.length === 1) return '100,${60 - (sessions[0].percentage / 100 * 60)}';
    const n = sessions.length;
    return sessions.map((s, i) => {
      const x = i * (200 / (n - 1));
      const y = 60 - (s.percentage / 100 * 60);
      return `${x},${y}`;
    }).join(' ');
  }

  getSparklineDots(sessions: ProgressSession[]): { cx: number; cy: number }[] {
    if (sessions.length <= 1) return [];
    const n = sessions.length;
    return sessions.map((s, i) => ({
      cx: i * (200 / (n - 1)),
      cy: 60 - (s.percentage / 100 * 60),
    }));
  }
}
