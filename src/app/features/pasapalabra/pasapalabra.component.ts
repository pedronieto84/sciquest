import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PASAPALABRA_CLUES, PasapalabraClue } from './pasapalabra.data';

type LetterState = 'pending' | 'correct' | 'wrong' | 'passed';
type GameState = 'idle' | 'playing' | 'finished';

interface LetterStatus {
  letter: string;
  state: LetterState;
  clue: PasapalabraClue;
}

@Component({
  selector: 'app-pasapalabra',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pasapalabra.component.html',
})
export class PasapalabraComponent implements OnDestroy {
  Math = Math;
  gameState = signal<GameState>('idle');
  letters = signal<LetterStatus[]>([]);
  currentLetterIndex = signal(0);
  userInput = signal('');
  timeLeft = signal(180); // 3 minutos
  showResult = signal<'correct' | 'wrong' | null>(null);
  rounds = signal(0);
  private timer: any;

  get currentLetter(): LetterStatus | null {
    return this.letters()[this.currentLetterIndex()] ?? null;
  }

  get correct(): number {
    return this.letters().filter(l => l.state === 'correct').length;
  }
  get wrong(): number {
    return this.letters().filter(l => l.state === 'wrong').length;
  }
  get pending(): number {
    return this.letters().filter(l => l.state === 'pending' || l.state === 'passed').length;
  }
  get isComplete(): boolean {
    return this.letters().every(l => l.state === 'correct' || l.state === 'wrong');
  }

  get timeMinutes(): string {
    return Math.floor(this.timeLeft() / 60).toString().padStart(2, '0');
  }
  get timeSeconds(): string {
    return (this.timeLeft() % 60).toString().padStart(2, '0');
  }

  get wrongLetters(): LetterStatus[] {
    return this.letters().filter(l => l.state === 'wrong');
  }

  startGame() {
    const statuses: LetterStatus[] = PASAPALABRA_CLUES.map(clue => ({
      letter: clue.letter,
      state: 'pending' as LetterState,
      clue,
    }));
    this.letters.set(statuses);
    this.currentLetterIndex.set(0);
    this.timeLeft.set(180);
    this.rounds.set(0);
    this.gameState.set('playing');
    this.userInput.set('');
    this.showResult.set(null);
    this.startTimer();
    // Auto-skip Ñ if it's the first letter
    if (this.currentLetter?.letter === 'Ñ') this.skipNy();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const t = this.timeLeft() - 1;
      if (t <= 0) {
        this.timeLeft.set(0);
        this.endGame();
      } else {
        this.timeLeft.set(t);
      }
    }, 1000);
  }

  submit() {
    const input = this.userInput().trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const answer = this.currentLetter?.clue.answer.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!input) return;

    const isCorrect = input === answer;
    this.showResult.set(isCorrect ? 'correct' : 'wrong');

    const letters = [...this.letters()];
    letters[this.currentLetterIndex()] = {
      ...letters[this.currentLetterIndex()],
      state: isCorrect ? 'correct' : 'wrong',
    };
    this.letters.set(letters);
    this.userInput.set('');

    setTimeout(() => {
      this.showResult.set(null);
      if (this.isComplete) {
        this.endGame();
      } else {
        this.advance();
      }
    }, 800);
  }

  pasapalabra() {
    const letters = [...this.letters()];
    if (letters[this.currentLetterIndex()].state === 'pending') {
      letters[this.currentLetterIndex()] = {
        ...letters[this.currentLetterIndex()],
        state: 'passed',
      };
      this.letters.set(letters);
    }
    this.userInput.set('');
    this.advance();
  }

  private advance() {
    let next = (this.currentLetterIndex() + 1) % this.letters().length;
    if (next === 0) this.rounds.update(r => r + 1);
    const start = next;
    while (this.letters()[next].state === 'correct' || this.letters()[next].state === 'wrong') {
      next = (next + 1) % this.letters().length;
      if (next === start) { this.endGame(); return; }
    }
    this.currentLetterIndex.set(next);
    if (this.currentLetter?.letter === 'Ñ') this.skipNy();
  }

  private skipNy() {
    const letters = [...this.letters()];
    const nyIdx = letters.findIndex(l => l.letter === 'Ñ');
    if (nyIdx >= 0) {
      letters[nyIdx] = { ...letters[nyIdx], state: 'correct' };
      this.letters.set(letters);
      // After marking Ñ as correct, advance to next
      this.advance();
    }
  }

  endGame() {
    clearInterval(this.timer);
    this.gameState.set('finished');
  }

  ngOnDestroy() { clearInterval(this.timer); }

  getLetterStyle(index: number, total: number): { [key: string]: string } {
    const angle = (index / total) * 360 - 90;
    const radius = 130;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return {
      transform: `translate(${x}px, ${y}px)`,
      position: 'absolute',
    };
  }
}
