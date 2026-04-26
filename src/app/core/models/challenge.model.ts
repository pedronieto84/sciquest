export interface Challenge {
  id?: string;
  createdBy: string;
  createdAt: any;
  subject: 'chemistry' | 'quantum' | 'nuclear' | 'newtonian' | 'mixed';
  participants: string[];
  participantNames: { [uid: string]: string };
  participantAvatars: { [uid: string]: string };
  status: 'pending' | 'active' | 'finished';
  questionIds: string[];
  scores: { [uid: string]: number };
  answers: { [uid: string]: number[] };
  finishedParticipants: string[];
  xpTransfers?: { from: string; to: string; amount: number }[];
  finishedAt?: any;
}
