import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('/data/.openclaw/workspace/.firebase-sa-sciquest.json', 'utf8'));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

const codes = [
  { code: 'BIENVENIDO', xp: 100, description: 'Código de bienvenida', maxUses: 999, usedBy: [], active: true },
  { code: 'CIENCIA2026', xp: 150, description: 'Lanzamiento 2026', maxUses: 500, usedBy: [], active: true },
  { code: 'QUIMICA100', xp: 100, description: 'Bonus Química', maxUses: 200, usedBy: [], active: true },
  { code: 'ESPACIO50', xp: 50, description: 'Bonus Astronomía', maxUses: 200, usedBy: [], active: true },
  { code: 'SUPERCIENTIFICO', xp: 250, description: 'Código VIP', maxUses: 50, usedBy: [], active: true },
];

// Borrar existentes
const existing = await db.collection('promoCodes').get();
await Promise.all(existing.docs.map(d => d.ref.delete()));

for (const c of codes) {
  await db.collection('promoCodes').doc(c.code).set(c);
  console.log(`✅ Código: ${c.code} (+${c.xp} XP)`);
}
console.log('🎉 Promo codes seeded!');
