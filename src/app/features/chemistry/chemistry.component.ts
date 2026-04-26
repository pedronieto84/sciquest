import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ELEMENTS, CATEGORY_COLORS, Element, PT_POSITIONS } from './periodic-table.data';
import { TheoryService } from '../../core/services/theory.service';
import { TheoryCard } from '../../core/models/theory.model';
import { TheorySliderComponent } from '../../shared/theory-slider/theory-slider.component';

type GameMode = 'explore' | 'guess-element' | 'guess-symbol' | 'theory' | 'table';

@Component({
  selector: 'app-chemistry',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TheorySliderComponent],
  templateUrl: './chemistry.component.html',
  styles: [`
    .pt-cell:hover { transform: scale(1.18) !important; z-index: 10; box-shadow: 0 0 8px rgba(255,255,255,0.2); }
    .pt-empty { background: transparent; }
  `],
})
export class ChemistryComponent implements OnInit, OnDestroy {
  private theoryService = inject(TheoryService);
  private theorySub?: Subscription;

  elements = ELEMENTS;
  categoryColors = CATEGORY_COLORS;
  ptPositions = PT_POSITIONS;

  /** Build the main 7-row grid (rows 1-7) plus placeholder cells for lanthanides/actinides */
  mainGridCells = computed(() => {
    const cells: (Element | { placeholder: string } | null)[][] = [];
    for (let row = 1; row <= 7; row++) {
      const rowCells: (Element | { placeholder: string } | null)[] = [];
      for (let col = 1; col <= 18; col++) {
        // Placeholder for lanthanides/actinides at position 6,3 and 7,3
        if (row === 6 && col === 3) { rowCells.push({ placeholder: '57-71' }); continue; }
        if (row === 7 && col === 3) { rowCells.push({ placeholder: '89-103' }); continue; }
        const el = this.elements.find(e => {
          const pos = this.ptPositions[e.atomicNumber];
          return pos && pos[0] === row && pos[1] === col;
        });
        rowCells.push(el || null);
      }
      cells.push(rowCells);
    }
    return cells;
  });

  /** Lanthanides row (row 9 in PT_POSITIONS) */
  lanthanides = computed(() =>
    this.elements.filter(e => e.category === 'lanthanide').sort((a, b) => a.atomicNumber - b.atomicNumber)
  );

  /** Actinides row (row 10 in PT_POSITIONS) */
  actinides = computed(() =>
    this.elements.filter(e => e.category === 'actinide').sort((a, b) => a.atomicNumber - b.atomicNumber)
  );

  gameMode = signal<GameMode>('explore');
  theoryCards = signal<TheoryCard[]>([]);
  selected = signal<Element | null>(null);
  selectedCategory = signal<string | null>(null);
  searchTerm = signal('');

