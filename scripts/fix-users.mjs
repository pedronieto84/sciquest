import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('/data/.openclaw/workspace/.firebase-sa-sciquest.json', 'utf8'));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

const avatars = ['🦊','🐯','🦁','🐸','🦋','🐙','🦄','🐲','🦅','🐬','🧪','⚛️','🌟','🚀','🔬'];
const randomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

const snap = await db.collection('users').get();
const usedUsernames = new Set();
let fixed = 0;

for (const docSnap of snap.docs) {
  const data = docSnap.data();
  const updates = {};

  // Fix avatar
  if (!data.avatar || data.avatar.startsWith('http')) {
    updates.photoUrl = data.avatar || '';
    updates.avatar = randomAvatar();
  }

  // Fix username
  if (!data.username) {
    let base = (data.displayName || 'usuario').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')
      .substring(0, 18) || 'usuario';

    let username = base;
    let i = 1;
    while (usedUsernames.has(username)) {
      username = `${base}_${i++}`;
    }
    usedUsernames.add(username);
    updates.username = username;
  } else {
    usedUsernames.add(data.username);
  }

  if (Object.keys(updates).length > 0) {
    await docSnap.ref.update(updates);
    console.log(`✅ Fixed ${docSnap.id}: ${JSON.stringify(updates)}`);
    fixed++;
  }
}
console.log(`\n🎉 Fixed ${fixed} users`);
