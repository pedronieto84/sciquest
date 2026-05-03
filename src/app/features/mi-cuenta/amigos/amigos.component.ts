import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FriendsService } from '../../../core/services/friends.service';
import { ChatService } from '../../../core/services/chat.service';
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
          const snap = await getDoc(doc(this.firestore, `users/${u.uid}`));
          if (snap.exists()) this.myUser.set(snap.data() as SciUser);
          this.friends.set(await this.friendsService.getFriendsList(u.uid));
          // Limpiar notificaciones con un pequeño delay para que el badge
          // haya actualizado la home antes de que desaparezcan
          setTimeout(() => this.friendsService.clearNotifications(u.uid), 3000);
        } catch(e) { console.error(e); }
        finally { this.loading.set(false); }
      })
    );
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }

  async openChat(friend: Friend) {
    const me = this.myUser();
    if (!me) return;
    const friendAsUser: SciUser = {
      uid: friend.uid, username: friend.username, displayName: friend.displayName,
      avatar: friend.avatar, email: '', level: 1, xp: 0, coins: 0, badges: [],
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
    this.friends.update(list => list.filter(f => f.uid !== friend.uid));
  }

  getAvatar(avatar: string): string {
    if (!avatar || avatar.startsWith('http')) return '🔬';
    return avatar;
  }
}
