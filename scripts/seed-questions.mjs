import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const sa = JSON.parse(readFileSync('/data/.openclaw/workspace/.firebase-sa-sciquest.json', 'utf8'));
initializeApp({ credential: cert(sa) });
const db = getFirestore();

// ═══════════════════════════════════════════════════════════════════
// ORIGINAL HARDCODED QUESTIONS
// ═══════════════════════════════════════════════════════════════════

const originalQuestions = [
  // ─── CHEMISTRY ───
  {
    id: 'chem_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Hidrógeno (H)?',
    options: ['0', '1', '2', '3'], correctIndex: 1,
    explanation: 'El Hidrógeno tiene 1 protón — es el elemento más simple del universo.',
  },
  {
    id: 'chem_2', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Oxígeno?',
    options: ['O', 'Ox', 'On', 'Or'], correctIndex: 0,
    explanation: 'El Oxígeno se representa con la letra "O".',
  },
  {
    id: 'chem_3', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué elemento tiene número atómico 6?',
    options: ['Nitrógeno', 'Carbono', 'Boro', 'Berilio'], correctIndex: 1,
    explanation: 'El Carbono (C) tiene 6 protones — es la base de la vida.',
  },
  {
    id: 'chem_4', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Cuántos electrones tiene el Sodio (Na) en su estado neutro?',
    options: ['10', '11', '12', '23'], correctIndex: 1,
    explanation: 'El Sodio tiene número atómico 11, por lo tanto 11 electrones.',
  },
  {
    id: 'chem_5', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué gas noble tiene 36 protones?',
    options: ['Argón', 'Neón', 'Kriptón', 'Xenón'], correctIndex: 2,
    explanation: 'El Kriptón (Kr) tiene número atómico 36.',
  },
  {
    id: 'chem_6', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿En qué estado físico se encuentra el agua a temperatura ambiente?',
    options: ['Sólido', 'Líquido', 'Gas', 'Plasma'], correctIndex: 1,
    explanation: 'A ~20°C el agua es líquida.',
  },
  {
    id: 'chem_7', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Cuál es la fórmula del ácido sulfúrico?',
    options: ['HCl', 'H₂SO₄', 'H₂O₂', 'HNO₃'], correctIndex: 1,
    explanation: 'El ácido sulfúrico es H₂SO₄ — muy corrosivo.',
  },

  // ─── QUANTUM ───
  {
    id: 'quant_1', subject: 'quantum', difficulty: 'easy', xpReward: 15,
    question: '¿Qué describe el principio de Heisenberg?',
    options: [
      'La velocidad de la luz es constante',
      'No podemos saber a la vez posición y velocidad exactas de una partícula',
      'La energía se conserva',
      'Los electrones orbitan el núcleo',
    ], correctIndex: 1,
    explanation: 'El principio de incertidumbre dice que cuanto más precisamos la posición, menos sabemos del momento y viceversa.',
  },
  {
    id: 'quant_2', subject: 'quantum', difficulty: 'medium', xpReward: 25,
    question: '¿Qué es un "qubit" en computación cuántica?',
    options: [
      'Un bit clásico muy rápido',
      'Una unidad de información que puede ser 0, 1 o ambos a la vez',
      'Un tipo de transistor',
      'Un fotón de color azul',
    ], correctIndex: 1,
    explanation: 'El qubit aprovecha la superposición cuántica para procesar múltiples estados simultáneamente.',
  },
  {
    id: 'quant_3', subject: 'quantum', difficulty: 'easy', xpReward: 15,
    question: '¿Qué fenómeno cuántico permite que una partícula "atraviese" una barrera?',
    options: ['Difracción', 'Efecto túnel', 'Entrelazamiento', 'Superposición'], correctIndex: 1,
    explanation: 'El efecto túnel cuántico permite que partículas pasen barreras que clásicamente serían infranqueables.',
  },
  {
    id: 'quant_4', subject: 'quantum', difficulty: 'hard', xpReward: 40,
    question: '¿Qué experimento demostró la dualidad onda-partícula de la luz?',
    options: ['Experimento Millikan', 'Experimento de la doble rendija', 'Experimento Rutherford', 'Experimento Faraday'], correctIndex: 1,
    explanation: 'La doble rendija mostró que los fotones muestran patrones de interferencia (onda) pero llegan como partículas.',
  },

  // ─── NUCLEAR ───
  {
    id: 'nucl_1', subject: 'nuclear', difficulty: 'easy', xpReward: 15,
    question: '¿Qué partículas forman el núcleo atómico?',
    options: ['Electrones y neutrones', 'Protones y neutrones', 'Protones y electrones', 'Quarks y fotones'], correctIndex: 1,
    explanation: 'El núcleo contiene protones (carga +) y neutrones (sin carga).',
  },
  {
    id: 'nucl_2', subject: 'nuclear', difficulty: 'medium', xpReward: 25,
    question: '¿Qué tipo de radiación tiene mayor poder de penetración?',
    options: ['Radiación alfa (α)', 'Radiación beta (β)', 'Radiación gamma (γ)', 'Todas igual'], correctIndex: 2,
    explanation: 'Los rayos gamma (γ) son ondas electromagnéticas de alta energía y pueden atravesar paredes de hormigón.',
  },
  {
    id: 'nucl_3', subject: 'nuclear', difficulty: 'hard', xpReward: 40,
    question: '¿Qué proceso ocurre en el sol que le da su energía?',
    options: ['Fisión nuclear', 'Fusión nuclear', 'Desintegración alfa', 'Reacción química'], correctIndex: 1,
    explanation: 'El sol fusiona hidrógeno en helio liberando cantidades enormes de energía.',
  },
  {
    id: 'nucl_4', subject: 'nuclear', difficulty: 'medium', xpReward: 25,
    question: '¿Qué es la vida media de un elemento radiactivo?',
    options: [
      'El tiempo que tarda en explotar',
      'El tiempo para que la mitad de los átomos se desintegren',
      'La edad del elemento',
      'Su número atómico dividido entre 2',
    ], correctIndex: 1,
    explanation: 'La vida media (o semivida) es el tiempo necesario para que la mitad de los núcleos radiactivos se transformen.',
  },

  // ─── NEWTONIAN ───
  {
    id: 'newt_1', subject: 'newtonian', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es la fuerza que atrae los objetos hacia la Tierra?',
    options: ['Magnetismo', 'Gravedad', 'Fricción', 'Tensión'], correctIndex: 1,
    explanation: 'La gravedad es la fuerza de atracción entre masas — Newton la describió al ver caer una manzana.',
  },
  {
    id: 'newt_2', subject: 'newtonian', difficulty: 'medium', xpReward: 20,
    question: '¿Qué dice la 2ª ley de Newton?',
    options: [
      'Acción = Reacción',
      'Un objeto en reposo permanece en reposo',
      'F = m × a',
      'La energía no se crea ni se destruye',
    ], correctIndex: 2,
    explanation: 'F = ma: La fuerza es igual a la masa por la aceleración.',
  },
  {
    id: 'newt_3', subject: 'newtonian', difficulty: 'easy', xpReward: 10,
    question: '¿En qué unidades se mide la fuerza en el sistema internacional?',
    options: ['Kilogramos', 'Newtons', 'Joules', 'Watts'], correctIndex: 1,
    explanation: 'La fuerza se mide en Newtons (N), en honor a Isaac Newton.',
  },
  {
    id: 'newt_4', subject: 'newtonian', difficulty: 'hard', xpReward: 35,
    question: '¿Cuál es la aceleración de la gravedad en la superficie terrestre?',
    options: ['5.8 m/s²', '9.8 m/s²', '11.2 m/s²', '3.7 m/s²'], correctIndex: 1,
    explanation: 'g ≈ 9.8 m/s² en la superficie de la Tierra.',
  },
  {
    id: 'newt_5', subject: 'newtonian', difficulty: 'medium', xpReward: 20,
    question: '¿Qué es la inercia?',
    options: [
      'La tendencia de un objeto a resistir cambios en su movimiento',
      'La energía cinética de un objeto',
      'La fricción entre superficies',
      'La fuerza gravitacional',
    ], correctIndex: 0,
    explanation: 'La inercia es la resistencia de un objeto a cambiar su estado de movimiento o reposo.',
  },
];

