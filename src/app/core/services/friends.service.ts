import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, doc, setDoc, deleteDoc,
  getDocs, serverTimestamp, onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Friend } from '../models/friendship.model';
import { SciUser } from '../models/user.model';

export interface FriendNotification {
  fromUid: string;
  fromDisplayName: string;
  fromUsername: string;
  fromAvatar: string;
  createdAt: any;
}

@Injectable({ providedIn: 'root' })
export class FriendsService {
  private firestore = inject(Firestore);

  /** Añade amigo en ambas direcciones inmediatamente + deja notificación al destinatario */
  async addFriend(fromUser: SciUser, toUser: SciUser): Promise<void> {
    await Promise.all([
      // Ambos se ven como amigos
      setDoc(doc(this.firestore, `friendships/${fromUser.uid}/friends/${toUser.uid}`), {
        uid: toUser.uid, username: toUser.username || '', displayName: toUser.displayName || '',
        avatar: toUser.avatar || '🔬', addedAt: serverTimestamp(),
      }),
      setDoc(doc(this.firestore, `friendships/${toUser.uid}/friends/${fromUser.uid}`), {
        uid: fromUser.uid, username: fromUser.username || '', displayName: fromUser.displayName || '',
        avatar: fromUser.avatar || '🔬', addedAt: serverTimestamp(),
      }),
      // Notificación para el destinatario
      setDoc(doc(this.firestore, `friendNotifications/${toUser.uid}/items/${fromUser.uid}`), {
        fromUid: fromUser.uid, fromDisplayName: fromUser.displayName || '',
        fromUsername: fromUser.username || '', fromAvatar: fromUser.avatar || '🔬',
        createdAt: serverTimestamp(),
      }),
    ]);
  }

  /** Elimina amigo (bidireccional) */
  async removeFriend(myUid: string, friendUid: string): Promise<void> {
    await Promise.all([
      deleteDoc(doc(this.firestore, `friendships/${myUid}/friends/${friendUid}`)),
      deleteDoc(doc(this.firestore, `friendships/${friendUid}/friends/${myUid}`)),
    ]);
  }

  /** Lista de amigos one-shot */
  async getFriendsList(myUid: string): Promise<Friend[]> {
    const snap = await getDocs(collection(this.firestore, `friendships/${myUid}/friends`));
    return snap.docs.map(d => ({ uid: d.id, ...d.data() } as Friend));
  }

  /** Notificaciones en tiempo real (alguien me añadió) */
  getNotifications(myUid: string): Observable<FriendNotification[]> {
    return new Observable(obs => {
      const unsub = onSnapshot(
        collection(this.firestore, `friendNotifications/${myUid}/items`),
        snap => obs.next(snap.docs.map(d => d.data() as FriendNotification)),
        err => { console.error('notifications error:', err); obs.next([]); }
      );
      return () => unsub();
    });
  }

  /** Limpia todas las notificaciones */
  async clearNotifications(myUid: string): Promise<void> {
    const snap = await getDocs(collection(this.firestore, `friendNotifications/${myUid}/items`));
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
  }

  /** Comprueba si ya es amigo */
  async isFriend(myUid: string, targetUid: string): Promise<boolean> {
    const snap = await getDocs(collection(this.firestore, `friendships/${myUid}/friends`));
    return snap.docs.some(d => d.id === targetUid);
  }

  /** Todos los usuarios ordenados por XP */
  async getAllUsers(): Promise<SciUser[]> {
    const snap = await getDocs(collection(this.firestore, 'users'));
    return snap.docs
      .map(d => ({ uid: d.id, ...d.data() } as SciUser))
      .sort((a, b) => (b.xp || 0) - (a.xp || 0));
  }
}
