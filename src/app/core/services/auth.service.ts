import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, user, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from, switchMap, of } from 'rxjs';
import { SciUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  readonly user$ = user(this.auth);

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    await this.ensureUserDoc(cred.user);
    await this.router.navigate(['/home']);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    await this.ensureUserDoc(cred.user);
    await this.router.navigate(['/home']);
  }

  async registerWithEmail(email: string, password: string, displayName: string): Promise<void> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(cred.user, { displayName });
    await this.ensureUserDoc(cred.user);
    await this.router.navigate(['/home']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/auth']);
  }

  async ensureUserDoc(fireUser: any): Promise<void> {
    const ref = doc(this.firestore, `users/${fireUser.uid}`);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const newUser: SciUser = {
        uid: fireUser.uid,
        username: '',
        displayName: fireUser.displayName || 'Explorador',
        email: fireUser.email || '',
        avatar: this.randomAvatar(),
        photoUrl: fireUser.photoURL || '',
        level: 1,
        xp: 0,
        coins: 50,
        badges: ['newcomer'],
        stats: { chemistry: 0, quantum: 0, nuclear: 0, newtonian: 0, biology: 0, astronomy: 0 },
        createdAt: new Date(),
      };
      await setDoc(ref, newUser);
    }
  }

  getUserDoc(uid: string) {
    return doc(this.firestore, `users/${uid}`);
  }

  getCurrentUserDoc(uid: string): Observable<SciUser | null> {
    return docData(doc(this.firestore, `users/${uid}`)) as Observable<SciUser | null>;
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('username', '==', username.toLowerCase().trim()));
    const snap = await getDocs(q);
    return snap.empty;
  }

  async setUsername(uid: string, username: string): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}`);
    await updateDoc(ref, { username: username.toLowerCase().trim() });
  }

  private randomAvatar(): string {
    const avatars = ['🦊','🐯','🦁','🐸','🦋','🐙','🦄','🐲','🦅','🐬'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }
}