// ═══════════════════════════════════════════════════════════════════
// ELEMENT QUESTIONS — 118 elements, at least 1 question each
// ═══════════════════════════════════════════════════════════════════

const elementQuestions = [
  // ── 1. Hidrógeno (H) — symbol question
  {
    id: 'chem_h_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Hidrógeno?',
    options: ['H', 'Hy', 'Hi', 'Hd'], correctIndex: 0,
    explanation: 'El Hidrógeno se representa con "H", del latín hydrogenium.',
  },
  // ── 2. Helio (He) — proton question
  {
    id: 'chem_he_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Helio?',
    options: ['1', '2', '3', '4'], correctIndex: 1,
    explanation: 'El Helio tiene número atómico 2, por lo tanto 2 protones.',
  },
  // ── 3. Litio (Li) — symbol question
  {
    id: 'chem_li_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Litio?',
    options: ['Lt', 'Li', 'Lo', 'L'], correctIndex: 1,
    explanation: 'El Litio se representa con "Li".',
  },
  // ── 4. Berilio (Be) — proton question
  {
    id: 'chem_be_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Berilio?',
    options: ['2', '3', '4', '5'], correctIndex: 2,
    explanation: 'El Berilio tiene número atómico 4, por lo tanto 4 protones.',
  },
  // ── 5. Boro (B) — symbol question
  {
    id: 'chem_b_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Boro?',
    options: ['Bo', 'Br', 'B', 'Ba'], correctIndex: 2,
    explanation: 'El Boro se representa con "B".',
  },
  // ── 6. Carbono (C) — proton question
  {
    id: 'chem_c_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el número atómico del Carbono?',
    options: ['4', '5', '6', '7'], correctIndex: 2,
    explanation: 'El Carbono tiene número atómico 6.',
  },
  // ── 7. Nitrógeno (N) — symbol question
  {
    id: 'chem_n_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Nitrógeno?',
    options: ['Ni', 'Nr', 'N', 'Nt'], correctIndex: 2,
    explanation: 'El Nitrógeno se representa con "N".',
  },
  // ── 8. Oxígeno (O) — data question
  {
    id: 'chem_o_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿En qué grupo de la tabla periódica está el Oxígeno?',
    options: ['Grupo 14', 'Grupo 16', 'Grupo 1', 'Grupo 18'], correctIndex: 1,
    explanation: 'El Oxígeno pertenece al grupo 16 (calcógenos).',
  },
  // ── 9. Flúor (F) — symbol question
  {
    id: 'chem_f_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Flúor?',
    options: ['Fl', 'Fr', 'F', 'Fu'], correctIndex: 2,
    explanation: 'El Flúor se representa con "F".',
  },
  // ── 10. Neón (Ne) — proton question
  {
    id: 'chem_ne_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Neón?',
    options: ['8', '9', '10', '11'], correctIndex: 2,
    explanation: 'El Neón tiene número atómico 10.',
  },
  // ── 11. Sodio (Na) — symbol question
  {
    id: 'chem_na_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Sodio?',
    options: ['So', 'Sd', 'Na', 'No'], correctIndex: 2,
    explanation: 'El Sodio se representa con "Na", del latín natrium.',
  },
  // ── 12. Magnesio (Mg) — proton question
  {
    id: 'chem_mg_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Magnesio?',
    options: ['10', '11', '12', '13'], correctIndex: 2,
    explanation: 'El Magnesio tiene número atómico 12.',
  },
  // ── 13. Aluminio (Al) — symbol question
  {
    id: 'chem_al_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Aluminio?',
    options: ['Am', 'Al', 'Au', 'Ag'], correctIndex: 1,
    explanation: 'El Aluminio se representa con "Al".',
  },
  // ── 14. Silicio (Si) — data question
  {
    id: 'chem_si_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿En qué industria es fundamental el Silicio?',
    options: ['Industria textil', 'Electrónica y semiconductores', 'Industria alimentaria', 'Metalurgia del acero'], correctIndex: 1,
    explanation: 'El Silicio es la base de los semiconductores y chips electrónicos.',
  },
  // ── 15. Fósforo (P) — symbol question
  {
    id: 'chem_p_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Fósforo?',
    options: ['Ph', 'Fo', 'P', 'Fs'], correctIndex: 2,
    explanation: 'El Fósforo se representa con "P".',
  },
  // ── 16. Azufre (S) — proton question
  {
    id: 'chem_s_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el número atómico del Azufre?',
    options: ['14', '15', '16', '17'], correctIndex: 2,
    explanation: 'El Azufre tiene número atómico 16.',
  },
  // ── 17. Cloro (Cl) — symbol question
  {
    id: 'chem_cl_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Cloro?',
    options: ['Cr', 'Cl', 'Ch', 'Co'], correctIndex: 1,
    explanation: 'El Cloro se representa con "Cl".',
  },
  // ── 18. Argón (Ar) — proton question
  {
    id: 'chem_ar_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Argón?',
    options: ['16', '17', '18', '19'], correctIndex: 2,
    explanation: 'El Argón tiene número atómico 18.',
  },
  // ── 19. Potasio (K) — symbol question
  {
    id: 'chem_k_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Potasio?',
    options: ['Po', 'Pt', 'K', 'Ka'], correctIndex: 2,
    explanation: 'El Potasio se representa con "K", del latín kalium.',
  },
  // ── 20. Calcio (Ca) — proton question
  {
    id: 'chem_ca_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Calcio?',
    options: ['18', '19', '20', '21'], correctIndex: 2,
    explanation: 'El Calcio tiene número atómico 20.',
  },
  // ── 21. Escandio (Sc) — symbol question
  {
    id: 'chem_sc_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Escandio?',
    options: ['Es', 'Sc', 'Ec', 'Se'], correctIndex: 1,
    explanation: 'El Escandio se representa con "Sc".',
  },
  // ── 22. Titanio (Ti) — data question
  {
    id: 'chem_ti_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Por qué es conocido el Titanio en la industria?',
    options: ['Por su radiactividad', 'Por su gran resistencia y ligereza', 'Por ser buen conductor eléctrico', 'Por su color dorado'], correctIndex: 1,
    explanation: 'El Titanio es un metal muy resistente y ligero, usado en aeronáutica y prótesis médicas.',
  },
  // ── 23. Vanadio (V) — proton question
  {
    id: 'chem_v_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Vanadio?',
    options: ['21', '22', '23', '24'], correctIndex: 2,
    explanation: 'El Vanadio tiene número atómico 23.',
  },
  // ── 24. Cromo (Cr) — symbol question
  {
    id: 'chem_cr_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Cromo?',
    options: ['Ch', 'Cm', 'Cr', 'Co'], correctIndex: 2,
    explanation: 'El Cromo se representa con "Cr".',
  },
  // ── 25. Manganeso (Mn) — proton question
  {
    id: 'chem_mn_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el número atómico del Manganeso?',
    options: ['23', '24', '25', '26'], correctIndex: 2,
    explanation: 'El Manganeso tiene número atómico 25.',
  },
  // ── 26. Hierro (Fe) — symbol question
  {
    id: 'chem_fe_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Hierro?',
    options: ['Hi', 'Hr', 'Fe', 'He'], correctIndex: 2,
    explanation: 'El Hierro se representa con "Fe", del latín ferrum.',
  },
  // ── 27. Cobalto (Co) — data question
  {
    id: 'chem_co_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué isótopo del Cobalto se usa en radioterapia?',
    options: ['Co-55', 'Co-58', 'Co-60', 'Co-63'], correctIndex: 2,
    explanation: 'El Cobalto-60 es un isótopo radiactivo muy usado en tratamientos de cáncer.',
  },
  // ── 28. Níquel (Ni) — proton question
  {
    id: 'chem_ni_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Níquel?',
    options: ['26', '27', '28', '29'], correctIndex: 2,
    explanation: 'El Níquel tiene número atómico 28.',
  },
  // ── 29. Cobre (Cu) — symbol question
  {
    id: 'chem_cu_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Cobre?',
    options: ['Co', 'Cb', 'Cu', 'Cp'], correctIndex: 2,
    explanation: 'El Cobre se representa con "Cu", del latín cuprum.',
  },
  // ── 30. Zinc (Zn) — proton question
  {
    id: 'chem_zn_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Zinc?',
    options: ['28', '29', '30', '31'], correctIndex: 2,
    explanation: 'El Zinc tiene número atómico 30.',
  },
  // ── 31. Galio (Ga) — data question
  {
    id: 'chem_ga_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué propiedad curiosa tiene el Galio?',
    options: ['Es radiactivo', 'Se derrite en la mano (~29.8°C)', 'Brilla en la oscuridad', 'Es magnético'], correctIndex: 1,
    explanation: 'El Galio tiene un punto de fusión de 29.76°C, por lo que se derrite al sostenerlo en la mano.',
  },
  // ── 32. Germanio (Ge) — symbol question
  {
    id: 'chem_ge_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Germanio?',
    options: ['Gm', 'Gr', 'Ge', 'Ga'], correctIndex: 2,
    explanation: 'El Germanio se representa con "Ge".',
  },
  // ── 33. Arsénico (As) — proton question
  {
    id: 'chem_as_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Arsénico?',
    options: ['31', '32', '33', '34'], correctIndex: 2,
    explanation: 'El Arsénico tiene número atómico 33.',
  },
  // ── 34. Selenio (Se) — symbol question
  {
    id: 'chem_se_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Selenio?',
    options: ['Sl', 'Sn', 'Se', 'Si'], correctIndex: 2,
    explanation: 'El Selenio se representa con "Se".',
  },
  // ── 35. Bromo (Br) — data question
  {
    id: 'chem_br_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Cuál es el estado físico del Bromo a temperatura ambiente?',
    options: ['Sólido', 'Líquido', 'Gas', 'Plasma'], correctIndex: 1,
    explanation: 'El Bromo es uno de los pocos elementos que es líquido a temperatura ambiente (junto con el Mercurio).',
  },
  // ── 36. Kriptón (Kr) — proton question
  {
    id: 'chem_kr_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Kriptón?',
    options: ['34', '35', '36', '37'], correctIndex: 2,
    explanation: 'El Kriptón tiene número atómico 36.',
  },
  // ── 37. Rubidio (Rb) — symbol question
  {
    id: 'chem_rb_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Rubidio?',
    options: ['Ru', 'Rd', 'Rb', 'Ri'], correctIndex: 2,
    explanation: 'El Rubidio se representa con "Rb".',
  },
  // ── 38. Estroncio (Sr) — proton question
  {
    id: 'chem_sr_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Estroncio?',
    options: ['36', '37', '38', '39'], correctIndex: 2,
    explanation: 'El Estroncio tiene número atómico 38.',
  },
  // ── 39. Itrio (Y) — symbol question
  {
    id: 'chem_y_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Itrio?',
    options: ['It', 'Yr', 'Y', 'Yi'], correctIndex: 2,
    explanation: 'El Itrio se representa con "Y".',
  },
  // ── 40. Circonio (Zr) — data question
  {
    id: 'chem_zr_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Para qué se usa principalmente el Circonio?',
    options: ['Joyería exclusivamente', 'Revestimiento de barras de combustible nuclear', 'Fabricación de vidrio', 'Colorante alimentario'], correctIndex: 1,
    explanation: 'El Circonio se usa como revestimiento en barras de combustible nuclear por su baja absorción de neutrones.',
  },
  // ── 41. Niobio (Nb) — symbol question
  {
    id: 'chem_nb_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Niobio?',
    options: ['Ni', 'No', 'Nb', 'Nm'], correctIndex: 2,
    explanation: 'El Niobio se representa con "Nb".',
  },
  // ── 42. Molibdeno (Mo) — proton question
  {
    id: 'chem_mo_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Molibdeno?',
    options: ['40', '41', '42', '43'], correctIndex: 2,
    explanation: 'El Molibdeno tiene número atómico 42.',
  },
  // ── 43. Tecnecio (Tc) — data question
  {
    id: 'chem_tc_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué tiene de especial el Tecnecio?',
    options: ['Es el elemento más pesado', 'Fue el primer elemento producido artificialmente', 'Es el más abundante', 'No tiene electrones'], correctIndex: 1,
    explanation: 'El Tecnecio fue el primer elemento sintetizado artificialmente (1937). Su nombre viene del griego "technetos" (artificial).',
  },
  // ── 44. Rutenio (Ru) — symbol question
  {
    id: 'chem_ru_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Rutenio?',
    options: ['Rt', 'Ru', 'Rn', 'Re'], correctIndex: 1,
    explanation: 'El Rutenio se representa con "Ru".',
  },
  // ── 45. Rodio (Rh) — proton question
  {
    id: 'chem_rh_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Rodio?',
    options: ['43', '44', '45', '46'], correctIndex: 2,
    explanation: 'El Rodio tiene número atómico 45.',
  },
  // ── 46. Paladio (Pd) — symbol question
  {
    id: 'chem_pd_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Paladio?',
    options: ['Pa', 'Pl', 'Pd', 'Pm'], correctIndex: 2,
    explanation: 'El Paladio se representa con "Pd".',
  },
  // ── 47. Plata (Ag) — symbol question
  {
    id: 'chem_ag_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo de la Plata?',
    options: ['Pl', 'Pt', 'Ag', 'Ar'], correctIndex: 2,
    explanation: 'La Plata se representa con "Ag", del latín argentum.',
  },
  // ── 48. Cadmio (Cd) — proton question
  {
    id: 'chem_cd_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Cadmio?',
    options: ['46', '47', '48', '49'], correctIndex: 2,
    explanation: 'El Cadmio tiene número atómico 48.',
  },
  // ── 49. Indio (In) — symbol question
  {
    id: 'chem_in_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Indio?',
    options: ['Id', 'Io', 'In', 'Nd'], correctIndex: 2,
    explanation: 'El Indio se representa con "In".',
  },
  // ── 50. Estaño (Sn) — symbol question
  {
    id: 'chem_sn_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Estaño?',
    options: ['Es', 'Et', 'Sn', 'St'], correctIndex: 2,
    explanation: 'El Estaño se representa con "Sn", del latín stannum.',
  },
  // ── 51. Antimonio (Sb) — symbol question
  {
    id: 'chem_sb_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Antimonio?',
    options: ['An', 'Am', 'Sb', 'At'], correctIndex: 2,
    explanation: 'El Antimonio se representa con "Sb", del latín stibium.',
  },
  // ── 52. Telurio (Te) — proton question
  {
    id: 'chem_te_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Telurio?',
    options: ['50', '51', '52', '53'], correctIndex: 2,
    explanation: 'El Telurio tiene número atómico 52.',
  },
  // ── 53. Yodo (I) — data question
  {
    id: 'chem_i_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Para qué es esencial el Yodo en el cuerpo humano?',
    options: ['Formación de huesos', 'Función de la glándula tiroides', 'Producción de glóbulos rojos', 'Digestión de grasas'], correctIndex: 1,
    explanation: 'El Yodo es esencial para la producción de hormonas tiroideas, que regulan el metabolismo.',
  },
  // ── 54. Xenón (Xe) — symbol question
  {
    id: 'chem_xe_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Xenón?',
    options: ['Xn', 'Xo', 'Xe', 'X'], correctIndex: 2,
    explanation: 'El Xenón se representa con "Xe".',
  },
  // ── 55. Cesio (Cs) — data question
  {
    id: 'chem_cs_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué propiedad tiene el Cesio con el agua?',
    options: ['Se disuelve lentamente', 'Reacciona explosivamente', 'No reacciona', 'Se congela'], correctIndex: 1,
    explanation: 'El Cesio reacciona de forma explosiva con el agua. Es uno de los metales alcalinos más reactivos.',
  },
  // ── 56. Bario (Ba) — proton question
  {
    id: 'chem_ba_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Bario?',
    options: ['54', '55', '56', '57'], correctIndex: 2,
    explanation: 'El Bario tiene número atómico 56.',
  },
  // ── 57. Lantano (La) — symbol question
  {
    id: 'chem_la_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Lantano?',
    options: ['Ln', 'Lt', 'La', 'Le'], correctIndex: 2,
    explanation: 'El Lantano se representa con "La".',
  },
  // ── 58. Cerio (Ce) — proton question
  {
    id: 'chem_ce_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Cerio?',
    options: ['56', '57', '58', '59'], correctIndex: 2,
    explanation: 'El Cerio tiene número atómico 58.',
  },
  // ── 59. Praseodimio (Pr) — symbol question
  {
    id: 'chem_pr_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Praseodimio?',
    options: ['Ps', 'Pd', 'Pr', 'Pa'], correctIndex: 2,
    explanation: 'El Praseodimio se representa con "Pr".',
  },
  // ── 60. Neodimio (Nd) — data question
  {
    id: 'chem_nd_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Para qué se usan comúnmente los imanes de Neodimio?',
    options: ['Decoración', 'Son los imanes permanentes más potentes', 'Cocina', 'No tienen uso práctico'], correctIndex: 1,
    explanation: 'Los imanes de Neodimio (NdFeB) son los imanes permanentes más potentes disponibles comercialmente.',
  },
  // ── 61. Prometio (Pm) — data question
  {
    id: 'chem_pm_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué tiene de especial el Prometio entre los lantánidos?',
    options: ['Es el más pesado', 'Es el único radiactivo sin isótopos estables', 'Es un gas', 'Es el más abundante'], correctIndex: 1,
    explanation: 'El Prometio es el único lantánido que no tiene isótopos estables; todos son radiactivos.',
  },
  // ── 62. Samario (Sm) — proton question
  {
    id: 'chem_sm_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Samario?',
    options: ['60', '61', '62', '63'], correctIndex: 2,
    explanation: 'El Samario tiene número atómico 62.',
  },
  // ── 63. Europio (Eu) — symbol question
  {
    id: 'chem_eu_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Europio?',
    options: ['Er', 'Ep', 'Eu', 'Es'], correctIndex: 2,
    explanation: 'El Europio se representa con "Eu", nombrado en honor a Europa.',
  },
  // ── 64. Gadolinio (Gd) — data question
  {
    id: 'chem_gd_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Para qué se usa el Gadolinio en medicina?',
    options: ['Anestesia', 'Agente de contraste en resonancias magnéticas', 'Antibiótico', 'Prótesis dentales'], correctIndex: 1,
    explanation: 'El Gadolinio se usa como agente de contraste en resonancias magnéticas (MRI) por sus propiedades paramagnéticas.',
  },
  // ── 65. Terbio (Tb) — proton question
  {
    id: 'chem_tb_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Terbio?',
    options: ['63', '64', '65', '66'], correctIndex: 2,
    explanation: 'El Terbio tiene número atómico 65.',
  },
  // ── 66. Disprosio (Dy) — symbol question
  {
    id: 'chem_dy_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Disprosio?',
    options: ['Di', 'Ds', 'Dy', 'Dp'], correctIndex: 2,
    explanation: 'El Disprosio se representa con "Dy".',
  },
  // ── 67. Holmio (Ho) — proton question
  {
    id: 'chem_ho_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Holmio?',
    options: ['65', '66', '67', '68'], correctIndex: 2,
    explanation: 'El Holmio tiene número atómico 67.',
  },
  // ── 68. Erbio (Er) — symbol question
  {
    id: 'chem_er_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Erbio?',
    options: ['Eb', 'Ei', 'Er', 'Em'], correctIndex: 2,
    explanation: 'El Erbio se representa con "Er".',
  },
  // ── 69. Tulio (Tm) — proton question
  {
    id: 'chem_tm_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Tulio?',
    options: ['67', '68', '69', '70'], correctIndex: 2,
    explanation: 'El Tulio tiene número atómico 69.',
  },
  // ── 70. Iterbio (Yb) — symbol question
  {
    id: 'chem_yb_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Iterbio?',
    options: ['Ib', 'It', 'Yb', 'Yt'], correctIndex: 2,
    explanation: 'El Iterbio se representa con "Yb".',
  },
  // ── 71. Lutecio (Lu) — proton question
  {
    id: 'chem_lu_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Lutecio?',
    options: ['69', '70', '71', '72'], correctIndex: 2,
    explanation: 'El Lutecio tiene número atómico 71.',
  },
  // ── 72. Hafnio (Hf) — symbol question
  {
    id: 'chem_hf_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Hafnio?',
    options: ['Ha', 'Hn', 'Hf', 'Hm'], correctIndex: 2,
    explanation: 'El Hafnio se representa con "Hf".',
  },
  // ── 73. Tántalo (Ta) — data question
  {
    id: 'chem_ta_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿En qué dispositivos electrónicos se usa el Tántalo?',
    options: ['Bombillas', 'Condensadores de teléfonos móviles', 'Cables de fibra óptica', 'Paneles solares'], correctIndex: 1,
    explanation: 'El Tántalo se usa en condensadores electrolíticos presentes en teléfonos móviles y ordenadores.',
  },
  // ── 74. Tungsteno (W) — symbol question
  {
    id: 'chem_w_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Tungsteno?',
    options: ['Tu', 'Tn', 'W', 'Tg'], correctIndex: 2,
    explanation: 'El Tungsteno se representa con "W", del alemán Wolfram.',
  },
  // ── 75. Renio (Re) — proton question
  {
    id: 'chem_re_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Renio?',
    options: ['73', '74', '75', '76'], correctIndex: 2,
    explanation: 'El Renio tiene número atómico 75.',
  },
  // ── 76. Osmio (Os) — data question
  {
    id: 'chem_os_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué récord tiene el Osmio entre los elementos?',
    options: ['Es el más ligero', 'Es el más denso', 'Es el más radiactivo', 'Tiene el punto de fusión más alto'], correctIndex: 1,
    explanation: 'El Osmio es el elemento más denso conocido, con una densidad de 22.59 g/cm³.',
  },
  // ── 77. Iridio (Ir) — symbol question
  {
    id: 'chem_ir_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Iridio?',
    options: ['Id', 'Ir', 'Ii', 'Im'], correctIndex: 1,
    explanation: 'El Iridio se representa con "Ir".',
  },
  // ── 78. Platino (Pt) — proton question
  {
    id: 'chem_pt_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Platino?',
    options: ['76', '77', '78', '79'], correctIndex: 2,
    explanation: 'El Platino tiene número atómico 78.',
  },
  // ── 79. Oro (Au) — symbol question
  {
    id: 'chem_au_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Oro?',
    options: ['Or', 'Go', 'Au', 'Ao'], correctIndex: 2,
    explanation: 'El Oro se representa con "Au", del latín aurum.',
  },
  // ── 80. Mercurio (Hg) — symbol question
  {
    id: 'chem_hg_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Mercurio?',
    options: ['Me', 'Mr', 'Hg', 'Mc'], correctIndex: 2,
    explanation: 'El Mercurio se representa con "Hg", del latín hydrargyrum.',
  },
  // ── 81. Talio (Tl) — proton question
  {
    id: 'chem_tl_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Talio?',
    options: ['79', '80', '81', '82'], correctIndex: 2,
    explanation: 'El Talio tiene número atómico 81.',
  },
  // ── 82. Plomo (Pb) — symbol question
  {
    id: 'chem_pb_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Plomo?',
    options: ['Pl', 'Po', 'Pb', 'Pm'], correctIndex: 2,
    explanation: 'El Plomo se representa con "Pb", del latín plumbum.',
  },
  // ── 83. Bismuto (Bi) — data question
  {
    id: 'chem_bi_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué característica visual tienen los cristales de Bismuto?',
    options: ['Son transparentes', 'Forman escalones cuadrados con colores iridiscentes', 'Son siempre negros', 'Son microscópicos'], correctIndex: 1,
    explanation: 'Los cristales de Bismuto forman estructuras en escalera con una fina capa de óxido que produce colores iridiscentes.',
  },
  // ── 84. Polonio (Po) — proton question
  {
    id: 'chem_po_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Polonio?',
    options: ['82', '83', '84', '85'], correctIndex: 2,
    explanation: 'El Polonio tiene número atómico 84. Fue descubierto por Marie Curie.',
  },
  // ── 85. Astato (At) — data question
  {
    id: 'chem_at_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Por qué es tan raro el Astato?',
    options: ['Es artificial', 'Es el elemento natural más escaso de la corteza terrestre', 'Solo existe en el sol', 'Se inventó en 2020'], correctIndex: 1,
    explanation: 'El Astato es el elemento natural más escaso. Se estima que hay menos de 30 gramos en toda la corteza terrestre.',
  },
  // ── 86. Radón (Rn) — symbol question
  {
    id: 'chem_rn_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Radón?',
    options: ['Ra', 'Rd', 'Rn', 'Ro'], correctIndex: 2,
    explanation: 'El Radón se representa con "Rn".',
  },
  // ── 87. Francio (Fr) — data question
  {
    id: 'chem_fr_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué hace especial al Francio entre los metales alcalinos?',
    options: ['Es el más estable', 'Es el más reactivo y radiactivo de todos', 'Es el único sólido', 'No reacciona con agua'], correctIndex: 1,
    explanation: 'El Francio es el metal alcalino más pesado y el más inestable; su isótopo más estable tiene una vida media de solo 22 minutos.',
  },
  // ── 88. Radio (Ra) — proton question
  {
    id: 'chem_ra_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Radio?',
    options: ['86', '87', '88', '89'], correctIndex: 2,
    explanation: 'El Radio tiene número atómico 88. Fue descubierto por los Curie.',
  },
  // ── 89. Actinio (Ac) — symbol question
  {
    id: 'chem_ac_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Actinio?',
    options: ['At', 'An', 'Ac', 'Ai'], correctIndex: 2,
    explanation: 'El Actinio se representa con "Ac".',
  },
  // ── 90. Torio (Th) — data question
  {
    id: 'chem_th_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Por qué se investiga el Torio como combustible nuclear?',
    options: ['Es más barato que el petróleo', 'Es más abundante que el Uranio y genera menos residuos', 'Es completamente seguro', 'No es radiactivo'], correctIndex: 1,
    explanation: 'El Torio es 3 veces más abundante que el Uranio y los reactores de Torio producen menos residuos radiactivos de larga vida.',
  },
  // ── 91. Protactinio (Pa) — proton question
  {
    id: 'chem_pa_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Protactinio?',
    options: ['89', '90', '91', '92'], correctIndex: 2,
    explanation: 'El Protactinio tiene número atómico 91.',
  },
  // ── 92. Uranio (U) — data question
  {
    id: 'chem_u_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué isótopo del Uranio se usa como combustible en reactores nucleares?',
    options: ['U-234', 'U-235', 'U-236', 'U-238'], correctIndex: 1,
    explanation: 'El U-235 es el isótopo fisionable usado como combustible nuclear. Solo representa el 0.7% del Uranio natural.',
  },
  // ── 93. Neptunio (Np) — symbol question
  {
    id: 'chem_np_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Neptunio?',
    options: ['Ne', 'Nt', 'Np', 'Nu'], correctIndex: 2,
    explanation: 'El Neptunio se representa con "Np", nombrado por el planeta Neptuno.',
  },
  // ── 94. Plutonio (Pu) — data question
  {
    id: 'chem_pu_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué isótopo de Plutonio se usó en la bomba de Nagasaki?',
    options: ['Pu-238', 'Pu-239', 'Pu-240', 'Pu-244'], correctIndex: 1,
    explanation: 'El Pu-239 fue usado en la bomba "Fat Man" lanzada sobre Nagasaki en 1945.',
  },
  // ── 95. Americio (Am) — data question
  {
    id: 'chem_am_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Dónde se encuentra comúnmente el Americio en la vida diaria?',
    options: ['Baterías', 'Detectores de humo', 'Bombillas LED', 'Relojes digitales'], correctIndex: 1,
    explanation: 'El Am-241 se usa en detectores de humo ionizantes, presentes en muchos hogares.',
  },
  // ── 96. Curio (Cm) — symbol question
  {
    id: 'chem_cm_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Curio?',
    options: ['Cu', 'Cr', 'Cm', 'Ci'], correctIndex: 2,
    explanation: 'El Curio se representa con "Cm", nombrado en honor a Marie y Pierre Curie.',
  },
  // ── 97. Berkelio (Bk) — proton question
  {
    id: 'chem_bk_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Berkelio?',
    options: ['95', '96', '97', '98'], correctIndex: 2,
    explanation: 'El Berkelio tiene número atómico 97. Nombrado por la ciudad de Berkeley, California.',
  },
  // ── 98. Californio (Cf) — data question
  {
    id: 'chem_cf_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Para qué se usa principalmente el Californio-252?',
    options: ['Joyería', 'Como fuente de neutrones para detectar oro y petróleo', 'Colorante', 'Alimentación'], correctIndex: 1,
    explanation: 'El Cf-252 es una potente fuente de neutrones usada en análisis de minerales y detección de petróleo.',
  },
  // ── 99. Einstenio (Es) — symbol question
  {
    id: 'chem_es_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Einstenio?',
    options: ['Ei', 'En', 'Es', 'Et'], correctIndex: 2,
    explanation: 'El Einstenio se representa con "Es", nombrado en honor a Albert Einstein.',
  },
  // ── 100. Fermio (Fm) — proton question
  {
    id: 'chem_fm_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Fermio?',
    options: ['98', '99', '100', '101'], correctIndex: 2,
    explanation: 'El Fermio tiene número atómico 100. Nombrado por Enrico Fermi.',
  },
  // ── 101. Mendelevio (Md) — symbol question
  {
    id: 'chem_md_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Mendelevio?',
    options: ['Me', 'Mn', 'Md', 'Mv'], correctIndex: 2,
    explanation: 'El Mendelevio se representa con "Md", nombrado por Dmitri Mendeléyev.',
  },
  // ── 102. Nobelio (No) — proton question
  {
    id: 'chem_no_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Nobelio?',
    options: ['100', '101', '102', '103'], correctIndex: 2,
    explanation: 'El Nobelio tiene número atómico 102. Nombrado por Alfred Nobel.',
  },
  // ── 103. Lawrencio (Lr) — symbol question
  {
    id: 'chem_lr_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Lawrencio?',
    options: ['Lw', 'La', 'Lr', 'Le'], correctIndex: 2,
    explanation: 'El Lawrencio se representa con "Lr", nombrado por Ernest Lawrence.',
  },
  // ── 104. Rutherfordio (Rf) — data question
  {
    id: 'chem_rf_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿En honor a quién se nombró el Rutherfordio?',
    options: ['Benjamin Franklin', 'Ernest Rutherford', 'Michael Faraday', 'Niels Bohr'], correctIndex: 1,
    explanation: 'El Rutherfordio (Rf) fue nombrado en honor a Ernest Rutherford, padre de la física nuclear.',
  },
  // ── 105. Dubnio (Db) — proton question
  {
    id: 'chem_db_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Dubnio?',
    options: ['103', '104', '105', '106'], correctIndex: 2,
    explanation: 'El Dubnio tiene número atómico 105. Nombrado por la ciudad de Dubná, Rusia.',
  },
  // ── 106. Seaborgio (Sg) — symbol question
  {
    id: 'chem_sg_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Seaborgio?',
    options: ['Se', 'Sb', 'Sg', 'Sr'], correctIndex: 2,
    explanation: 'El Seaborgio se representa con "Sg", nombrado por Glenn T. Seaborg.',
  },
  // ── 107. Bohrio (Bh) — proton question
  {
    id: 'chem_bh_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Bohrio?',
    options: ['105', '106', '107', '108'], correctIndex: 2,
    explanation: 'El Bohrio tiene número atómico 107. Nombrado por Niels Bohr.',
  },
  // ── 108. Hasio (Hs) — symbol question
  {
    id: 'chem_hs_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Hasio?',
    options: ['Ha', 'He', 'Hs', 'Hi'], correctIndex: 2,
    explanation: 'El Hasio se representa con "Hs", nombrado por el estado de Hesse, Alemania.',
  },
  // ── 109. Meitnerio (Mt) — data question
  {
    id: 'chem_mt_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿En honor a quién se nombró el Meitnerio?',
    options: ['Marie Curie', 'Lise Meitner', 'Rosalind Franklin', 'Emmy Noether'], correctIndex: 1,
    explanation: 'El Meitnerio fue nombrado en honor a Lise Meitner, pionera en el estudio de la fisión nuclear.',
  },
  // ── 110. Darmstadtio (Ds) — proton question
  {
    id: 'chem_ds_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Darmstadtio?',
    options: ['108', '109', '110', '111'], correctIndex: 2,
    explanation: 'El Darmstadtio tiene número atómico 110.',
  },
  // ── 111. Roentgenio (Rg) — symbol question
  {
    id: 'chem_rg_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Roentgenio?',
    options: ['Ro', 'Rt', 'Rg', 'Re'], correctIndex: 2,
    explanation: 'El Roentgenio se representa con "Rg", nombrado por Wilhelm Röntgen, descubridor de los rayos X.',
  },
  // ── 112. Copernicio (Cn) — proton question
  {
    id: 'chem_cn_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Copernicio?',
    options: ['110', '111', '112', '113'], correctIndex: 2,
    explanation: 'El Copernicio tiene número atómico 112. Nombrado por Nicolás Copérnico.',
  },
  // ── 113. Nihonio (Nh) — symbol question
  {
    id: 'chem_nh_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Nihonio?',
    options: ['Ni', 'Nn', 'Nh', 'No'], correctIndex: 2,
    explanation: 'El Nihonio se representa con "Nh", derivado de "Nihon" (Japón en japonés).',
  },
  // ── 114. Flerovio (Fl) — data question
  {
    id: 'chem_fl_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿En qué laboratorio se sintetizó el Flerovio?',
    options: ['CERN', 'Instituto de Investigación Nuclear de Dubná', 'Los Álamos', 'Fermilab'], correctIndex: 1,
    explanation: 'El Flerovio fue sintetizado en el Instituto de Investigación Nuclear de Dubná, Rusia, y nombrado por Gueorgui Fliórov.',
  },
  // ── 115. Moscovio (Mc) — proton question
  {
    id: 'chem_mc_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Moscovio?',
    options: ['113', '114', '115', '116'], correctIndex: 2,
    explanation: 'El Moscovio tiene número atómico 115. Nombrado por la región de Moscú.',
  },
  // ── 116. Livermorio (Lv) — symbol question
  {
    id: 'chem_lv_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuál es el símbolo del Livermorio?',
    options: ['Li', 'Lr', 'Lv', 'Le'], correctIndex: 2,
    explanation: 'El Livermorio se representa con "Lv", nombrado por el Laboratorio Nacional Lawrence Livermore.',
  },
  // ── 117. Teneso (Ts) — proton question
  {
    id: 'chem_ts_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
    question: '¿Cuántos protones tiene el Teneso?',
    options: ['115', '116', '117', '118'], correctIndex: 2,
    explanation: 'El Teneso tiene número atómico 117. Nombrado por Tennessee, EE.UU.',
  },
  // ── 118. Oganesón (Og) — data question
  {
    id: 'chem_og_1', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué tiene de especial el Oganesón (Og) en la tabla periódica?',
    options: ['Es el elemento más ligero', 'Es el elemento con mayor número atómico confirmado (118)', 'Es un metal alcalino', 'Fue descubierto en 1800'], correctIndex: 1,
    explanation: 'El Oganesón (Z=118) es el elemento más pesado confirmado. Fue nombrado en honor al físico Yuri Oganesián.',
  },

  // ═══════════════════════════════════════════════════════════════
  // BONUS: More varied questions about elements (trivia / medium-hard)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'chem_elem_bonus_1', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Cuál es el elemento con número atómico 79?',
    options: ['Platino', 'Plomo', 'Oro', 'Plata'], correctIndex: 2,
    explanation: 'El Oro (Au) tiene número atómico 79.',
  },
  {
    id: 'chem_elem_bonus_2', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué elemento es el más abundante en la corteza terrestre?',
    options: ['Silicio', 'Aluminio', 'Oxígeno', 'Hierro'], correctIndex: 2,
    explanation: 'El Oxígeno constituye aproximadamente el 46% de la masa de la corteza terrestre.',
  },
  {
    id: 'chem_elem_bonus_3', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué metal precioso tiene el número atómico 47?',
    options: ['Oro', 'Platino', 'Plata', 'Paladio'], correctIndex: 2,
    explanation: 'La Plata (Ag) tiene número atómico 47.',
  },
  {
    id: 'chem_elem_bonus_4', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Qué elemento tiene el punto de fusión más alto?',
    options: ['Hierro', 'Tungsteno', 'Osmio', 'Carbono'], correctIndex: 1,
    explanation: 'El Tungsteno (W) tiene el punto de fusión más alto de todos los metales: 3422°C.',
  },
  {
    id: 'chem_elem_bonus_5', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué elemento es el más abundante en el universo?',
    options: ['Helio', 'Oxígeno', 'Carbono', 'Hidrógeno'], correctIndex: 3,
    explanation: 'El Hidrógeno constituye aproximadamente el 75% de la masa bariónica del universo.',
  },
  {
    id: 'chem_elem_bonus_6', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Cuál es el único metal que es líquido a temperatura ambiente (además del Mercurio)?',
    options: ['Galio', 'Cesio', 'Francio', 'Bromo'], correctIndex: 0,
    explanation: 'Aunque el Galio se solidifica justo por debajo de 30°C, junto con el Mercurio, el Cesio y Francio también tienen puntos de fusión bajos. El Bromo es un no-metal líquido.',
  },
  {
    id: 'chem_elem_bonus_7', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué gas noble se usa en letreros luminosos de color rojo-anaranjado?',
    options: ['Helio', 'Argón', 'Neón', 'Kriptón'], correctIndex: 2,
    explanation: 'El Neón produce su característico brillo rojo-anaranjado cuando se ioniza en tubos de descarga.',
  },
  {
    id: 'chem_elem_bonus_8', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
    question: '¿Cuál es la configuración electrónica del Helio?',
    options: ['1s¹', '1s²', '1s² 2s¹', '2s²'], correctIndex: 1,
    explanation: 'El Helio tiene configuración 1s²: dos electrones en el orbital 1s, completando la primera capa.',
  },
  {
    id: 'chem_elem_bonus_9', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué elemento da color verde a los fuegos artificiales?',
    options: ['Sodio', 'Estroncio', 'Bario', 'Cobre'], correctIndex: 2,
    explanation: 'Las sales de Bario producen un color verde intenso en los fuegos artificiales.',
  },
  {
    id: 'chem_elem_bonus_10', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
    question: '¿Qué elemento da color rojo a los fuegos artificiales?',
    options: ['Bario', 'Estroncio', 'Litio', 'Sodio'], correctIndex: 1,
    explanation: 'Las sales de Estroncio producen un color rojo brillante en los fuegos artificiales.',
  },
];

