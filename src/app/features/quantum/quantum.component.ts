import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheoryService } from '../../core/services/theory.service';
import { TheoryCard } from '../../core/models/theory.model';
import { TheorySliderComponent } from '../../shared/theory-slider/theory-slider.component';

interface Concept {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  explanation: string;
  visual: string;
  funFact: string;
}

@Component({
  selector: 'app-quantum',
  standalone: true,
  imports: [CommonModule, RouterModule, TheorySliderComponent],
  templateUrl: './quantum.component.html',
})
export class QuantumComponent implements OnInit, OnDestroy {
  private theoryService = inject(TheoryService);
  private theorySub?: Subscription;

  activeView = signal<'concepts' | 'theory'>('concepts');
  theoryCards = signal<TheoryCard[]>([]);
  selected = signal<Concept | null>(null);

  concepts: Concept[] = [
    {
      id: 'superposition',
      title: 'Superposición',
      emoji: '🌀',
      tagline: 'Ser dos cosas a la vez',
      explanation: 'Una partícula cuántica puede estar en múltiples estados al mismo tiempo hasta que la mides. Imagina una moneda girando — no es cara ni cruz hasta que la paras.',
      visual: '🪙 → 🌀 → [cara ó cruz]',
      funFact: 'Los ordenadores cuánticos usan superposición para probar millones de respuestas simultáneamente.',
    },
    {
      id: 'entanglement',
      title: 'Entrelazamiento',
      emoji: '🔗',
      tagline: 'Dos partículas conectadas al instante',
      explanation: 'Dos partículas entrelazadas se "comunican" instantáneamente sin importar la distancia. Einstein lo llamó "acción fantasmal a distancia".',
      visual: '⚛️ ←∞→ ⚛️',
      funFact: 'Se ha demostrado entrelazamiento entre partículas separadas más de 1200 km.',
    },
    {
      id: 'tunnel',
      title: 'Efecto Túnel',
      emoji: '🚇',
      tagline: 'Atravesar paredes cuánticamente',
      explanation: 'Las partículas cuánticas tienen una pequeña probabilidad de "atravesar" barreras de energía que clásicamente serían infranqueables.',
      visual: '• → 🧱 → •  (sin romperla)',
      funFact: 'El efecto túnel es lo que hace funcionar tu memoria USB.',
    },
    {
      id: 'wave-particle',
      title: 'Dualidad Onda-Partícula',
      emoji: '〰️',
      tagline: 'Ola y pelota a la vez',
      explanation: 'La luz y los electrones se comportan como ondas o como partículas dependiendo de cómo los observes. Es una de las ideas más extrañas de la física.',
      visual: '〰️ ó ● (depende de cómo mires)',
      funFact: 'Incluso tú tienes una longitud de onda, ¡pero es tan pequeña que es imposible de medir!',
    },
    {
      id: 'heisenberg',
      title: 'Incertidumbre de Heisenberg',
      emoji: '❓',
      tagline: 'No puedes saber todo a la vez',
      explanation: 'Cuanto más exactamente conoces la posición de una partícula, menos sabes sobre su velocidad, y viceversa. No es un fallo del instrumento — es la naturaleza misma.',
      visual: '📍 ↑ ↔️ 💨 ↓',
      funFact: 'Heisenberg era tan joven cuando descubrió esto que su tutor casi no lo deja presentarlo.',
    },
    {
      id: 'quantum-computer',
      title: 'Computación Cuántica',
      emoji: '💻',
      tagline: 'El ordenador del futuro',
      explanation: 'Usa qubits en superposición para resolver ciertos problemas millones de veces más rápido que los ordenadores clásicos.',
      visual: '0 y 1 simultáneamente = qubit',
      funFact: 'En 2019, Google anunció que su ordenador cuántico resolvió en 200 segundos un problema que le tomaría 10.000 años al mejor supercomputador clásico.',
    },
  ];

  ngOnInit() {
    this.theorySub = this.theoryService.getCards('quantum').subscribe(cards => this.theoryCards.set(cards));
  }

  ngOnDestroy() { this.theorySub?.unsubscribe(); }

  select(c: Concept) { this.selected.set(c); }
  close() { this.selected.set(null); }
}
