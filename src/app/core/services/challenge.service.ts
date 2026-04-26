import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot,
  query, where, orderBy, getDocs, arrayUnion, Timestamp, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge.model';
import { SciUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  getAllUsers(): Promise<SciUser[]> {
    const ref = collection(this.firestore, 'users');
    return getDocs(ref).then(snap => snap.docs.map(d => d.data() as SciUser));
  }

  async createChallenge(opponentUids: string[], subject: string, creatorUser: SciUser): Promise<string> {
    const allParticipants = [creatorUser.uid, ...opponentUids];
    // Obtener datos de los oponentes
    const opponentDocs = await Promise.all(
      opponentUids.map(uid => getDoc(doc(this.firestore, `users/${uid}`)))
    );
    const participantNames: {[k:string]: string} = { [creatorUser.uid]: creatorUser.displayName };
    const participantAvatars: {[k:string]: string} = { [creatorUser.uid]: creatorUser.avatar };
    opponentDocs.forEach(d => {
      const u = d.data() as SciUser;
      participantNames[u.uid] = u.displayName;
      participantAvatars[u.uid] = u.avatar;
    });

    const challenge: Omit<Challenge, 'id'> = {
      createdBy: creatorUser.uid,
      createdAt: Timestamp.now(),
      subject: subject as any,
      participants: allParticipants,
      participantNames,
      participantAvatars,
      status: 'pending',
      questionIds: [],
      scores: Object.fromEntries(allParticipants.map(uid => [uid, 0])),
      answers: Object.fromEntries(allParticipants.map(uid => [uid, []])),
      finishedParticipants: [],
    };
    const ref = await addDoc(collection(this.firestore, 'challenges'), challenge);
    return ref.id;
  }

  watchChallenge(challengeId: string, cb: (c: Challenge) => void): () => void {
    return onSnapshot(doc(this.firestore, `challenges/${challengeId}`), snap => {
      if (snap.exists()) cb({ id: snap.id, ...snap.data() } as Challenge);
    });
  }

  getPendingChallenges(uid: string): Promise<Challenge[]> {
    const ref = collection(this.firestore, 'challenges');
    const q = query(ref, where('participants', 'array-contains', uid), where('status', '==', 'pending'));
    return getDocs(q).then(snap => snap.docs.map(d => ({ id: d.id, ...d.data() } as Challenge)));
  }

  async acceptChallenge(challengeId: string, uid: string, questionIds: string[]): Promise<void> {
    const ref = doc(this.firestore, `challenges/${challengeId}`);
    await updateDoc(ref, {
      status: 'active',
      questionIds: questionIds,
    });
  }

  async submitAnswers(challengeId: string, uid: string, answers: number[], score: number): Promise<void> {
    const ref = doc(this.firestore, `challenges/${challengeId}`);
    await updateDoc(ref, {
      [`answers.${uid}`]: answers,
      [`scores.${uid}`]: score,
      finishedParticipants: arrayUnion(uid),
    });
    // Comprobar si todos terminaron
    const snap = await getDoc(ref);
    const challenge = { id: snap.id, ...snap.data() } as Challenge;
    const allDone = challenge.participants.every(p => challenge.finishedParticipants.includes(p));
    if (allDone) {
      await this.finalizeChallenge(challengeId, challenge);
    }
  }

  private async finalizeChallenge(challengeId: string, challenge: Challenge): Promise<void> {
    const ref = doc(this.firestore, `challenges/${challengeId}`);
    const scores = challenge.scores;
    const sorted = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const winner = sorted[0][0];
    const loser = sorted[sorted.length - 1][0];
    const scoreDiff = sorted[0][1] - sorted[sorted.length - 1][1];
    const xpSteal = Math.max(5, Math.min(50, scoreDiff * 2));
    const xpTransfers = [{ from: loser, to: winner, amount: xpSteal }];

    // Actualizar XP en los documentos de usuario
    const winnerRef = doc(this.firestore, `users/${winner}`);
    const loserRef = doc(this.firestore, `users/${loser}`);
    const [winnerSnap, loserSnap] = await Promise.all([getDoc(winnerRef), getDoc(loserRef)]);
    const winnerData = winnerSnap.data() as any;
    const loserData = loserSnap.data() as any;
    await Promise.all([
      updateDoc(winnerRef, { xp: (winnerData.xp || 0) + xpSteal, duelsWon: (winnerData.duelsWon || 0) + 1 }),
      updateDoc(loserRef, { xp: Math.max(0, (loserData.xp || 0) - xpSteal), duelsLost: (loserData.duelsLost || 0) + 1 }),
    ]);

    await updateDoc(ref, {
      status: 'finished',
      finishedAt: Timestamp.now(),
      xpTransfers,
    });
  }
}
