export interface TheoryCard {
  id?: string;
  subject: 'chemistry' | 'quantum' | 'nuclear' | 'newtonian';
  order: number;
  title: string;
  emoji: string;
  gradient: string;
  tagline: string;
  body: string;
  keyPoints: string[];
  visual?: string;
  formula?: string;
  formulaDesc?: string;
  funFact: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
