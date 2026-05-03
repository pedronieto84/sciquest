import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Friend, FriendRequest } from '../models/friendship.model';
import { SciUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class FriendsService {
  private firestore = inject(Firestore);

  /** Lista de amigos one-shot */
  async getFriendsList(myUid: string): Promise<Friend[]> {
    const snap = await getDocs(collection(this.firestore, `friendships/${myUid}/friends`));
    return snap.docs.map(d => ({ uid: d.id, ...d.data() } as Friend));
  }

  /** Envía solicitud de amistad (escribe en incoming del destinatario y outgoing del remitente) */
  async sendRequest(fromUser: SciUser, toUid: string): Promise<void> {
    const data = {
      fromUid: fromUser.uid,
      fromDisplayName: fromUser.displayName || '',
      fromUsername: fromUser.username || '',
      fromAvatar: fromUser.avatar || '🔬',
      createdAt: serverTimestamp(),
    };
    await Promise.all([
      setDoc(doc(this.firestore, `friendRequests/${toUid}/incoming/${fromUser.uid}`), data),
      setDoc(doc(this.firestore, `friendRequests/${fromUser.uid}/outgoing/${toUid}`), { toUid, createdAt: serverTimestamp() }),
    ]);
  }

  /** Acepta solicitud: añade amigo en ambas direcciones y elimina la solicitud */
  async acceptRequest(myUser: SciUser, req: FriendRequest): Promise<void> {
    const addMe = doc(this.firestore, `friendships/${myUser.uid}/friends/${req.fromUid}`);
    const addThem = doc(this.firestore, `friendships/${req.fromUid}/friends/${myUser.uid}`);
    const reqRef = doc(this.firestore, `friendRequests/${myUser.uid}/incoming/${req.fromUid}`);
    await Promise.all([
      setDoc(addMe, { uid: req.fromUid, username: req.fromUsername, displayName: req.fromDisplayName, avatar: req.fromAvatar, addedAt: serverTimestamp() }),
      setDoc(addThem, { uid: myUser.uid, username: myUser.username || '', displayName: myUser.displayName || '', avatar: myUser.avatar || '🔬', addedAt: serverTimestamp() }),
      deleteDoc(reqRef),
      deleteDoc(doc(this.firestore, `friendRequests/${req.fromUid}/outgoing/${myUser.uid}`)),
    ]);
  }

  /** Rechaza solicitud */
  async rejectRequest(myUid: string, fromUid: string): Promise<void> {
    await Promise.all([
      deleteDoc(doc(this.firestore, `friendRequests/${myUid}/incoming/${fromUid}`)),
      deleteDoc(doc(this.firestore, `friendRequests/${fromUid}/outgoing/${myUid}`)),
    ]);
  }

  /** Solicitudes pendientes en tiempo real */
  getPendingRequests(myUid: string): Observable<FriendRequest[]> {
    return new Observable(obs => {
      const ref = collection(this.firestore, `friendRequests/${myUid}/incoming`);
      const unsub = onSnapshot(ref,
        snap => obs.next(snap.docs.map(d => d.data() as FriendRequest)),
        err => { console.error('requests error:', err); obs.next([]); }
      );
      return () => unsub();
    });
  }

  /** Comprueba si ya es amigo o tiene solicitud pendiente */
  async getRelationStatus(myUid: string, targetUid: string): Promise<'friend' | 'pending' | 'none'> {
    const [friendSnap, reqSnap] = await Promise.all([
      getDoc(doc(this.firestore, `friendships/${myUid}/friends/${targetUid}`)),
      getDoc(doc(this.firestore, `friendRequests/${targetUid}/incoming/${myUid}`)),
    ]);
    if (friendSnap.exists()) return 'friend';
    if (reqSnap.exists()) return 'pending';
    return 'none';
  }

  /** Elimina un amigo (bidireccional) */
  async removeFriend(myUid: string, friendUid: string): Promise<void> {
    await Promise.all([
      deleteDoc(doc(this.firestore, `friendships/${myUid}/friends/${friendUid}`)),
      deleteDoc(doc(this.firestore, `friendships/${friendUid}/friends/${myUid}`)),
    ]);
  }

  /** Obtiene todos los usuarios */
  async getAllUsers(): Promise<SciUser[]> {
    const snap = await getDocs(collection(this.firestore, 'users'));
    return snap.docs
      .map(d => ({ uid: d.id, ...d.data() } as SciUser))
      .sort((a, b) => (b.xp || 0) - (a.xp || 0));
  }
}
