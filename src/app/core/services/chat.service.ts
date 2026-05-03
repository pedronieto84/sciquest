import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  collectionData,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat, ChatMessage } from '../models/chat.model';
import { SciUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private firestore = inject(Firestore);

  /** Genera el chatId determinista entre dos usuarios */
  getChatId(uid1: string, uid2: string): string {
    return [uid1, uid2].sort().join('_');
  }

  /** Obtiene o crea un chat entre dos usuarios */
  async getOrCreateChat(me: SciUser, other: SciUser): Promise<string> {
    const chatId = this.getChatId(me.uid, other.uid);
    const ref = doc(this.firestore, `chats/${chatId}`);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const chatData: Omit<Chat, 'id'> = {
        participants: [me.uid, other.uid],
        lastMessage: '',
        lastMessageAt: serverTimestamp(),
        participantData: {
          [me.uid]: { username: me.username, displayName: me.displayName, avatar: me.avatar },
          [other.uid]: { username: other.username, displayName: other.displayName, avatar: other.avatar },
        },
      };
      await setDoc(ref, chatData);
    }
    return chatId;
  }

  /** Envía un mensaje */
  async sendMessage(chatId: string, senderId: string, text: string): Promise<void> {
    const msgRef = collection(this.firestore, `chats/${chatId}/messages`);
    const msg: ChatMessage = {
      senderId,
      text: text.trim(),
      createdAt: serverTimestamp(),
    };
    await addDoc(msgRef, msg);

    // Actualiza el resumen del chat
    const chatRef = doc(this.firestore, `chats/${chatId}`);
    await updateDoc(chatRef, {
      lastMessage: text.trim(),
      lastMessageAt: serverTimestamp(),
    });
  }

  /** Stream de mensajes en tiempo real — ordena en cliente para evitar índice */
  getMessages(chatId: string): Observable<ChatMessage[]> {
    return new Observable(observer => {
      const ref = collection(this.firestore, `chats/${chatId}/messages`);
      const q = query(ref);
      const unsub = onSnapshot(q,
        snap => {
          const msgs = snap.docs
            .map(d => ({ id: d.id, ...d.data() } as ChatMessage))
            .sort((a, b) => {
              const ta = (a.createdAt as any)?.toMillis?.() ?? 0;
              const tb = (b.createdAt as any)?.toMillis?.() ?? 0;
              return ta - tb;
            });
          observer.next(msgs);
        },
        err => { console.error('getMessages error:', err); observer.next([]); }
      );
      return () => unsub();
    });
  }

  /** Lista de chats de un usuario — sin orderBy para evitar índice compuesto */
  getMyChats(myUid: string): Observable<Chat[]> {
    return new Observable(observer => {
      const ref = collection(this.firestore, 'chats');
      const q = query(ref, where('participants', 'array-contains', myUid));
      const unsub = onSnapshot(q,
        snap => {
          const chats = snap.docs
            .map(d => ({ id: d.id, ...d.data() } as Chat))
            .sort((a, b) => {
              const ta = (a.lastMessageAt as any)?.toMillis?.() ?? 0;
              const tb = (b.lastMessageAt as any)?.toMillis?.() ?? 0;
              return tb - ta;
            });
          observer.next(chats);
        },
        err => {
          console.error('getMyChats error:', err);
          getDocs(q)
            .then(snap => observer.next(snap.docs.map(d => ({ id: d.id, ...d.data() } as Chat))))
            .catch(() => observer.next([]));
        }
      );
      return () => unsub();
    });
  }

  /** Obtiene datos del otro participante en un chat */
  getOtherParticipant(chat: Chat, myUid: string): { username: string; displayName: string; avatar: string } | null {
    const otherUid = chat.participants.find(uid => uid !== myUid);
    if (!otherUid) return null;
    return chat.participantData?.[otherUid] ?? null;
  }
}
