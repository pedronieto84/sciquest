import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('/data/.openclaw/workspace/.firebase-sa-sciquest.json', 'utf8'));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

// ── TEORÍA (10 tarjetas) ─────────────────────────────────────────────
const theoryCards = [
  {
    subject: 'biology', order: 1, difficulty: 'beginner',
    gradient: 'from-green-600 to-emerald-500', emoji: '🧬',
    title: 'La Célula — Unidad de la Vida',
    tagline: 'El ladrillo fundamental de todos los seres vivos',
    body: 'La célula es la unidad estructural y funcional de todos los seres vivos. Las hay de dos tipos principales: procariotas (sin núcleo definido, como las bacterias) y eucariotas (con núcleo, como las células animales y vegetales). Una célula típica contiene membrana plasmática, citoplasma, ribosomas, mitocondrias y (en eucariotas) núcleo con el ADN. El cuerpo humano tiene aproximadamente 37 billones de células.',
    keyPoints: ['Procariota: sin núcleo (bacterias, arqueas)', 'Eucariota: con núcleo (animales, plantas, hongos)', 'Membrana plasmática: regula qué entra y sale', 'Mitocondria: "central eléctrica" de la célula', 'Ribosomas: fabrican proteínas'],
    funFact: 'Si estiraras todo el ADN de una sola célula humana, mediría 2 metros. El cuerpo humano tiene 37 billones de células, así que el ADN total equivaldría a ir y volver al Sol 140 veces.',
  },
  {
    subject: 'biology', order: 2, difficulty: 'beginner',
    gradient: 'from-emerald-600 to-green-400', emoji: '🔬',
    title: 'El ADN — El Código de la Vida',
    tagline: 'El manual de instrucciones de cada ser vivo',
    body: 'El ADN (ácido desoxirribonucleico) es la molécula que almacena la información genética en todos los seres vivos. Tiene estructura de doble hélice formada por dos cadenas antiparalelas unidas por pares de bases nitrogenadas: Adenina (A) con Timina (T), y Citosina (C) con Guanina (G). La secuencia de estas bases codifica instrucciones para fabricar proteínas. El genoma humano tiene ~3.200 millones de pares de bases y ~20.000 genes.',
    keyPoints: ['Doble hélice descubierta por Watson y Crick en 1953', 'A-T y C-G (complementariedad de bases)', 'Gen: secuencia de ADN que codifica una proteína', 'Genoma humano: ~3.200 millones de pares de bases', 'El 99.9% del ADN humano es idéntico entre personas'],
    funFact: 'Compartimos el 98.7% del ADN con los chimpancés, el 85% con los ratones, el 60% con las moscas de la fruta y el 31% con el trigo. La vida en la Tierra comparte un origen común reflejado en el ADN.',
  },
  {
    subject: 'biology', order: 3, difficulty: 'intermediate',
    gradient: 'from-green-600 to-teal-500', emoji: '🌱',
    title: 'La Fotosíntesis',
    tagline: 'Convirtiendo luz solar en alimento',
    body: 'La fotosíntesis es el proceso por el cual las plantas, algas y algunas bacterias convierten la energía luminosa en energía química almacenada como glucosa. Ocurre en los cloroplastos, que contienen clorofila (el pigmento verde que absorbe luz roja y azul, reflejando el verde). La ecuación global es: 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂. Toda la energía que consumen los animales proviene originalmente de la fotosíntesis.',
    keyPoints: ['Ocurre en los cloroplastos (plantas, algas)', 'La clorofila absorbe luz roja y azul, refleja verde', 'Produce glucosa (energía) y libera oxígeno', 'Base de todas las cadenas alimentarias', '6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂'],
    formula: '6CO₂ + 6H₂O + energía lumínica → C₆H₁₂O₆ + 6O₂',
    formulaDesc: 'Dióxido de carbono + agua + luz → glucosa + oxígeno',
    funFact: 'Las plantas han producido prácticamente todo el oxígeno de la atmósfera terrestre mediante fotosíntesis a lo largo de millones de años. Antes de las primeras plantas fotosintéticas, la Tierra no tenía oxígeno libre en la atmósfera.',
  },
  {
    subject: 'biology', order: 4, difficulty: 'intermediate',
    gradient: 'from-green-600 to-emerald-500', emoji: '🧫',
    title: 'Mitosis y Meiosis',
    tagline: 'Cómo se multiplican las células',
    body: 'La mitosis es la división celular que produce dos células hijas genéticamente idénticas a la madre. Es la base del crecimiento y la regeneración de tejidos. La meiosis produce cuatro células hijas con la mitad de cromosomas (gametos: óvulos y espermatozoides). En la meiosis hay recombinación genética que genera variabilidad. La fusión de dos gametos en la fecundación restaura el número completo de cromosomas.',
    keyPoints: ['Mitosis: 1 célula → 2 células idénticas (crecimiento)', 'Meiosis: 1 célula → 4 gametos (reproducción sexual)', 'Humanos: 46 cromosomas en células normales, 23 en gametos', 'La meiosis genera variabilidad genética (recombinación)', 'Fecundación: óvulo (23) + espermatozoide (23) = cigoto (46)'],
    funFact: 'Tu cuerpo produce ~3,8 millones de glóbulos rojos por segundo mediante mitosis. A lo largo de tu vida, se dividen billones de células. Que el proceso salga bien el 99.9999% de las veces es uno de los milagros más sorprendentes de la biología.',
  },
  {
    subject: 'biology', order: 5, difficulty: 'intermediate',
    gradient: 'from-emerald-600 to-green-400', emoji: '🐒',
    title: 'Evolución y Selección Natural',
    tagline: 'Cómo cambian las especies con el tiempo',
    body: 'La teoría de la evolución por selección natural, propuesta por Charles Darwin en 1859, explica la diversidad de la vida. Los individuos con características más adaptadas al ambiente sobreviven y se reproducen más, transmitiendo esas características a la siguiente generación. Con el tiempo, acumulación de cambios (mutaciones) lleva a la aparición de nuevas especies. La evidencia viene de fósiles, anatomía comparada, embriología y ADN.',
    keyPoints: ['Variación: los individuos difieren entre sí', 'Herencia: las variaciones se transmiten a la descendencia', 'Selección: los más adaptados sobreviven y se reproducen más', 'Tiempo: millones de años de cambios acumulados', 'Evidencia: fósiles, ADN comparado, anatomía homóloga'],
    funFact: 'Darwin tenía razón sobre la evolución pero se equivocó en el mecanismo de herencia: no conocía la genética. Gregor Mendel estaba publicando sus experimentos con guisantes al mismo tiempo que El Origen de las Especies, pero Darwin nunca los leyó.',
  },
  {
    subject: 'biology', order: 6, difficulty: 'intermediate',
    gradient: 'from-green-600 to-emerald-500', emoji: '🫀',
    title: 'El Sistema Circulatorio',
    tagline: 'El corazón como bomba de la vida',
    body: 'El sistema circulatorio transporta oxígeno, nutrientes, hormonas y productos de desecho por todo el cuerpo. El corazón humano bombea ~5 litros de sangre por minuto y late ~100.000 veces al día. La sangre circula por dos circuitos: el pulmonar (corazón-pulmones-corazón) y el sistémico (corazón-cuerpo-corazón). Los glóbulos rojos transportan oxígeno gracias a la hemoglobina.',
    keyPoints: ['Corazón: 4 cámaras (2 aurículas + 2 ventrículos)', 'Circulación pulmonar: oxigena la sangre', 'Circulación sistémica: distribuye oxígeno al cuerpo', 'Glóbulos rojos: transportan O₂ (hemoglobina)', 'Plasma: 55% de la sangre, transporta nutrientes y hormonas'],
    funFact: 'El corazón late ~100.000 veces al día y ~3.600 millones de veces en una vida de 80 años. Si estiraras todos los capilares, venas y arterias del cuerpo humano, la longitud total sería de unos 100.000 km, suficiente para rodear la Tierra 2,5 veces.',
  },
  {
    subject: 'biology', order: 7, difficulty: 'advanced',
    gradient: 'from-teal-600 to-green-500', emoji: '🧬',
    title: 'Genética Mendeliana',
    tagline: 'Por qué te pareces a tus padres',
    body: 'Gregor Mendel descubrió las leyes de la herencia genética experimentando con guisantes (1865). Cada característica está controlada por dos alelos (uno de cada progenitor). Los alelos dominantes se expresan siempre; los recesivos solo cuando están en doble copia. El genotipo es la composición genética (AA, Aa, aa); el fenotipo es la característica observable. La probabilidad de herencia se puede calcular con cuadrados de Punnett.',
    keyPoints: ['Alelo dominante (A): se expresa sobre el recesivo', 'Alelo recesivo (a): solo se expresa en homocigosis (aa)', 'Genotipo AA u Aa → fenotipo dominante', 'Genotipo aa → fenotipo recesivo', 'Cuadrado de Punnett: calcula probabilidades de herencia'],
    visual: 'Progenitores: Aa × Aa\nDescendencia: AA (25%) | Aa (50%) | aa (25%)\n→ Fenotipo dominante: 75% | Recesivo: 25%',
    funFact: 'Mendel publicó sus resultados en 1866 y fueron completamente ignorados durante 35 años. Fue redescubierto en 1900 por tres científicos independientes que llegaron a las mismas conclusiones. Mendel murió sin saber que había fundado la genética.',
  },
  {
    subject: 'biology', order: 8, difficulty: 'intermediate',
    gradient: 'from-green-600 to-emerald-500', emoji: '🌍',
    title: 'Ecosistemas y Cadenas Tróficas',
    tagline: 'Todo está conectado en la naturaleza',
    body: 'Un ecosistema es la comunidad de seres vivos de un área junto con su entorno físico. La energía fluye a través de cadenas tróficas: productores (plantas fotosintéticas) → consumidores primarios (herbívoros) → consumidores secundarios (carnívoros) → descomponedores. Solo el ~10% de la energía se transfiere al siguiente nivel. Los ciclos biogeoquímicos (carbono, nitrógeno, agua) reciclan la materia.',
    keyPoints: ['Productores: fabrican su propio alimento (fotosíntesis)', 'Consumidores: se alimentan de otros organismos', 'Descomponedores: reciclan la materia orgánica', 'Solo 10% de energía pasa al siguiente nivel trófico', 'Biodiversidad: más diversidad = ecosistema más estable'],
    funFact: 'Los hongos son los principales descomponedores del planeta. Sin ellos, el planeta estaría cubierto de cadáveres y hojas muertas sin descomponerse. Un gramo de suelo del bosque puede contener kilómetros de filamentos de hongos.',
  },
  {
    subject: 'biology', order: 9, difficulty: 'advanced',
    gradient: 'from-emerald-600 to-teal-500', emoji: '🦠',
    title: 'Virus y Sistema Inmune',
    tagline: 'La guerra invisible dentro de tu cuerpo',
    body: 'Los virus son entidades en el límite de la vida: no tienen células propias, solo material genético (ADN o ARN) envuelto en proteínas. Se replican secuestrando la maquinaria de células huésped. El sistema inmune tiene dos líneas de defensa: innata (rápida, inespecífica) y adaptativa (lenta, específica con anticuerpos y linfocitos T). Las vacunas entrenan al sistema inmune mostrándole antígenos inofensivos.',
    keyPoints: ['Virus: no son células vivas, pero usan células para replicarse', 'Sistema innato: respuesta rápida (fiebre, inflamación)', 'Sistema adaptativo: anticuerpos específicos por patógeno', 'Linfocitos B: producen anticuerpos', 'Linfocitos T: destruyen células infectadas', 'Vacunas: entrenan al inmune sin causar enfermedad'],
    funFact: 'El cuerpo humano contiene más bacterias que células propias (ratio ~1.3:1). La mayoría son beneficiosas: el microbioma intestinal es esencial para la digestión, el sistema inmune y hasta el estado de ánimo.',
  },
  {
    subject: 'biology', order: 10, difficulty: 'beginner',
    gradient: 'from-green-600 to-emerald-500', emoji: '🌿',
    title: 'Las Plantas y su Estructura',
    tagline: 'Los ingenieros silenciosos del planeta',
    body: 'Las plantas son organismos eucariotas multicelulares que producen su propio alimento mediante fotosíntesis. Su cuerpo tiene raíz (absorbe agua y minerales, ancla la planta), tallo (transporte de sustancias, soporte) y hojas (fotosíntesis, intercambio de gases). El xilema transporta agua y minerales desde la raíz hacia arriba; el floema transporta los azúcares producidos en la fotosíntesis hacia abajo.',
    keyPoints: ['Raíz: absorción de agua y minerales', 'Tallo: soporte y transporte', 'Hoja: fotosíntesis (cloroplastos)', 'Xilema: agua hacia arriba', 'Floema: azúcares hacia abajo', 'Estomas: poros para intercambio gaseoso (CO₂/O₂)'],
    funFact: 'El árbol más viejo conocido es Matusalén, un pino bristlecone en California con 4.855 años (plantado antes de que se construyeran las pirámides de Egipto). Su ubicación exacta es secreta para protegerlo.',
  },
];

