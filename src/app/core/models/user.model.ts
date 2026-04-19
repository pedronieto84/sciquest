export interface SciUser {
  uid: string;
  displayName: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  badges: string[];
  stats: {
    chemistry: number;
    quantum: number;
    nuclear: number;
    newtonian: number;
  };
  createdAt: Date;
}

export const LEVEL_XP_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000];

export function getLevelFromXp(xp: number): number {
  for (let i = LEVEL_XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}
