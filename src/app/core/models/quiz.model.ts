export type Subject = 'chemistry' | 'quantum' | 'nuclear' | 'newtonian';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  subject: Subject;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  imageUrl?: string;
  xpReward: number;
}

export interface QuizSession {
  id: string;
  userId: string;
  subject: Subject;
  questions: QuizQuestion[];
  answers: number[];
  score: number;
  xpEarned: number;
  completedAt: Date;
  durationSeconds: number;
}

export interface Competition {
  id: string;
  title: string;
  subject: Subject;
  startTime: Date;
  endTime: Date;
  participants: string[];
  leaderboard: { uid: string; name: string; score: number; avatar: string }[];
  status: 'upcoming' | 'active' | 'finished';
}