const questions = [
  { subject: 'biology', question: '¿Cuál es la unidad básica de todos los seres vivos?', options: ['El átomo', 'La célula', 'La molécula', 'El tejido'], correct: 1, explanation: 'La célula es la unidad estructural y funcional de todos los seres vivos.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué organelo celular es conocido como "la central eléctrica de la célula"?', options: ['El núcleo', 'El ribosoma', 'La mitocondria', 'El retículo endoplasmático'], correct: 2, explanation: 'La mitocondria produce ATP (energía) mediante respiración celular.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Cuál es la estructura del ADN?', options: ['Hélice simple', 'Doble hélice', 'Triple hélice', 'Estructura globular'], correct: 1, explanation: 'El ADN tiene estructura de doble hélice, descubierta por Watson y Crick en 1953.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué bases nitrogenadas se emparejan en el ADN?', options: ['A-G y T-C', 'A-T y C-G', 'A-C y T-G', 'A-U y C-G'], correct: 1, explanation: 'En el ADN: Adenina (A) se empareja con Timina (T), y Citosina (C) con Guanina (G).', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿En qué organelo ocurre la fotosíntesis?', options: ['Mitocondria', 'Ribosoma', 'Cloroplasto', 'Vacuola'], correct: 2, explanation: 'La fotosíntesis ocurre en los cloroplastos, que contienen clorofila.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Cuál es el producto principal de la fotosíntesis?', options: ['Proteínas', 'Glucosa y oxígeno', 'CO₂ y agua', 'ATP solamente'], correct: 1, explanation: 'La fotosíntesis produce glucosa (energía almacenada) y libera oxígeno como subproducto.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué tipo de división celular produce gametos?', options: ['Mitosis', 'Meiosis', 'Fisión binaria', 'Gemación'], correct: 1, explanation: 'La meiosis produce células reproductoras (gametos) con la mitad de cromosomas.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Cuántos cromosomas tiene una célula humana normal (somática)?', options: ['23', '46', '48', '92'], correct: 1, explanation: 'Las células humanas tienen 46 cromosomas (23 pares). Los gametos tienen 23.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Quién propuso la teoría de la evolución por selección natural?', options: ['Gregor Mendel', 'Louis Pasteur', 'Charles Darwin', 'James Watson'], correct: 2, explanation: 'Charles Darwin publicó "El Origen de las Especies" en 1859 proponiendo la evolución por selección natural.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué porcentaje de ADN compartimos con los chimpancés?', options: ['75%', '85%', '98,7%', '100%'], correct: 2, explanation: 'Los humanos comparten el 98,7% del ADN con los chimpancés, nuestros parientes más cercanos.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Cuál es la función principal del sistema circulatorio?', options: ['Digerir alimentos', 'Transportar oxígeno y nutrientes', 'Filtrar toxinas', 'Producir hormonas'], correct: 1, explanation: 'El sistema circulatorio transporta oxígeno, nutrientes, hormonas y residuos por todo el cuerpo.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué molécula transporta el oxígeno en los glóbulos rojos?', options: ['Glucosa', 'Insulina', 'Hemoglobina', 'Colágeno'], correct: 2, explanation: 'La hemoglobina es la proteína de los glóbulos rojos que transporta el oxígeno.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué es un alelo dominante?', options: ['El que solo se expresa en doble copia', 'El que se expresa aunque haya uno solo', 'El alelo materno siempre', 'El alelo más común'], correct: 1, explanation: 'El alelo dominante se expresa en el fenotipo tanto en homocigosis (AA) como en heterocigosis (Aa).', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Quién descubrió las leyes de la herencia genética?', options: ['Darwin', 'Mendel', 'Watson', 'Crick'], correct: 1, explanation: 'Gregor Mendel descubrió las leyes de la herencia experimentando con guisantes en el siglo XIX.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué son los productores en una cadena trófica?', options: ['Animales que cazan', 'Descomponedores', 'Organismos que fabrican su propio alimento', 'Parásitos'], correct: 2, explanation: 'Los productores (plantas, algas) fabrican su propio alimento mediante fotosíntesis y son la base de la cadena trófica.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué porcentaje de energía se transfiere entre niveles tróficos?', options: ['100%', '50%', '25%', '10%'], correct: 3, explanation: 'Solo el 10% de la energía pasa de un nivel trófico al siguiente; el 90% se pierde como calor.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Los virus son seres vivos?', options: ['Sí, son organismos unicelulares', 'No, están en el límite de la vida', 'Sí, pero sin núcleo', 'No, son solo proteínas'], correct: 1, explanation: 'Los virus no tienen células propias y no pueden reproducirse sin una célula huésped. Están en el límite entre lo vivo y lo no vivo.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué tejido transporta el agua desde las raíces hasta las hojas en las plantas?', options: ['Floema', 'Epidermis', 'Xilema', 'Córtex'], correct: 2, explanation: 'El xilema transporta agua y minerales desde las raíces hacia arriba. El floema transporta azúcares.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Cuántas células aproximadamente tiene el cuerpo humano?', options: ['1 millón', '1.000 millones', '37 billones', '1 billón'], correct: 2, explanation: 'El cuerpo humano tiene aproximadamente 37 billones de células.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué tipo de células no tienen núcleo definido?', options: ['Eucariotas', 'Animales', 'Procariotas', 'Vegetales'], correct: 2, explanation: 'Las células procariotas (bacterias, arqueas) no tienen núcleo definido; su ADN está libre en el citoplasma.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué produce el ARN mensajero (ARNm)?', options: ['ADN nuevo', 'Copias de genes para fabricar proteínas', 'Energía celular', 'Lípidos de membrana'], correct: 1, explanation: 'El ARNm es una copia del gen que viaja al ribosoma donde se usa como instrucción para fabricar proteínas.', difficulty: 'advanced' },
  { subject: 'biology', question: '¿Cuál es la función del estómago?', options: ['Absorber nutrientes', 'Producir bilis', 'Descomponer alimentos con ácido y enzimas', 'Filtrar la sangre'], correct: 2, explanation: 'El estómago descompone los alimentos mediante ácido clorhídrico y enzimas digestivas como la pepsina.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué es la homeostasis?', options: ['La reproducción celular', 'El mantenimiento del equilibrio interno del organismo', 'La síntesis de proteínas', 'El intercambio gaseoso'], correct: 1, explanation: 'La homeostasis es la capacidad de los organismos de mantener condiciones internas estables (temperatura, pH, glucosa) frente a cambios externos.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué son los linfocitos B?', options: ['Células que destruyen células infectadas', 'Glóbulos rojos especializados', 'Células que producen anticuerpos', 'Plaquetas grandes'], correct: 2, explanation: 'Los linfocitos B producen anticuerpos específicos contra patógenos como parte de la inmunidad adaptativa.', difficulty: 'advanced' },
  { subject: 'biology', question: '¿Cuál es la diferencia entre genotipo y fenotipo?', options: ['No hay diferencia', 'Genotipo = genes; fenotipo = características observables', 'Genotipo = características; fenotipo = genes', 'Genotipo es dominante; fenotipo es recesivo'], correct: 1, explanation: 'El genotipo es la composición genética (AA, Aa, aa) y el fenotipo es la característica observable resultante.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué proceso usa el oxígeno para obtener energía de la glucosa?', options: ['Fotosíntesis', 'Fermentación', 'Respiración celular aerobia', 'Osmosis'], correct: 2, explanation: 'La respiración celular aerobia usa oxígeno para oxidar la glucosa y producir ATP, CO₂ y agua.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Cuántas veces late el corazón humano aproximadamente al día?', options: ['10.000', '50.000', '100.000', '500.000'], correct: 2, explanation: 'El corazón late unas 100.000 veces al día (~70 veces por minuto en reposo).', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué descubrió Pasteur sobre las enfermedades infecciosas?', options: ['La teoría gérmenes-enfermedad', 'La estructura del ADN', 'La fotosíntesis', 'La penicilina'], correct: 0, explanation: 'Louis Pasteur demostró que las enfermedades infecciosas son causadas por microorganismos (teoría germinal).', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Cuál es la función de los ribosomas?', options: ['Producir energía', 'Almacenar agua', 'Sintetizar proteínas', 'Digerir partículas'], correct: 2, explanation: 'Los ribosomas leen el ARNm y sintetizan proteínas uniendo aminoácidos según el código genético.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué tipo de reproducción genera mayor variabilidad genética?', options: ['Reproducción asexual', 'Reproducción sexual', 'Gemación', 'Fisión binaria'], correct: 1, explanation: 'La reproducción sexual combina material genético de dos progenitores, generando variabilidad que es motor de la evolución.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿En qué parte de la célula se encuentra el ADN en eucariotas?', options: ['Mitocondria solo', 'Ribosoma', 'Núcleo (principalmente)', 'Membrana plasmática'], correct: 2, explanation: 'En células eucariotas, el ADN está principalmente en el núcleo. También hay pequeñas cantidades en mitocondrias y cloroplastos.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué es la mutación genética?', options: ['División celular anormal', 'Cambio en la secuencia del ADN', 'Infección viral del núcleo', 'Daño en la membrana'], correct: 1, explanation: 'Una mutación es un cambio permanente en la secuencia del ADN. Pueden ser perjudiciales, neutras o beneficiosas.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué animal tiene más cromosomas que los humanos?', options: ['El chimpancé (48)', 'El perro (78)', 'El cangrejo herradura (208)', 'Todos los anteriores'], correct: 3, explanation: 'Los perros tienen 78 cromosomas, los chimpancés 48 y el cangrejo herradura 208. El número de cromosomas no determina la complejidad del organismo.', difficulty: 'advanced' },
  { subject: 'biology', question: '¿Qué es la simbiosis?', options: ['Competencia entre especies', 'Relación estrecha entre dos especies distintas', 'Predación', 'Parasitismo exclusivamente'], correct: 1, explanation: 'La simbiosis es una relación estrecha entre dos especies: puede ser mutualismo (+/+), comensalismo (+/0) o parasitismo (+/-).', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Cuál es la molécula energética universal de las células?', options: ['Glucosa', 'ADN', 'ATP', 'ARN'], correct: 2, explanation: 'El ATP (adenosín trifosfato) es la moneda energética de las células. Casi todos los procesos celulares usan ATP como fuente de energía.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué son los estomas en las plantas?', options: ['Las raíces finas', 'Poros en las hojas para intercambio gaseoso', 'Las células del xilema', 'Los granos de polen'], correct: 1, explanation: 'Los estomas son poros microscópicos en las hojas que permiten el intercambio de CO₂ y O₂, y la transpiración.', difficulty: 'intermediate' },
  { subject: 'biology', question: '¿Qué es la biodiversidad?', options: ['Solo el número de animales en una zona', 'La variedad de formas de vida en un ecosistema', 'Las plantas medicinales conocidas', 'La cantidad de ADN de un organismo'], correct: 1, explanation: 'La biodiversidad es la variedad de formas de vida (genes, especies, ecosistemas) y es crucial para la estabilidad de los ecosistemas.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Qué virus causó la pandemia de 2020?', options: ['Influenza H1N1', 'SARS-CoV-2', 'VIH', 'Ébola'], correct: 1, explanation: 'La pandemia de COVID-19 fue causada por el SARS-CoV-2, un coronavirus descubierto en 2019.', difficulty: 'beginner' },
  { subject: 'biology', question: '¿Cuántos pares de bases tiene el genoma humano aproximadamente?', options: ['3,2 millones', '32 millones', '320 millones', '3.200 millones'], correct: 3, explanation: 'El genoma humano tiene ~3.200 millones de pares de bases que codifican unos 20.000 genes.', difficulty: 'advanced' },
  { subject: 'biology', question: '¿Qué es la clonación?', options: ['Mutación inducida', 'Creación de una copia genética idéntica', 'Fusión de dos células', 'Reproducción sexual asistida'], correct: 1, explanation: 'La clonación produce organismos genéticamente idénticos. La oveja Dolly (1996) fue el primer mamífero clonado a partir de una célula adulta.', difficulty: 'intermediate' },
];

// Borrar existentes de biology
const existingTheory = await db.collection('theory').where('subject', '==', 'biology').get();
await Promise.all(existingTheory.docs.map(d => d.ref.delete()));
const existingQ = await db.collection('questions').where('subject', '==', 'biology').get();
await Promise.all(existingQ.docs.map(d => d.ref.delete()));

// Insertar teoría
for (const card of theoryCards) {
  await db.collection('theory').add(card);
  console.log(`✅ Theory: ${card.title}`);
}

// Insertar preguntas
for (const q of questions) {
  await db.collection('questions').add(q);
}
console.log(`✅ ${questions.length} biology questions seeded`);
console.log('🎉 Biology seed complete!');
