import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheoryCard } from '../../core/models/theory.model';

@Component({
  selector: 'app-theory-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theory-slider.component.html',
})
export class TheorySliderComponent {
  @Input() cards: TheoryCard[] = [];

  current = signal(0);
  private startX = 0;

  get card(): TheoryCard | null { return this.cards[this.current()] ?? null; }
  get total(): number { return this.cards.length; }

  onTouchStart(e: TouchEvent) { this.startX = e.touches[0].clientX; }
  onTouchEnd(e: TouchEvent) {
    const diff = this.startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
  }
  next() { if (this.current() < this.total - 1) this.current.update(c => c + 1); }
  prev() { if (this.current() > 0) this.current.update(c => c - 1); }
  goTo(i: number) { this.current.set(i); }
}
