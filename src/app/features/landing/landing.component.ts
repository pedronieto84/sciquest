import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  readonly features = [
    { emoji: '🧪', title: 'Química', desc: 'Tabla periódica, enlaces, reacciones... ¡aprende jugando!', color: 'from-emerald-500 to-teal-400' },
    { emoji: '⚛️', title: 'Física Cuántica', desc: 'Superposición, entrelazamiento, el universo más extraño.', color: 'from-indigo-500 to-purple-400' },
    { emoji: '☢️', title: 'Física Nuclear', desc: 'Fisión, fusión, radiactividad — la energía del futuro.', color: 'from-amber-500 to-orange-400' },
    { emoji: '🍎', title: 'Mecánica', desc: 'Las leyes de Newton que mueven el mundo.', color: 'from-blue-500 to-cyan-400' },
  ];

  readonly stats = [
    { value: '118', label: 'Elementos de la tabla periódica' },
    { value: '+200', label: 'Preguntas de práctica' },
    { value: '4', label: 'Materias de ciencia' },
    { value: '∞', label: 'Curiosidad científica' },
  ];

  scrollToHowItWorks(): void {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  }
}
