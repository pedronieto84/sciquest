import { Component, inject, OnInit, OnDestroy, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Subscription, firstValueFrom } from 'rxjs';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatMessage } from '../../../../core/models/chat.model';
import { SciUser } from '../../../../core/models/user.model';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-room.component.html',
})
export class ChatRoomComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  // Bloquea el scroll del contenedor padre (mi-cuenta) para que
  // el chat maneje su propio layout con flex interno
  private parentScrollEl: HTMLElement | null = null;
  private elRef = inject(ElementRef);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(Auth);
  private chatService = inject(ChatService);
  private firestore = inject(Firestore);

  messages = signal<ChatMessage[]>([]);
  loading = signal(true);
  sending = signal(false);
  newMessage = '';

  myUid = signal<string>('');
  myUser = signal<SciUser | null>(null);
  otherUser = signal<SciUser | null>(null);
  chatId = signal<string>('');

  private subs: Subscription[] = [];
  private shouldScrollToBottom = true;

  async ngOnInit() {
    // Deshabilita el scroll del padre (overflow-y-auto de mi-cuenta)
    // para que el chat controle su propio layout flex
    const host = this.elRef.nativeElement as HTMLElement;
    const parent = host.parentElement;
    if (parent) {
      this.parentScrollEl = parent;
      parent.style.overflow = 'hidden';
      parent.style.display = 'flex';
      parent.style.flexDirection = 'column';
    }

    const fireUser = await firstValueFrom(user(this.auth));
    if (!fireUser) return;
    this.myUid.set(fireUser.uid);

    // Carga el usuario propio
    const meSnap = await getDoc(doc(this.firestore, `users/${fireUser.uid}`));
    if (!meSnap.exists()) return;
    const me = { uid: fireUser.uid, ...meSnap.data() } as SciUser;
    this.myUser.set(me);

    // Carga el usuario del otro
    const friendUid = this.route.snapshot.paramMap.get('friendUid')!;
    const otherSnap = await getDoc(doc(this.firestore, `users/${friendUid}`));
    if (!otherSnap.exists()) { this.router.navigate(['/mi-cuenta/chat']); return; }
    const other = otherSnap.data() as SciUser;
    this.otherUser.set(other);

    // Crea/obtiene el chat
    const chatId = await this.chatService.getOrCreateChat(me as SciUser, other);
    this.chatId.set(chatId);

    // Marca como leído al entrar
    await this.chatService.markAsRead(chatId, fireUser.uid);

    // Suscribe a mensajes en tiempo real
    this.subs.push(
      this.chatService.getMessages(chatId).subscribe(msgs => {
        this.messages.set(msgs);
        this.loading.set(false);
        this.shouldScrollToBottom = true;
      }),
    );
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    // Restaura el scroll del padre al salir del chat
    if (this.parentScrollEl) {
      this.parentScrollEl.style.overflow = '';
      this.parentScrollEl.style.display = '';
      this.parentScrollEl.style.flexDirection = '';
    }
  }

  async send() {
    const text = this.newMessage.trim();
    if (!text || this.sending()) return;

    this.sending.set(true);
    this.newMessage = '';
    try {
      const participants = [this.myUid(), this.otherUser()?.uid].filter(Boolean) as string[];
      await this.chatService.sendMessage(this.chatId(), this.myUid(), text, participants);
      this.shouldScrollToBottom = true;
    } finally {
      this.sending.set(false);
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private scrollToBottom() {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  isMyMessage(msg: ChatMessage): boolean {
    return msg.senderId === this.myUid();
  }

  formatTime(ts: any): string {
    if (!ts) return '';
    const date = ts?.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  getAvatar(user: SciUser | null): string {
    if (!user?.avatar || user.avatar.startsWith('http')) return '🔬';
    return user.avatar;
  }

  goBack() {
    this.router.navigate(['/mi-cuenta/chat']);
  }
}
