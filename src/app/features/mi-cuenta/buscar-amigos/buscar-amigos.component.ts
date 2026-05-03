import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc, getDocs, collection } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { FriendsService } from '../../../core/services/friends.service';
import { ChatService } from '../../../core/services/chat.service';
import { SciUser } from '../../../core/models/user.model';

interface UserWithStatus extends SciUser {
  status: 'none' | 'friend' | 'pending';
  acting: boolean;
}

@Component({
  selector: 'app-buscar-amigos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-amigos.component.html',
})
export class BuscarAmigosComponent implements OnInit {
  private auth = inject(Auth);
  private friendsService = inject(FriendsService);
  private chatService = inject(ChatService);
  private firestore = inject(Firestore);
  private router = inject(Router);

  searchTerm = '';
  allUsers = signal<UserWithStatus[]>([]);
  filteredUsers = signal<UserWithStatus[]>([]);
  loading = signal(true);
  myUid = signal<string>('');
  myUser = signal<SciUser | null>(null);

  async ngOnInit() {
    const fireUser = await firstValueFrom(user(this.auth));
    if (!fireUser) return;
    this.myUid.set(fireUser.uid);

    const snap = await getDoc(doc(this.firestore, `users/${fireUser.uid}`));
    if (snap.exists()) this.myUser.set(snap.data() as SciUser);

    await this.loadUsers();
  }

  async loadUsers() {
    this.loading.set(true);
    const myUid = this.myUid();

    // Cargar datos propios en paralelo (sin tocar datos ajenos)
    const [users, friendsSnap, outgoingSnap] = await Promise.all([
      this.friendsService.getAllUsers(),
      getDocs(collection(this.firestore, `friendships/${myUid}/friends`)),
      getDocs(collection(this.firestore, `friendRequests/${myUid}/outgoing`)),
    ]);

    const friendSet = new Set(friendsSnap.docs.map(d => d.id));
    const pendingSet = new Set(outgoingSnap.docs.map(d => d.id));

    const enriched: UserWithStatus[] = users
      .filter(u => u.uid !== myUid)
      .map(u => ({
        ...u,
        status: friendSet.has(u.uid) ? 'friend' : pendingSet.has(u.uid) ? 'pending' : 'none',
        acting: false,
      }));

    this.allUsers.set(enriched);
    this.filteredUsers.set(enriched);
    this.loading.set(false);
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) { this.filteredUsers.set(this.allUsers()); return; }
    this.filteredUsers.set(
      this.allUsers().filter(u =>
        (u.username || '').toLowerCase().includes(term) ||
        (u.displayName || '').toLowerCase().includes(term),
      ),
    );
  }

  async sendRequest(targetUser: UserWithStatus) {
    const me = this.myUser();
    if (!me || targetUser.acting) return;
    targetUser.acting = true;
    this.filteredUsers.update(l => [...l]);

    await this.friendsService.sendRequest(me, targetUser.uid);

    targetUser.status = 'pending';
    targetUser.acting = false;
    this.filteredUsers.update(l => [...l]);
  }

  async openChat(targetUser: UserWithStatus) {
    const me = this.myUser();
    if (!me) return;
    await this.chatService.getOrCreateChat(me, targetUser);
    this.router.navigate(['/mi-cuenta/chat', targetUser.uid]);
  }

  getAvatar(u: SciUser): string {
    if (!u.avatar || u.avatar.startsWith('http')) return '🔬';
    return u.avatar;
  }
}
