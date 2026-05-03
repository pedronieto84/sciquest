export interface PasapalabraClue {
  letter: string;
  clue: string;
  answer: string;
  hint?: string;
}

// SET 1 — Física y Química general
const SET_1: PasapalabraClue[] = [
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
  { letter: 'Ñ', answer: 'ñu', clue: 'Empieza por Ñ: Mamífero africano de la familia Bovidae, también llamado GNU, famoso por sus migraciones masivas.' },
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

// SET 2 — Biología y ciencias de la vida
const SET_2: PasapalabraClue[] = [
  { letter: 'A', answer: 'adn', clue: 'Empieza por A: Molécula con doble hélice que almacena la información genética de todos los seres vivos.' },
  { letter: 'B', answer: 'bacteria', clue: 'Empieza por B: Microorganismo procariota unicelular, uno de los seres vivos más abundantes del planeta.' },
  { letter: 'C', answer: 'celula', clue: 'Empieza por C: Unidad estructural y funcional básica de todos los organismos vivos.' },
  { letter: 'D', answer: 'darwin', clue: 'Empieza por D: Científico inglés que publicó en 1859 la teoría de la evolución por selección natural.' },
  { letter: 'E', answer: 'enzima', clue: 'Empieza por E: Proteína que actúa como catalizador biológico acelerando reacciones químicas en los seres vivos.' },
  { letter: 'F', answer: 'fotosintesis', clue: 'Empieza por F: Proceso por el cual las plantas convierten luz solar, CO₂ y agua en glucosa y oxígeno.' },
  { letter: 'G', answer: 'gen', clue: 'Empieza por G: Unidad básica de herencia, segmento de ADN que codifica una proteína.' },
  { letter: 'H', answer: 'hormona', clue: 'Empieza por H: Molécula mensajera producida por glándulas que regula funciones del organismo.' },
  { letter: 'I', answer: 'inmunidad', clue: 'Empieza por I: Capacidad del organismo de resistir enfermedades gracias a anticuerpos y células defensivas.' },
  { letter: 'J', answer: 'jungla', clue: 'Empieza por J: Ecosistema tropical de gran densidad vegetal con altísima biodiversidad, también llamado selva.' },
  { letter: 'K', answer: 'koala', clue: 'Empieza por K: Marsupial australiano que se alimenta exclusivamente de hojas de eucalipto.' },
  { letter: 'L', answer: 'lisosoma', clue: 'Empieza por L: Organelo celular con enzimas digestivas que degrada materiales de desecho.' },
  { letter: 'M', answer: 'mitocondria', clue: 'Empieza por M: Organelo celular conocido como la "central energética", produce ATP mediante respiración celular.' },
  { letter: 'N', answer: 'neurona', clue: 'Empieza por N: Célula especializada del sistema nervioso que transmite impulsos eléctricos.' },
  { letter: 'Ñ', answer: 'ñame', clue: 'Empieza por Ñ: Tubérculo comestible tropical rico en carbohidratos, cultivado en África, Asia y América.' },
  { letter: 'O', answer: 'osmosis', clue: 'Empieza por O: Proceso de difusión del agua a través de una membrana semipermeable hacia la zona de mayor concentración de soluto.' },
  { letter: 'P', answer: 'proteina', clue: 'Empieza por P: Macromolécula formada por aminoácidos que realiza casi todas las funciones en los seres vivos.' },
  { letter: 'Q', answer: 'quimioterapia', clue: 'Empieza por Q: Tratamiento del cáncer que usa fármacos para destruir células que se dividen rápidamente.' },
  { letter: 'R', answer: 'ribosome', clue: 'Empieza por R (en inglés): organelo celular que sintetiza proteínas. En español: ribosoma.' },
  { letter: 'R', answer: 'respiracion', clue: 'Empieza por R: Proceso metabólico por el que las células obtienen energía oxidando glucosa con oxígeno.' },
  { letter: 'S', answer: 'simbiosis', clue: 'Empieza por S: Relación estrecha entre dos especies distintas que conviven, puede ser mutua o parasitaria.' },
  { letter: 'T', answer: 'tejido', clue: 'Empieza por T: Conjunto de células de igual naturaleza que realizan una misma función en el organismo.' },
  { letter: 'U', answer: 'uracilo', clue: 'Empieza por U: Base nitrogenada presente en el ARN pero no en el ADN, complementaria a la adenina.' },
  { letter: 'V', answer: 'virus', clue: 'Empieza por V: Agente infeccioso submicroscópico que solo puede replicarse dentro de células vivas.' },
  { letter: 'W', answer: 'watson', clue: 'Empieza por W: Científico que junto a Crick describió la estructura de doble hélice del ADN en 1953.' },
  { letter: 'X', answer: 'xilema', clue: 'Empieza por X: Tejido vegetal conductor que transporta agua y sales minerales desde las raíces hasta las hojas.' },
  { letter: 'Y', answer: 'yeyuno', clue: 'Empieza por Y: Segunda parte del intestino delgado, donde se absorbe la mayor parte de los nutrientes.' },
  { letter: 'Z', answer: 'zigoto', clue: 'Empieza por Z: Célula resultante de la fusión del óvulo con el espermatozoide en la fecundación.' },
];

// SET 3 — Astronomía y el universo
const SET_3: PasapalabraClue[] = [
  { letter: 'A', answer: 'agujero negro', clue: 'Empieza por A: Región del espacio con gravedad tan intensa que ni la luz puede escapar de ella.' },
  { letter: 'B', answer: 'big bang', clue: 'Empieza por B: Teoría cosmológica que describe el origen del universo hace ~13.800 millones de años.' },
  { letter: 'C', answer: 'cometa', clue: 'Empieza por C: Cuerpo del Sistema Solar formado por hielo y roca que desarrolla una cola al acercarse al Sol.' },
  { letter: 'D', answer: 'doppler', clue: 'Empieza por D: Efecto que explica el cambio de frecuencia de ondas cuando la fuente y el receptor se mueven relativamente.' },
  { letter: 'E', answer: 'eclipse', clue: 'Empieza por E: Fenómeno astronómico cuando un astro queda oculto por la sombra de otro.' },
  { letter: 'F', answer: 'fotosfera', clue: 'Empieza por F: Capa visible de la superficie del Sol con temperatura de ~5.500°C.' },
  { letter: 'G', answer: 'galaxia', clue: 'Empieza por G: Sistema gravitacionalmente ligado de estrellas, gas, polvo y materia oscura.' },
  { letter: 'H', answer: 'hubble', clue: 'Empieza por H: Astrónomo que descubrió que el universo se expande y que las galaxias se alejan entre sí.' },
  { letter: 'I', answer: 'io', clue: 'Empieza por I: Luna de Júpiter con la mayor actividad volcánica del Sistema Solar.' },
  { letter: 'J', answer: 'jupiter', clue: 'Empieza por J: Planeta más grande del Sistema Solar, con 318 veces la masa de la Tierra.' },
  { letter: 'K', answer: 'kepler', clue: 'Empieza por K: Astrónomo que formuló las leyes del movimiento planetario y también nombre de una misión NASA cazadora de exoplanetas.' },
  { letter: 'L', answer: 'luna', clue: 'Empieza por L: Satélite natural de la Tierra, formado por el impacto de Theia hace ~4.500 millones de años.' },
  { letter: 'M', answer: 'marte', clue: 'Empieza por M: Cuarto planeta del Sistema Solar, el "planeta rojo", explorado por el rover Perseverance.' },
  { letter: 'N', answer: 'nebulosa', clue: 'Empieza por N: Nube de gas y polvo interestelar donde nacen las estrellas.' },
  { letter: 'Ñ', answer: 'ñoñería', clue: 'Empieza por Ñ: Comodín libre. No existe término astronómico por esta letra. ¡Responde cualquier cosa!' },
  { letter: 'O', answer: 'orbita', clue: 'Empieza por O: Trayectoria curva que sigue un cuerpo celeste alrededor de otro por efecto de la gravedad.' },
  { letter: 'P', answer: 'pulsar', clue: 'Empieza por P: Estrella de neutrones que emite pulsos periódicos de radiación electromagnética.' },
  { letter: 'Q', answer: 'quasar', clue: 'Empieza por Q: Núcleo galáctico activo de altísima luminosidad alimentado por un agujero negro supermasivo.' },
  { letter: 'R', answer: 'relatividad', clue: 'Empieza por R: Teoría de Einstein que describe la gravedad como curvatura del espacio-tiempo.' },
  { letter: 'S', answer: 'saturno', clue: 'Empieza por S: Sexto planeta del Sistema Solar, famoso por sus espectaculares anillos de hielo y roca.' },
  { letter: 'T', answer: 'telescopio', clue: 'Empieza por T: Instrumento óptico o de radio que permite observar objetos lejanos del universo.' },
  { letter: 'U', answer: 'universo', clue: 'Empieza por U: Todo el espacio, tiempo, materia y energía que existe, con ~93.000 millones de años luz de diámetro observable.' },
  { letter: 'V', answer: 'venus', clue: 'Empieza por V: Segundo planeta del Sistema Solar, el más caliente (~465°C) por su efecto invernadero extremo.' },
  { letter: 'W', answer: 'webb', clue: 'Empieza por W: Telescopio espacial lanzado en 2021 capaz de observar las primeras galaxias del universo.' },
  { letter: 'X', answer: 'xmm newton', clue: 'Empieza por X: Observatorio espacial de rayos X de la ESA, que estudia los objetos más energéticos del universo.' },
  { letter: 'Y', answer: 'yupiter', clue: 'No uses este set directamente — se usa Júpiter para J.' },
  { letter: 'Y', answer: 'yuri gagarin', clue: 'Empieza por Y: Cosmonauta soviético, primer ser humano en viajar al espacio en 1961.' },
  { letter: 'Z', answer: 'zona habitable', clue: 'Empieza por Z: Región alrededor de una estrella donde las condiciones permiten la existencia de agua líquida.' },
];

// SET 4 — Física cuántica y nuclear
const SET_4: PasapalabraClue[] = [
  { letter: 'A', answer: 'antimateria', clue: 'Empieza por A: Materia compuesta de antipartículas; al encontrarse con materia ordinaria ambas se aniquilan.' },
  { letter: 'B', answer: 'bosón', clue: 'Empieza por B: Tipo de partícula subatómica que transmite fuerzas; el de Higgs fue descubierto en 2012.' },
  { letter: 'C', answer: 'croma', clue: 'Empieza por C: Carga de la fuerza nuclear fuerte que mantiene unidos los quarks dentro de los protones y neutrones.' },
  { letter: 'D', answer: 'difraccion', clue: 'Empieza por D: Fenómeno por el que las ondas se doblan al pasar por un obstáculo o rendija.' },
  { letter: 'E', answer: 'entrelazamiento', clue: 'Empieza por E: Fenómeno cuántico por el que dos partículas comparten estado y la medición de una afecta instantáneamente a la otra.' },
  { letter: 'F', answer: 'fermi', clue: 'Empieza por F: Físico italiano que construyó el primer reactor nuclear en 1942 bajo las gradas de un estadio.' },
  { letter: 'G', answer: 'graviton', clue: 'Empieza por G: Partícula hipotética que mediaría la fuerza gravitacional según la teoría cuántica de campos.' },
  { letter: 'H', answer: 'heisenberg', clue: 'Empieza por H: Físico alemán autor del principio de incertidumbre: no se pueden conocer simultáneamente posición y momento.' },
  { letter: 'I', answer: 'interferencia', clue: 'Empieza por I: Fenómeno onda cuando dos frentes se superponen, formando franjas claras y oscuras.' },
  { letter: 'J', answer: 'juleio', clue: 'Empieza por J: En el rosco usamos esta letra con el Julio, unidad de energía. Aquí: físico Henri Joule que estableció la conservación de la energía.' },
  { letter: 'J', answer: 'joule', clue: 'Empieza por J: Físico inglés que estableció la equivalencia entre trabajo mecánico y calor; su nombre es la unidad de energía.' },
  { letter: 'K', answer: 'kuark', clue: 'Empieza por K: Partícula fundamental que compone los protones y neutrones, existe en 6 tipos o "sabores".' },
  { letter: 'L', answer: 'lepton', clue: 'Empieza por L: Familia de partículas elementales sin carga de color; incluye el electrón, el muón y el tau.' },
  { letter: 'M', answer: 'muon', clue: 'Empieza por M: Partícula elemental similar al electrón pero 207 veces más pesada, con vida media de 2.2 μs.' },
  { letter: 'N', answer: 'neutrino', clue: 'Empieza por N: Partícula subatómica sin carga y casi sin masa que apenas interactúa con la materia; billones la atraviesan cada segundo.' },
  { letter: 'Ñ', answer: 'ñoño', clue: 'Empieza por Ñ: Comodín libre. No existe término en física cuántica por esta letra. ¡Responde lo que quieras!' },
  { letter: 'O', answer: 'orbital', clue: 'Empieza por O: Región del espacio alrededor del núcleo donde hay mayor probabilidad de encontrar un electrón.' },
  { letter: 'P', answer: 'planck', clue: 'Empieza por P: Físico alemán que propuso que la energía se emite en cuantos discretos; su constante h = 6.626×10⁻³⁴ J·s.' },
  { letter: 'Q', answer: 'qubit', clue: 'Empieza por Q: Unidad básica de información en computación cuántica, puede ser 0, 1 o superposición de ambos.' },
  { letter: 'R', answer: 'resonancia', clue: 'Empieza por R: Fenómeno por el que un sistema oscila con mayor amplitud a ciertas frecuencias naturales.' },
  { letter: 'S', answer: 'schrodinger', clue: 'Empieza por S: Físico cuya ecuación describe la evolución de la función de onda; famoso por su experimento mental del gato.' },
  { letter: 'T', answer: 'tunel cuantico', clue: 'Empieza por T: Efecto por el que una partícula puede atravesar una barrera de energía que clásicamente sería insuperable.' },
  { letter: 'U', answer: 'uncertainty', clue: 'Empieza por U (en inglés): principio de Heisenberg. En español: incertidumbre.' },
  { letter: 'U', answer: 'ultrasonido', clue: 'Empieza por U: Onda sonora de frecuencia superior a 20.000 Hz, usada en medicina para diagnóstico por imagen.' },
  { letter: 'V', answer: 'vacio cuantico', clue: 'Empieza por V: Estado de mínima energía del campo cuántico, repleto de fluctuaciones de partículas virtuales.' },
  { letter: 'W', answer: 'wavefunction', clue: 'Empieza por W (en inglés): función que describe el estado cuántico. En español: función de onda.' },
  { letter: 'W', answer: 'wilson', clue: 'Empieza por W: Físico que inventó la cámara de niebla, permitiendo ver trayectorias de partículas cargadas.' },
  { letter: 'X', answer: 'xray', clue: 'Empieza por X: Radiación electromagnética de alta energía descubierta por Röntgen en 1895, usada en medicina.' },
  { letter: 'Y', answer: 'yukawa', clue: 'Empieza por Y: Físico japonés que predijo la existencia del mesón pi (pión) como mediador de la fuerza nuclear fuerte.' },
  { letter: 'Z', answer: 'zeeman', clue: 'Empieza por Z: Efecto por el que líneas espectrales se dividen cuando el átomo está en un campo magnético.' },
];

// SET 5 — Matemáticas, física clásica y unidades
const SET_5: PasapalabraClue[] = [
  { letter: 'A', answer: 'aceleracion', clue: 'Empieza por A: Variación de la velocidad por unidad de tiempo, medida en m/s².' },
  { letter: 'B', answer: 'bernoulli', clue: 'Empieza por B: Principio que explica el vuelo de los aviones: a mayor velocidad del fluido, menor presión.' },
  { letter: 'C', answer: 'coulomb', clue: 'Empieza por C: Unidad de carga eléctrica del SI, y también nombre de la ley que describe la fuerza entre cargas.' },
  { letter: 'D', answer: 'densidad', clue: 'Empieza por D: Relación entre la masa y el volumen de una sustancia, expresada en kg/m³.' },
  { letter: 'E', answer: 'energia', clue: 'Empieza por E: Capacidad de un sistema para realizar trabajo, se conserva siempre en sistemas aislados.' },
  { letter: 'F', answer: 'friccion', clue: 'Empieza por F: Fuerza que se opone al movimiento relativo entre dos superficies en contacto.' },
  { letter: 'G', answer: 'gauss', clue: 'Empieza por G: Matemático y físico alemán que aportó el teorema sobre flujos a través de superficies cerradas; unidad de campo magnético.' },
  { letter: 'H', answer: 'hertz', clue: 'Empieza por H: Unidad de frecuencia del SI, equivale a un ciclo por segundo.' },
  { letter: 'I', answer: 'inercia', clue: 'Empieza por I: Propiedad de los cuerpos de resistir cambios en su estado de movimiento, descrita en la primera ley de Newton.' },
  { letter: 'J', answer: 'joule', clue: 'Empieza por J: Unidad de energía y trabajo del SI, equivale a la energía para desplazar 1 N a lo largo de 1 m.' },
  { letter: 'K', answer: 'kilovatioho', clue: 'Empieza por K: Unidad de energía equivalente a 1.000 vatios durante una hora, usada en facturas eléctricas.' },
  { letter: 'K', answer: 'kilogramo', clue: 'Empieza por K: Unidad básica de masa del Sistema Internacional.' },
  { letter: 'L', answer: 'luz', clue: 'Empieza por L: Radiación electromagnética visible por el ojo humano, viaja a ~300.000 km/s en el vacío.' },
  { letter: 'M', answer: 'maxwell', clue: 'Empieza por M: Físico escocés que unificó electricidad, magnetismo y óptica en sus cuatro ecuaciones.' },
  { letter: 'N', answer: 'newton', clue: 'Empieza por N: Físico inglés que formuló las tres leyes del movimiento y la ley de gravitación universal.' },
  { letter: 'Ñ', answer: 'ñoño', clue: 'Empieza por Ñ: Comodín libre. No existe término matemático por esta letra. ¡Escribe lo que quieras!' },
  { letter: 'O', answer: 'ohm', clue: 'Empieza por O: Unidad de resistencia eléctrica del SI; la ley de este nombre relaciona tensión, intensidad y resistencia.' },
  { letter: 'P', answer: 'presion', clue: 'Empieza por P: Fuerza ejercida por unidad de área, medida en Pascales (Pa).' },
  { letter: 'Q', answer: 'quiral', clue: 'Empieza por Q: Propiedad de una molécula que no es superponible a su imagen especular, como los aminoácidos.' },
  { letter: 'R', answer: 'resistencia', clue: 'Empieza por R: Oposición de un conductor al paso de la corriente eléctrica, medida en ohmios.' },
  { letter: 'S', answer: 'segundo', clue: 'Empieza por S: Unidad básica de tiempo del Sistema Internacional, definida mediante oscilaciones del átomo de cesio.' },
  { letter: 'T', answer: 'tesla', clue: 'Empieza por T: Unidad de campo magnético del SI, y también nombre del inventor que desarrolló la corriente alterna.' },
  { letter: 'U', answer: 'ultravioleta', clue: 'Empieza por U: Radiación electromagnética de longitud de onda entre la luz visible y los rayos X.' },
  { letter: 'V', answer: 'voltio', clue: 'Empieza por V: Unidad de tensión o diferencia de potencial eléctrico del SI.' },
  { letter: 'W', answer: 'weber', clue: 'Empieza por W: Unidad de flujo magnético del SI, equivale a 1 voltio·segundo.' },
  { letter: 'X', answer: 'xi', clue: 'Empieza por X: Letra griega (Ξ ξ) usada en física para designar partículas elementales de la familia de los bariones.' },
  { letter: 'Y', answer: 'young', clue: 'Empieza por Y: Físico inglés que demostró la naturaleza ondulatoria de la luz con el experimento de la doble rendija.' },
  { letter: 'Z', answer: 'zero', clue: 'Empieza por Z: Concepto matemático fundamental que representa la ausencia de cantidad; en física: temperatura cero absoluto.' },
];

// Filtra duplicados de letra (solo el primero por letra)
function dedup(set: PasapalabraClue[]): PasapalabraClue[] {
  const seen = new Set<string>();
  return set.filter(c => {
    if (seen.has(c.letter)) return false;
    seen.add(c.letter);
    return true;
  });
}

export const PASAPALABRA_SETS: PasapalabraClue[][] = [
  dedup(SET_1),
  dedup(SET_2),
  dedup(SET_3),
  dedup(SET_4),
  dedup(SET_5),
];

// Retrocompatibilidad — exporta el primer set como antes
export const PASAPALABRA_CLUES = PASAPALABRA_SETS[0];
