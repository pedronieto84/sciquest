import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { SciUser } from '../../core/models/user.model';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mi-cuenta.component.html',
})
export class MiCuentaComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  sciUser = signal<SciUser | null>(null);
  activeTab = signal<'amigos' | 'chat' | 'buscar-amigos'>('amigos');

  private subs: Subscription[] = [];

  ngOnInit() {
    this.updateActiveTab(this.router.url);
    this.subs.push(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
      ).subscribe((e: any) => this.updateActiveTab(e.urlAfterRedirects ?? e.url)),
    );

    // Carga el usuario con getDoc (evita fallos silenciosos de docData)
    this.subs.push(
      user(this.auth).subscribe(async u => {
        if (!u) { this.sciUser.set(null); return; }
        try {
          const snap = await getDoc(doc(this.firestore, `users/${u.uid}`));
          if (snap.exists()) this.sciUser.set(snap.data() as SciUser);
        } catch(e) { console.error('mi-cuenta user load error:', e); }
      }),
    );
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }

  private updateActiveTab(url: string) {
    if (url.includes('buscar-amigos')) this.activeTab.set('buscar-amigos');
    else if (url.includes('chat')) this.activeTab.set('chat');
    else this.activeTab.set('amigos');
  }

  goTab(tab: 'amigos' | 'chat' | 'buscar-amigos') {
    this.activeTab.set(tab);
    this.router.navigate(['/mi-cuenta', tab]);
  }
}
