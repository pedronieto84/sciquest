import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheoryService } from '../../core/services/theory.service';
import { TheoryCard } from '../../core/models/theory.model';
import { TheorySliderComponent } from '../../shared/theory-slider/theory-slider.component';

@Component({
  selector: 'app-astronomy',
  standalone: true,
  imports: [CommonModule, RouterModule, TheorySliderComponent],
  templateUrl: './astronomy.component.html',
})
export class AstronomyComponent implements OnInit, OnDestroy {
  private theoryService = inject(TheoryService);
  private theorySub?: Subscription;

  activeView = signal<'theory' | 'quiz'>('theory');
  theoryCards = signal<TheoryCard[]>([]);

  ngOnInit() {
    this.theorySub = this.theoryService.getCards('astronomy').subscribe(cards => this.theoryCards.set(cards));
  }

  ngOnDestroy() { this.theorySub?.unsubscribe(); }
}
