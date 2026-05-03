import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Subscription, firstValueFrom } from 'rxjs';
import { FriendsService } from '../../../core/services/friends.service';
import { ChatService } from '../../../core/services/chat.service';
import { AuthService } from '../../../core/services/auth.service';
import { Friend } from '../../../core/models/friendship.model';
import { SciUser } from '../../../core/models/user.model';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

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
      user(this.auth).subscribe(async u => {
        if (!u) { this.loading.set(false); return; }
        try {
          // Carga usuario propio
          const snap = await getDoc(doc(this.firestore, `users/${u.uid}`));
          if (snap.exists()) this.myUser.set(snap.data() as SciUser);
          // Carga amigos
          const friends = await this.friendsService.getFriendsList(u.uid);
          this.friends.set(friends);
        } catch(e) { console.error('amigos load error:', e); }
        finally { this.loading.set(false); }
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
