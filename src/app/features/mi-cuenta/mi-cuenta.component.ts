import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FriendsService } from '../../core/services/friends.service';
// FriendNotification type imported indirectly via service
import { ChatService } from '../../core/services/chat.service';
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
  private friendsService = inject(FriendsService);
  private chatService = inject(ChatService);
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  sciUser = signal<SciUser | null>(null);
  activeTab = signal<'amigos' | 'chat' | 'buscar-amigos'>('amigos');
  pendingRequestsCount = signal(0);
  unreadChatsCount = signal(0);

  private subs: Subscription[] = [];
  private myUid = '';

  ngOnInit() {
    this.updateActiveTab(this.router.url);
    this.subs.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: any) => this.updateActiveTab(e.urlAfterRedirects ?? e.url)),
    );

    this.subs.push(
      user(this.auth).subscribe(async u => {
        if (!u) { this.sciUser.set(null); return; }
        this.myUid = u.uid;
        try {
          const snap = await getDoc(doc(this.firestore, `users/${u.uid}`));
          if (snap.exists()) this.sciUser.set(snap.data() as SciUser);
        } catch(e) { console.error('mi-cuenta user load error:', e); }

        // Badge nuevos amigos
        this.subs.push(
          this.friendsService.getNotifications(u.uid).subscribe(notifs => {
            this.pendingRequestsCount.set(notifs.length);
          })
        );

        // Badge mensajes no leídos (chats con mensajes)
        this.subs.push(
          this.chatService.getMyChats(u.uid).subscribe(chats => {
            const unread = chats.filter(c => c.lastMessage && c.lastMessage !== '').length;
            this.unreadChatsCount.set(unread);
          })
        );
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
