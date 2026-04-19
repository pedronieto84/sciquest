import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nuclear',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nuclear.component.html',
})
export class NuclearComponent {
  activeTab = signal<'concepts' | 'reactions' | 'isotopes'>('concepts');

  concepts = [
    { emoji: '🔴', title: 'Protón', desc: 'Partícula con carga positiva (+) en el núcleo. El número de protones define qué elemento es.', color: 'from-red-600/20 to-red-500/10', border: 'border-red-500/30' },
    { emoji: '⚫', title: 'Neutrón', desc: 'Partícula sin carga en el núcleo. Mismo elemento, distintos neutrones = isótopos.', color: 'from-slate-600/20 to-slate-500/10', border: 'border-slate-500/30' },
    { emoji: '🔵', title: 'Electrón', desc: 'Partícula con carga negativa (-) que orbita el núcleo. Masa ~1800 veces menor que el protón.', color: 'from-blue-600/20 to-blue-500/10', border: 'border-blue-500/30' },
    { emoji: '☢️', title: 'Radiactividad', desc: 'Cuando un núcleo inestable se desintegra emitiendo partículas o energía.', color: 'from-yellow-600/20 to-yellow-500/10', border: 'border-yellow-500/30' },
    { emoji: '⚡', title: 'Fisión Nuclear', desc: 'Un núcleo grande se rompe en dos más pequeños liberando enorme energía. Base de las bombas atómicas.', color: 'from-orange-600/20 to-orange-500/10', border: 'border-orange-500/30' },
    { emoji: '🌟', title: 'Fusión Nuclear', desc: 'Dos núcleos se unen para formar uno mayor liberando aún más energía. El proceso que alimenta las estrellas.', color: 'from-amber-600/20 to-amber-500/10', border: 'border-amber-500/30' },
  ];

  reactions = [
    { title: 'Desintegración Alfa (α)', emoji: '🔴', desc: 'El núcleo expulsa 2 protones + 2 neutrones (= núcleo de Helio). Ejemplo: Uranio-238 → Torio-234 + He.', power: 'Baja penetración — para con papel', danger: 1 },
    { title: 'Desintegración Beta (β)', emoji: '⚡', desc: 'Un neutrón se convierte en protón emitiendo un electrón. Cambia el número atómico.', power: 'Media penetración — para con aluminio', danger: 2 },
    { title: 'Radiación Gamma (γ)', emoji: '🌊', desc: 'Onda electromagnética de altísima energía. No cambia el núcleo, solo libera energía.', power: 'Alta penetración — necesita plomo/hormigón', danger: 3 },
    { title: 'Fisión (central nuclear)', emoji: '💥', desc: 'Uranio-235 absorbe un neutrón → se parte en Bario + Kriptón + 3 neutrones → reacción en cadena.', power: '1kg de U-235 ≈ 3 millones kg de carbón', danger: 3 },
  ];

  isotopes = [
    { element: 'Carbono', symbol: 'C', iso: 'C-14', use: '⏱️ Datación de fósiles — mide la edad de objetos orgánicos hasta 50.000 años.' },
    { element: 'Yodo', symbol: 'I', iso: 'I-131', use: '🏥 Medicina nuclear — trata el cáncer de tiroides.' },
    { element: 'Uranio', symbol: 'U', iso: 'U-235', use: '⚛️ Combustible nuclear — fisión en reactores y bombas atómicas.' },
    { element: 'Plutonio', symbol: 'Pu', iso: 'Pu-238', use: '🛸 Fuente de energía para sondas espaciales (Voyager, New Horizons).' },
    { element: 'Hidrógeno', symbol: 'H', iso: 'H-3 (Tritio)', use: '💡 Fusión nuclear — combustible de las futuras centrales de fusión.' },
  ];
}
