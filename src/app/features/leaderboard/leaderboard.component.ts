import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, query, orderBy, limit, getDocs } from '@angular/fire/firestore';

interface LeaderEntry { uid: string; displayName: string; avatar: string; xp: number; level: number; }

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  private firestore = inject(Firestore);
  entries = signal<LeaderEntry[]>([]);
  loading = signal(true);

  async ngOnInit() {
    try {
      const q = query(collection(this.firestore, 'users'), orderBy('xp', 'desc'), limit(20));
      const snap = await getDocs(q);
      this.entries.set(snap.docs.map(d => d.data() as LeaderEntry));
    } catch { /* offline or no data */ }
    this.loading.set(false);
  }

  medal(i: number): string {
    return ['🥇', '🥈', '🥉'][i] || `${i + 1}`;
  }
}
