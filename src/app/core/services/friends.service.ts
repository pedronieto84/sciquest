import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  collectionData,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Friend } from '../models/friendship.model';
import { SciUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class FriendsService {
  private firestore = inject(Firestore);

  /** Lista reactiva de amigos del usuario (real-time — puede fallar silenciosamente) */
  getFriends(myUid: string): Observable<Friend[]> {
    const ref = collection(this.firestore, `friendships/${myUid}/friends`);
    return collectionData(ref, { idField: 'uid' }) as Observable<Friend[]>;
  }

  /** Lista de amigos one-shot (fiable) */
  async getFriendsList(myUid: string): Promise<Friend[]> {
    const ref = collection(this.firestore, `friendships/${myUid}/friends`);
    const snap = await getDocs(ref);
    return snap.docs.map(d => ({ uid: d.id, ...d.data() } as Friend));
  }

  /** Agrega a alguien como amigo (unilateral, sin necesidad de aceptación) */
  async addFriend(myUid: string, target: SciUser): Promise<void> {
    const ref = doc(this.firestore, `friendships/${myUid}/friends/${target.uid}`);
    await setDoc(ref, {
      uid: target.uid,
      username: target.username || '',
      displayName: target.displayName || '',
      avatar: target.avatar || '🔬',
      addedAt: serverTimestamp(),
    });
  }

  /** Elimina un amigo */
  async removeFriend(myUid: string, friendUid: string): Promise<void> {
    const ref = doc(this.firestore, `friendships/${myUid}/friends/${friendUid}`);
    await deleteDoc(ref);
  }

  /** Comprueba si ya es amigo */
  async isFriend(myUid: string, targetUid: string): Promise<boolean> {
    const ref = doc(this.firestore, `friendships/${myUid}/friends/${targetUid}`);
    const snap = await getDoc(ref);
    return snap.exists();
  }

  /** Busca usuarios por username (búsqueda exacta, case-sensitive en Firestore) */
  async searchUsers(searchTerm: string): Promise<SciUser[]> {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];
    const ref = collection(this.firestore, 'users');
    // Búsqueda por prefijo de username
    const q = query(
      ref,
      where('username', '>=', term),
      where('username', '<=', term + '\uf8ff'),
      orderBy('username'),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as SciUser);
  }

  /** Obtiene todos los usuarios para "Buscar amigos" */
  async getAllUsers(): Promise<SciUser[]> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, orderBy('xp', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as SciUser);
  }
}
