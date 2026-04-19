import { Injectable } from '@angular/core';
import { QuizQuestion, Subject, Difficulty } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {

  private questions: QuizQuestion[] = [
    // ─── CHEMISTRY ───────────────────────────────────────────────
    {
      id: 'chem_1', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
      question: '¿Cuántos protones tiene el Hidrógeno (H)?',
      options: ['0', '1', '2', '3'],
      correctIndex: 1,
      explanation: 'El Hidrógeno tiene 1 protón — es el elemento más simple del universo.',
    },
    {
      id: 'chem_2', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
      question: '¿Cuál es el símbolo del Oxígeno?',
      options: ['O', 'Ox', 'On', 'Or'],
      correctIndex: 0,
      explanation: 'El Oxígeno se representa con la letra "O".',
    },
    {
      id: 'chem_3', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
      question: '¿Qué elemento tiene número atómico 6?',
      options: ['Nitrógeno', 'Carbono', 'Boro', 'Berilio'],
      correctIndex: 1,
      explanation: 'El Carbono (C) tiene 6 protones — es la base de la vida.',
    },
    {
      id: 'chem_4', subject: 'chemistry', difficulty: 'medium', xpReward: 20,
      question: '¿Cuántos electrones tiene el Sodio (Na) en su estado neutro?',
      options: ['10', '11', '12', '23'],
      correctIndex: 1,
      explanation: 'El Sodio tiene número atómico 11, por lo tanto 11 electrones.',
    },
    {
      id: 'chem_5', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
      question: '¿Qué gas noble tiene 36 protones?',
      options: ['Argón', 'Neón', 'Kriptón', 'Xenón'],
      correctIndex: 2,
      explanation: 'El Kriptón (Kr) tiene número atómico 36.',
    },
    {
      id: 'chem_6', subject: 'chemistry', difficulty: 'easy', xpReward: 10,
      question: '¿En qué estado físico se encuentra el agua a temperatura ambiente?',
      options: ['Sólido', 'Líquido', 'Gas', 'Plasma'],
      correctIndex: 1,
      explanation: 'A ~20°C el agua es líquida.',
    },
    {
      id: 'chem_7', subject: 'chemistry', difficulty: 'hard', xpReward: 35,
      question: '¿Cuál es la fórmula del ácido sulfúrico?',
      options: ['HCl', 'H₂SO₄', 'H₂O₂', 'HNO₃'],
      correctIndex: 1,
      explanation: 'El ácido sulfúrico es H₂SO₄ — muy corrosivo.',
    },

    // ─── QUANTUM ─────────────────────────────────────────────────
    {
      id: 'quant_1', subject: 'quantum', difficulty: 'easy', xpReward: 15,
      question: '¿Qué describe el principio de Heisenberg?',
      options: [
        'La velocidad de la luz es constante',
        'No podemos saber a la vez posición y velocidad exactas de una partícula',
        'La energía se conserva',
        'Los electrones orbitan el núcleo',
      ],
      correctIndex: 1,
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
      ],
      correctIndex: 1,
      explanation: 'El qubit aprovecha la superposición cuántica para procesar múltiples estados simultáneamente.',
    },
    {
      id: 'quant_3', subject: 'quantum', difficulty: 'easy', xpReward: 15,
      question: '¿Qué fenómeno cuántico permite que una partícula "atraviese" una barrera?',
      options: ['Difracción', 'Efecto túnel', 'Entrelazamiento', 'Superposición'],
      correctIndex: 1,
      explanation: 'El efecto túnel cuántico permite que partículas pasen barreras que clásicamente serían infranqueables.',
    },
    {
      id: 'quant_4', subject: 'quantum', difficulty: 'hard', xpReward: 40,
      question: '¿Qué experimento demostró la dualidad onda-partícula de la luz?',
      options: ['Experimento Millikan', 'Experimento de la doble rendija', 'Experimento Rutherford', 'Experimento Faraday'],
      correctIndex: 1,
      explanation: 'La doble rendija mostró que los fotones muestran patrones de interferencia (onda) pero llegan como partículas.',
    },

    // ─── NUCLEAR ─────────────────────────────────────────────────
    {
      id: 'nucl_1', subject: 'nuclear', difficulty: 'easy', xpReward: 15,
      question: '¿Qué partículas forman el núcleo atómico?',
      options: ['Electrones y neutrones', 'Protones y neutrones', 'Protones y electrones', 'Quarks y fotones'],
      correctIndex: 1,
      explanation: 'El núcleo contiene protones (carga +) y neutrones (sin carga).',
    },
    {
      id: 'nucl_2', subject: 'nuclear', difficulty: 'medium', xpReward: 25,
      question: '¿Qué tipo de radiación tiene mayor poder de penetración?',
      options: ['Radiación alfa (α)', 'Radiación beta (β)', 'Radiación gamma (γ)', 'Todas igual'],
      correctIndex: 2,
      explanation: 'Los rayos gamma (γ) son ondas electromagnéticas de alta energía y pueden atravesar paredes de hormigón.',
    },
    {
      id: 'nucl_3', subject: 'nuclear', difficulty: 'hard', xpReward: 40,
      question: '¿Qué proceso ocurre en el sol que le da su energía?',
      options: ['Fisión nuclear', 'Fusión nuclear', 'Desintegración alfa', 'Reacción química'],
      correctIndex: 1,
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
      ],
      correctIndex: 1,
      explanation: 'La vida media (o semivida) es el tiempo necesario para que la mitad de los núcleos radiactivos se transformen.',
    },

    // ─── NEWTONIAN ───────────────────────────────────────────────
    {
      id: 'newt_1', subject: 'newtonian', difficulty: 'easy', xpReward: 10,
      question: '¿Cuál es la fuerza que atrae los objetos hacia la Tierra?',
      options: ['Magnetismo', 'Gravedad', 'Fricción', 'Tensión'],
      correctIndex: 1,
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
      ],
      correctIndex: 2,
      explanation: 'F = ma: La fuerza es igual a la masa por la aceleración.',
    },
    {
      id: 'newt_3', subject: 'newtonian', difficulty: 'easy', xpReward: 10,
      question: '¿En qué unidades se mide la fuerza en el sistema internacional?',
      options: ['Kilogramos', 'Newtons', 'Joules', 'Watts'],
      correctIndex: 1,
      explanation: 'La fuerza se mide en Newtons (N), en honor a Isaac Newton.',
    },
    {
      id: 'newt_4', subject: 'newtonian', difficulty: 'hard', xpReward: 35,
      question: '¿Cuál es la aceleración de la gravedad en la superficie terrestre?',
      options: ['5.8 m/s²', '9.8 m/s²', '11.2 m/s²', '3.7 m/s²'],
      correctIndex: 1,
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
      ],
      correctIndex: 0,
      explanation: 'La inercia es la resistencia de un objeto a cambiar su estado de movimiento o reposo.',
    },
  ];

  getQuestions(subject: Subject, difficulty?: Difficulty, count = 10): QuizQuestion[] {
    let pool = this.questions.filter(q => q.subject === subject);
    if (difficulty) pool = pool.filter(q => q.difficulty === difficulty);
    return this.shuffle(pool).slice(0, count);
  }

  getAllSubjectQuestions(subject: Subject): QuizQuestion[] {
    return this.shuffle(this.questions.filter(q => q.subject === subject));
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
