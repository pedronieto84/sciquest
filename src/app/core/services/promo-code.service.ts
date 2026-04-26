import { Injectable, inject } from '@angular/core';
import {
  Firestore, doc, getDoc, updateDoc, arrayUnion
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

export interface PromoCodeResult {
  success: boolean;
  xp?: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class PromoCodeService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async redeemCode(code: string): Promise<PromoCodeResult> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return { success: false, message: 'Debes iniciar sesión primero' };

    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Introduce un código válido' };

    const codeRef = doc(this.firestore, `promoCodes/${cleanCode}`);
    const codeSnap = await getDoc(codeRef);

    if (!codeSnap.exists()) {
      return { success: false, message: '❌ Código no válido' };
    }

    const data = codeSnap.data();

    if (!data['active']) {
      return { success: false, message: '❌ Este código ha expirado' };
    }

    if ((data['usedBy'] as string[]).includes(uid)) {
      return { success: false, message: '⚠️ Ya usaste este código' };
    }

    if ((data['usedBy'] as string[]).length >= data['maxUses']) {
      return { success: false, message: '❌ Este código ya no tiene usos disponibles' };
    }

    // Marcar como usado por este usuario
    await updateDoc(codeRef, { usedBy: arrayUnion(uid) });

    // Añadir XP al usuario
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const currentXp = userSnap.data()['xp'] || 0;
      await updateDoc(userRef, { xp: currentXp + data['xp'] });
    }

    return { success: true, xp: data['xp'], message: `✅ +${data['xp']} XP ganados` };
  }
}
