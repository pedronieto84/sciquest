export interface SciUser {
  uid: string;
  username: string;       // nombre único elegido por el usuario (ej: "pedro42")
  displayName: string;    // nombre completo (de Google o registro manual)
  email: string;
  avatar: string;         // siempre un EMOJI (🦊, 🐯, etc.) NUNCA una URL
  photoUrl?: string;      // OPCIONAL: URL foto de Google
  level: number;
  xp: number;
  coins: number;
  badges: string[];
  stats: {
    chemistry: number;
    quantum: number;
    nuclear: number;
    newtonian: number;
    biology: number;
    astronomy: number;
  };
  duelsWon?: number;
  duelsLost?: number;
  createdAt: Date;
}

export const LEVEL_XP_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000];

export function getLevelFromXp(xp: number): number {
  for (let i = LEVEL_XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}
