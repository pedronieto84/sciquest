import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { switchMap, of, Subscription, firstValueFrom } from 'rxjs';
import { FriendsService } from '../../../core/services/friends.service';
import { ChatService } from '../../../core/services/chat.service';
import { AuthService } from '../../../core/services/auth.service';
import { Friend } from '../../../core/models/friendship.model';
import { SciUser } from '../../../core/models/user.model';
import { Firestore, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-amigos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './amigos.component.html',
})
export class AmigosComponent implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  private friendsService = inject(FriendsService);
  private chatService = inject(ChatService);
  private firestore = inject(Firestore);
  private router = inject(Router);

  friends = signal<Friend[]>([]);
  loading = signal(true);
  myUser = signal<SciUser | null>(null);

  private subs: Subscription[] = [];

  ngOnInit() {
    this.subs.push(
      user(this.auth).pipe(
        switchMap(u => {
          if (!u) return of(null);
          // Carga el usuario propio
          (docData(this.authService.getUserDoc(u.uid)) as any).subscribe((sciUser: SciUser) => {
            this.myUser.set(sciUser);
          });
          // Carga la lista de amigos
          return this.friendsService.getFriends(u.uid);
        }),
      ).subscribe(friends => {
        this.friends.set(friends ?? []);
        this.loading.set(false);
      }),
    );
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }

  async openChat(friend: Friend) {
    const me = this.myUser();
    if (!me) return;

    // Crea el chat si no existe y navega al chat room
    const friendAsUser: SciUser = {
      uid: friend.uid,
      username: friend.username,
      displayName: friend.displayName,
      avatar: friend.avatar,
      email: '',
      level: 1,
      xp: 0,
      coins: 0,
      badges: [],
      stats: { chemistry: 0, quantum: 0, nuclear: 0, newtonian: 0, biology: 0, astronomy: 0 },
      createdAt: new Date(),
    };
    await this.chatService.getOrCreateChat(me, friendAsUser);
    this.router.navigate(['/mi-cuenta/chat', friend.uid]);
  }

  async removeFriend(friend: Friend) {
    const myUid = this.myUser()?.uid;
    if (!myUid) return;
    await this.friendsService.removeFriend(myUid, friend.uid);
  }

  getAvatar(f: Friend): string {
    if (!f.avatar || f.avatar.startsWith('http')) return '🔬';
    return f.avatar;
  }
}