// ═══════════════════════════════════════════════════════════════════

const allQuestions = [...originalQuestions, ...elementQuestions];

// ─── SEED ────────────────────────────────────────────────────────

async function deleteCollection(ref) {
  const snap = await ref.get();
  if (snap.empty) return 0;
  const batch = db.batch();
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
  return snap.size;
}

async function seed() {
  console.log('🗑️  Borrando preguntas existentes...');
  const col = db.collection('questions');

  // Delete in batches (Firestore batch limit is 500)
  let totalDeleted = 0;
  let deleted;
  do {
    const snap = await col.limit(500).get();
    if (snap.empty) break;
    const batch = db.batch();
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    deleted = snap.size;
    totalDeleted += deleted;
  } while (deleted === 500);
  console.log(`   Eliminadas ${totalDeleted} preguntas anteriores.`);

  console.log(`📝 Insertando ${allQuestions.length} preguntas...`);

  // Insert in batches of 500
  for (let i = 0; i < allQuestions.length; i += 500) {
    const batch = db.batch();
    const chunk = allQuestions.slice(i, i + 500);
    for (const q of chunk) {
      const { id, ...data } = q;
      batch.set(col.doc(id), data);
    }
    await batch.commit();
    console.log(`   Batch ${Math.floor(i / 500) + 1}: ${chunk.length} preguntas insertadas.`);
  }

  // Count by subject
  const counts = {};
  for (const q of allQuestions) {
    counts[q.subject] = (counts[q.subject] || 0) + 1;
  }

  console.log('\n✅ Seed completado:');
  console.log(`   Total: ${allQuestions.length} preguntas`);
  for (const [subj, count] of Object.entries(counts)) {
    console.log(`   ${subj}: ${count}`);
  }
}

seed().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
