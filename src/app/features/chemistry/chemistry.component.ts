import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ELEMENTS, CATEGORY_COLORS, Element } from './periodic-table.data';

type GameMode = 'explore' | 'guess-element' | 'guess-symbol' | 'memory';

@Component({
  selector: 'app-chemistry',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chemistry.component.html',
})
export class ChemistryComponent {
  elements = ELEMENTS;
  categoryColors = CATEGORY_COLORS;

  gameMode = signal<GameMode>('explore');
  selected = signal<Element | null>(null);
  searchTerm = signal('');

  // Guess game state
  guessTarget = signal<Element | null>(null);
  guessOptions = signal<Element[]>([]);
  guessResult = signal<'correct' | 'wrong' | null>(null);
  guessScore = signal(0);
  guessTotal = signal(0);

  filtered = computed(() => {
    const s = this.searchTerm().toLowerCase();
    if (!s) return this.elements;
    return this.elements.filter(e =>
      e.name.toLowerCase().includes(s) ||
      e.symbol.toLowerCase().includes(s) ||
      e.atomicNumber.toString().includes(s)
    );
  });

  readonly categories = [
    { key: 'alkali-metal',   label: 'Metales Alcalinos' },
    { key: 'alkaline-earth', label: 'Alcalinotérreos' },
    { key: 'transition',     label: 'Metales de Transición' },
    { key: 'nonmetal',       label: 'No Metales' },
    { key: 'halogen',        label: 'Halógenos' },
    { key: 'noble-gas',      label: 'Gases Nobles' },
    { key: 'metalloid',      label: 'Metaloides' },
    { key: 'actinide',       label: 'Actínidos' },
  ];

  selectElement(el: Element) {
    this.selected.set(el);
  }
  closeDetail() { this.selected.set(null); }

  startGuessGame(mode: 'guess-element' | 'guess-symbol') {
    this.gameMode.set(mode);
    this.guessScore.set(0);
    this.guessTotal.set(0);
    this.nextQuestion();
  }

  nextQuestion() {
    const all = [...this.elements];
    const target = all[Math.floor(Math.random() * all.length)];
    const wrongs = all.filter(e => e.symbol !== target.symbol)
                      .sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...wrongs, target].sort(() => Math.random() - 0.5);
    this.guessTarget.set(target);
    this.guessOptions.set(options);
    this.guessResult.set(null);
  }

  checkGuess(option: Element) {
    if (this.guessResult()) return;
    const correct = option.symbol === this.guessTarget()?.symbol;
    this.guessResult.set(correct ? 'correct' : 'wrong');
    this.guessTotal.update(t => t + 1);
    if (correct) this.guessScore.update(s => s + 1);
    setTimeout(() => this.nextQuestion(), 1500);
  }

  backToExplore() {
    this.gameMode.set('explore');
    this.guessResult.set(null);
  }
}
