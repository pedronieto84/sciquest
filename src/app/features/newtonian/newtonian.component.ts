import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheoryService } from '../../core/services/theory.service';
import { TheoryCard } from '../../core/models/theory.model';
import { TheorySliderComponent } from '../../shared/theory-slider/theory-slider.component';

@Component({
  selector: 'app-newtonian',
  standalone: true,
  imports: [CommonModule, RouterModule, TheorySliderComponent],
  templateUrl: './newtonian.component.html',
})
export class NewtonianComponent implements OnInit, OnDestroy {
  private theoryService = inject(TheoryService);
  private theorySub?: Subscription;

  activeTab = signal<'theory' | 'laws' | 'simulator' | 'formulas'>('laws');
  theoryCards = signal<TheoryCard[]>([]);

  // Simple free-fall simulator
  mass = signal(10);      // kg
  height = signal(50);    // m
  simRunning = signal(false);
  simTime = signal(0);
  simY = signal(0);
  private simInterval: any;

  readonly g = 9.8;

  laws = [
    {
      number: 'I',
      title: 'Ley de la Inercia',
      emoji: '🛸',
      desc: 'Un objeto en reposo permanece en reposo, y uno en movimiento permanece en movimiento a velocidad constante, a menos que actúe una fuerza sobre él.',
      example: 'Por eso los pasajeros se inclinan hacia adelante cuando el coche frena.',
      color: 'from-blue-600/20 to-blue-500/10',
      border: 'border-blue-500/40',
    },
    {
      number: 'II',
      title: 'F = m × a',
      emoji: '💪',
      desc: 'La aceleración de un objeto es directamente proporcional a la fuerza neta aplicada e inversamente proporcional a su masa.',
      example: 'Un camión necesita más fuerza que una bici para acelerar igual.',
      color: 'from-indigo-600/20 to-indigo-500/10',
      border: 'border-indigo-500/40',
    },
    {
      number: 'III',
      title: 'Acción y Reacción',
      emoji: '🔄',
      desc: 'Para cada acción hay una reacción igual y en dirección opuesta.',
      example: 'Los cohetes funcionan empujando gas hacia abajo, lo que los propulsa hacia arriba.',
      color: 'from-violet-600/20 to-violet-500/10',
      border: 'border-violet-500/40',
    },
  ];

  formulas = [
    { name: 'Fuerza', formula: 'F = m × a', unit: 'Newton (N)', desc: 'masa × aceleración' },
    { name: 'Gravedad', formula: 'F = m × g', unit: 'Newton (N)', desc: 'g = 9.8 m/s²' },
    { name: 'Velocidad', formula: 'v = d / t', unit: 'm/s', desc: 'distancia / tiempo' },
    { name: 'Energía Cinética', formula: 'Ec = ½ × m × v²', unit: 'Joule (J)', desc: 'energía del movimiento' },
    { name: 'Energía Potencial', formula: 'Ep = m × g × h', unit: 'Joule (J)', desc: 'energía de posición' },
    { name: 'Momento (p)', formula: 'p = m × v', unit: 'kg·m/s', desc: 'masa × velocidad' },
    { name: 'Trabajo', formula: 'W = F × d', unit: 'Joule (J)', desc: 'fuerza × desplazamiento' },
    { name: 'Potencia', formula: 'P = W / t', unit: 'Watt (W)', desc: 'trabajo / tiempo' },
  ];

  get fallTime(): number {
    return Math.sqrt((2 * this.height()) / this.g);
  }
  get impactSpeed(): number {
    return this.g * this.fallTime;
  }
  get impactEnergy(): number {
    return 0.5 * this.mass() * this.impactSpeed ** 2;
  }
  get simProgress(): number {
    return Math.min(100, (this.simY() / this.height()) * 100);
  }

  ngOnInit() {
    this.theorySub = this.theoryService.getCards('newtonian').subscribe(cards => this.theoryCards.set(cards));
  }

  ngOnDestroy() {
    clearInterval(this.simInterval);
    this.theorySub?.unsubscribe();
  }

  startSim() {
    this.simRunning.set(true);
    this.simTime.set(0);
    this.simY.set(0);
    const dt = 0.05;
    this.simInterval = setInterval(() => {
      const t = this.simTime() + dt;
      const y = 0.5 * this.g * t * t;
      if (y >= this.height()) {
        this.simY.set(this.height());
        this.simRunning.set(false);
        clearInterval(this.simInterval);
      } else {
        this.simY.set(y);
        this.simTime.set(t);
      }
    }, 50);
  }

  resetSim() {
    clearInterval(this.simInterval);
    this.simRunning.set(false);
    this.simTime.set(0);
    this.simY.set(0);
  }
}