  readonly categoryInfo: Record<string, { emoji: string; title: string; desc: string; props: string[]; examples: string; funFact: string }> = {
    'alkali-metal': {
      emoji: '⚡', title: 'Metales Alcalinos',
      desc: 'Son los metales más reactivos de la tabla periódica. Tienen un solo electrón en su capa exterior, que ceden fácilmente. Reaccionan violentamente con el agua, liberando hidrógeno y calor.',
      props: ['1 electrón en la capa exterior', 'Muy blandos (se cortan con cuchillo)', 'Densidad muy baja (Li, Na y K flotan en agua)', 'Reaccionan explosivamente con el agua', 'Siempre se guardan en aceite para evitar reacciones'],
      examples: 'Litio (Li), Sodio (Na), Potasio (K), Rubidio (Rb), Cesio (Cs), Francio (Fr)',
      funFact: 'El cesio reacciona tan violentamente con el agua que puede provocar una explosión. El francio es tan radiactivo que en toda la corteza terrestre solo hay unos 30 gramos en cualquier momento.'
    },
    'alkaline-earth': {
      emoji: '🪨', title: 'Metales Alcalinotérreos',
      desc: 'Metales con 2 electrones en su capa exterior. Menos reactivos que los alcalinos pero igualmente muy activos. Forman compuestos esenciales para la vida y la construcción.',
      props: ['2 electrones en la capa exterior', 'Más duros y densos que los alcalinos', 'Reactivos pero menos que el grupo 1', 'Forman óxidos e hidróxidos básicos', 'El calcio y el magnesio son esenciales para la vida'],
      examples: 'Berilio (Be), Magnesio (Mg), Calcio (Ca), Estroncio (Sr), Bario (Ba), Radio (Ra)',
      funFact: 'El calcio es el mineral más abundante en el cuerpo humano: 99% está en huesos y dientes. El magnesio es esencial para la fotosíntesis — está en el centro de cada molécula de clorofila.'
    },
    'transition': {
      emoji: '🔩', title: 'Metales de Transición',
      desc: 'El grupo más numeroso. Son metales resistentes, buenos conductores y forman compuestos de colores brillantes. Incluyen los metales más usados industrialmente.',
      props: ['Pueden tener múltiples estados de oxidación', 'Buenos conductores de calor y electricidad', 'Forman compuestos coloreados', 'Usados como catalizadores industriales', 'Muchos son magnéticos (Fe, Co, Ni)'],
      examples: 'Hierro (Fe), Cobre (Cu), Oro (Au), Plata (Ag), Platino (Pt), Titanio (Ti)',
      funFact: 'El oro es tan maleable que 1 gramo puede extenderse en una lámina de 1 m². Todo el oro extraído en la historia de la humanidad cabría en un cubo de unos 21 metros de lado.'
    },
    'nonmetal': {
      emoji: '💨', title: 'No Metales',
      desc: 'Elementos esenciales para la vida. Son malos conductores de electricidad y calor, y tienen propiedades muy variadas. El carbono es único por su capacidad de formar millones de compuestos.',
      props: ['Malos conductores eléctricos', 'Pueden ser sólidos, líquidos o gases a temperatura ambiente', 'El carbono forma millones de compuestos orgánicos', 'El oxígeno es esencial para la respiración', 'El nitrógeno forma el 78% del aire'],
      examples: 'Carbono (C), Nitrógeno (N), Oxígeno (O), Fósforo (P), Azufre (S), Selenio (Se)',
      funFact: 'El carbono existe en formas radicalmente distintas: el grafito (mina del lápiz), el diamante (el mineral más duro) y el grafeno (100 veces más resistente que el acero) son todos carbono puro.'
    },
    'halogen': {
      emoji: '🧴', title: 'Halógenos',
      desc: 'Los no metales más reactivos. A punto de completar su capa exterior (les falta 1 electrón), son muy oxidantes. "Halógeno" significa "formador de sal" en griego.',
      props: ['7 electrones en la capa exterior (les falta 1)', 'Los no metales más reactivos', 'Forman sales al reaccionar con metales', 'Tóxicos en estado libre', 'Estados variados: F₂ y Cl₂ son gases, Br₂ líquido, I₂ sólido'],
      examples: 'Flúor (F), Cloro (Cl), Bromo (Br), Yodo (I), Astato (At), Téneso (Ts)',
      funFact: 'El flúor es el elemento más electronegativo y reactivo de todos. Reacciona con prácticamente todo, incluso con gases nobles como el xenón. El yodo se usa como antiséptico porque destruye las membranas de los microorganismos.'
    },
    'noble-gas': {
      emoji: '✨', title: 'Gases Nobles',
      desc: 'La familia más estable de la tabla periódica. Tienen la capa exterior completa, por lo que casi no reaccionan con nada. Por eso se llamaron "gases inertes" durante mucho tiempo.',
      props: ['Capa exterior completa (8 electrones, excepto He con 2)', 'Casi no forman compuestos', 'Todos son gases a temperatura ambiente', 'Muy bajos puntos de ebullición', 'Usados en iluminación y aplicaciones especiales'],
      examples: 'Helio (He), Neón (Ne), Argón (Ar), Kriptón (Kr), Xenón (Xe), Radón (Rn)',
      funFact: 'El helio fue descubierto primero en el Sol (1868) por análisis espectral, y solo 27 años después en la Tierra (1895). Su nombre viene de "Helios" (dios griego del Sol).'
    },
    'metalloid': {
      emoji: '💻', title: 'Metaloides',
      desc: 'Tienen propiedades intermedias entre metales y no metales. Son semiconductores, lo que los hace fundamentales para la electrónica moderna. Sin ellos no existirían los ordenadores.',
      props: ['Conductividad eléctrica intermedia (semiconductores)', 'Propiedades variables según temperatura', 'Usados en chips y transistores', 'El silicio es el más importante industrialmente', 'Pueden tener apariencia metálica pero son frágiles'],
      examples: 'Boro (B), Silicio (Si), Germanio (Ge), Arsénico (As), Antimonio (Sb), Telurio (Te)',
      funFact: 'El silicio es el segundo elemento más abundante en la corteza terrestre (28%). Un chip moderno de silicio puede contener más de 100.000 millones de transistores en un área del tamaño de una uña.'
    },
    'actinide': {
      emoji: '☢️', title: 'Actínidos',
      desc: 'Todos son radiactivos. Incluyen los elementos más pesados de origen natural y los elementos sintéticos más masivos. Algunos tienen aplicaciones nucleares críticas.',
      props: ['Todos radiactivos', 'Los más pesados son sintéticos (creados en laboratorio)', 'Muchos tienen vidas medias muy largas', 'Uranio y torio son los más abundantes en la naturaleza', 'Plutonio es el combustible de reactores y armas nucleares'],
      examples: 'Uranio (U), Plutonio (Pu), Torio (Th), Curio (Cm), Californio (Cf)',
      funFact: 'El plutonio-239 tiene una vida media de 24.100 años. El americio-241 de tu detector de humo emite partículas alfa para detectar el humo — hay literalmente material radiactivo en la mayoría de los detectores de incendios domésticos.'
    },
    'lanthanide': {
      emoji: '🌈', title: 'Lantánidos',
      desc: 'También llamados "tierras raras" (aunque no son tan raros). Son metales con propiedades magnéticas y ópticas únicas, imprescindibles en tecnología moderna.',
      props: ['Metales brillantes y relativamente blandos', 'Propiedades magnéticas excepcionales', 'Usados en imanes permanentes muy potentes', 'Esenciales para pantallas, láseres y motores eléctricos', 'China produce el 60% de las reservas mundiales'],
      examples: 'Cerio (Ce), Neodimio (Nd), Europio (Eu), Erbio (Er), Iterbio (Yb)',
      funFact: 'El neodimio se usa en los imanes más potentes del mundo (imanes NdFeB). Un imán de neodimio del tamaño de una moneda puede levantar objetos 1.000 veces su peso. Sin lantánidos no existirían los motores de coches eléctricos ni los discos duros.'
    },
    'post-transition': {
      emoji: '🔋', title: 'Metales Post-Transición',
      desc: 'Metales "blandos" situados entre los metales de transición y los metaloides. Tienen puntos de fusión más bajos y son más frágiles que los metales de transición.',
      props: ['Puntos de fusión más bajos que los metales de transición', 'Más blandos y maleables', 'Buenos conductores pero menos que cobre o aluminio', 'El aluminio es el metal más abundante en la corteza terrestre', 'El estaño y el plomo tienen usos históricos milenarios'],
      examples: 'Aluminio (Al), Galio (Ga), Indio (In), Estaño (Sn), Talio (Tl), Plomo (Pb), Bismuto (Bi)',
      funFact: 'El galio se derrite en la palma de tu mano (punto de fusión: 29.8°C). El bismuto forma cristales con colores tornasolados espectaculares por su capa de óxido. El aluminio fue más valioso que el oro en el siglo XIX.'
    },
  };

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

  ngOnInit() {
    this.theorySub = this.theoryService.getCards('chemistry').subscribe(cards => this.theoryCards.set(cards));
  }

  ngOnDestroy() { this.theorySub?.unsubscribe(); }

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
