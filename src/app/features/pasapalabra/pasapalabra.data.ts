export interface PasapalabraClue {
  letter: string;   // 'A', 'B', 'C', etc.
  clue: string;     // "Empieza por X: ..."
  answer: string;   // respuesta correcta (en minúsculas para comparar)
  hint?: string;    // pista opcional
}

export const PASAPALABRA_CLUES: PasapalabraClue[] = [
  { letter: 'A', answer: 'atomo', clue: 'Empieza por A: Unidad básica de la materia, compuesta de protones, neutrones y electrones.' },
  { letter: 'B', answer: 'bario', clue: 'Empieza por B: Elemento alcalinotérreo con símbolo Ba y número atómico 56.' },
  { letter: 'C', answer: 'carbono', clue: 'Empieza por C: Elemento no metálico base de la química orgánica y de la vida.' },
  { letter: 'D', answer: 'deuterio', clue: 'Empieza por D: Isótopo del hidrógeno con un neutrón extra, usado en fusión nuclear.' },
  { letter: 'E', answer: 'electron', clue: 'Empieza por E: Partícula subatómica con carga negativa que orbita el núcleo.' },
  { letter: 'F', answer: 'fusion', clue: 'Empieza por F: Proceso nuclear en el que dos núcleos se unen liberando enorme energía, como en el Sol.' },
  { letter: 'G', answer: 'gravedad', clue: 'Empieza por G: Fuerza que atrae los objetos con masa entre sí, descrita por Newton.' },
  { letter: 'H', answer: 'hidrogeno', clue: 'Empieza por H: Elemento más ligero y abundante del universo, símbolo H, número atómico 1.' },
  { letter: 'I', answer: 'isotopo', clue: 'Empieza por I: Variante de un elemento con el mismo número de protones pero diferente número de neutrones.' },
  { letter: 'J', answer: 'julio', clue: 'Empieza por J: Unidad de energía del Sistema Internacional, equivalente a kg·m²/s².' },
  { letter: 'K', answer: 'kelvin', clue: 'Empieza por K: Unidad de temperatura del SI, donde 0 K es el cero absoluto.' },
  { letter: 'L', answer: 'laser', clue: 'Empieza por L: Dispositivo que emite luz coherente y monocromática por emisión estimulada de radiación.' },
  { letter: 'M', answer: 'masa', clue: 'Empieza por M: Cantidad de materia que contiene un cuerpo, medida en kilogramos.' },
  { letter: 'N', answer: 'neutron', clue: 'Empieza por N: Partícula subatómica sin carga eléctrica que se encuentra en el núcleo atómico.' },
  { letter: 'Ñ', answer: 'ñoquedag', clue: 'Empieza por Ñ: No existe un término científico común. Comodín libre — responde cualquier cosa.' },
  { letter: 'O', answer: 'oxigeno', clue: 'Empieza por O: Elemento gaseoso con número atómico 8, esencial para la respiración y la combustión.' },
  { letter: 'P', answer: 'proton', clue: 'Empieza por P: Partícula con carga positiva del núcleo atómico que define el número atómico del elemento.' },
  { letter: 'Q', answer: 'quantum', clue: 'Empieza por Q: Mínima cantidad discreta de energía que puede emitirse o absorberse en física cuántica.' },
  { letter: 'R', answer: 'radiactividad', clue: 'Empieza por R: Propiedad de ciertos núcleos inestables de emitir partículas o energía espontáneamente.' },
  { letter: 'S', answer: 'sodio', clue: 'Empieza por S: Metal alcalino, símbolo Na, número atómico 11, componente de la sal común.' },
  { letter: 'T', answer: 'temperatura', clue: 'Empieza por T: Medida de la energía cinética media de las partículas de un sistema.' },
  { letter: 'U', answer: 'uranio', clue: 'Empieza por U: Elemento radiactivo con número atómico 92, combustible de los reactores nucleares.' },
  { letter: 'V', answer: 'velocidad', clue: 'Empieza por V: Magnitud vectorial que expresa el desplazamiento de un objeto por unidad de tiempo.' },
  { letter: 'W', answer: 'watt', clue: 'Empieza por W: Unidad de potencia del SI, equivalente a 1 julio por segundo.' },
  { letter: 'X', answer: 'xenon', clue: 'Empieza por X: Gas noble con número atómico 54, usado en lámparas de destello y propulsores iónicos.' },
  { letter: 'Y', answer: 'ytrio', clue: 'Empieza por Y: Metal de transición con símbolo Y y número atómico 39, usado en LEDs y láseres.' },
  { letter: 'Z', answer: 'zinc', clue: 'Empieza por Z: Metal de transición con símbolo Zn y número atómico 30, usado en galvanización y baterías.' },
];
