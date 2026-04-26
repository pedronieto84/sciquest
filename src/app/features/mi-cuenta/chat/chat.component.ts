import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { switchMap, of, Subscription } from 'rxjs';
import { ChatService } from '../../../core/services/chat.service';
import { Chat } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private chatService = inject(ChatService);
  private router = inject(Router);

  chats = signal<Chat[]>([]);
  loading = signal(true);
  myUid = signal<string>('');

  private sub?: Subscription;

  ngOnInit() {
    this.sub = user(this.auth).pipe(
      switchMap(u => {
        if (!u) return of([] as Chat[]);
        this.myUid.set(u.uid);
        return this.chatService.getMyChats(u.uid);
      }),
    ).subscribe(chats => {
      this.chats.set(chats);
      this.loading.set(false);
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  openChat(chat: Chat) {
    const other = this.chatService.getOtherParticipant(chat, this.myUid());
    const otherUid = chat.participants.find(uid => uid !== this.myUid());
    if (otherUid) this.router.navigate(['/mi-cuenta/chat', otherUid]);
  }

  getOther(chat: Chat) {
    return this.chatService.getOtherParticipant(chat, this.myUid());
  }

  getAvatar(chat: Chat): string {
    const other = this.getOther(chat);
    if (!other?.avatar || other.avatar.startsWith('http')) return '🔬';
    return other.avatar;
  }

  formatTime(ts: any): string {
    if (!ts) return '';
    const date = ts?.toDate ? ts.toDate() : new Date(ts);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 60000) return 'Ahora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }
}
