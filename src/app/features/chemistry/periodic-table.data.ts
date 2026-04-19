export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  category: string;
  group: number;
  period: number;
  color: string;
  description: string;
  funFact: string;
}

export const ELEMENTS: Element[] = [
  { symbol: 'H',  name: 'Hidrógeno', atomicNumber: 1,  atomicMass: 1.008,   category: 'nonmetal',        group: 1,  period: 1, color: '#6ee7f7', description: 'El elemento más abundante del universo.', funFact: '¡El sol está hecho principalmente de hidrógeno!' },
  { symbol: 'He', name: 'Helio',     atomicNumber: 2,  atomicMass: 4.003,   category: 'noble-gas',       group: 18, period: 1, color: '#c4b5fd', description: 'Gas noble inerte, más ligero que el aire.', funFact: '¡Los globos de helio flotan porque pesa menos que el aire!' },
  { symbol: 'Li', name: 'Litio',     atomicNumber: 3,  atomicMass: 6.941,   category: 'alkali-metal',    group: 1,  period: 2, color: '#fca5a5', description: 'Metal alcalino suave.', funFact: '¡Tu móvil usa baterías de litio!' },
  { symbol: 'Be', name: 'Berilio',   atomicNumber: 4,  atomicMass: 9.012,   category: 'alkaline-earth',  group: 2,  period: 2, color: '#fcd34d', description: 'Metal ligero y resistente.', funFact: '¡Las esmeraldas contienen berilio!' },
  { symbol: 'B',  name: 'Boro',      atomicNumber: 5,  atomicMass: 10.811,  category: 'metalloid',       group: 13, period: 2, color: '#6ee7b7', description: 'Metaloide usado en semiconductores.', funFact: '¡El bórax, usado para limpiar, contiene boro!' },
  { symbol: 'C',  name: 'Carbono',   atomicNumber: 6,  atomicMass: 12.011,  category: 'nonmetal',        group: 14, period: 2, color: '#6ee7f7', description: 'Base de toda la vida en la Tierra.', funFact: '¡Los diamantes y el grafito son ambos carbono puro!' },
  { symbol: 'N',  name: 'Nitrógeno', atomicNumber: 7,  atomicMass: 14.007,  category: 'nonmetal',        group: 15, period: 2, color: '#6ee7f7', description: '78% del aire que respiramos.', funFact: '¡El nitrógeno líquido congela las cosas al instante!' },
  { symbol: 'O',  name: 'Oxígeno',   atomicNumber: 8,  atomicMass: 15.999,  category: 'nonmetal',        group: 16, period: 2, color: '#6ee7f7', description: 'Esencial para la respiración.', funFact: '¡El oxígeno líquido es de color azul pálido!' },
  { symbol: 'F',  name: 'Flúor',     atomicNumber: 9,  atomicMass: 18.998,  category: 'halogen',         group: 17, period: 2, color: '#86efac', description: 'El elemento más electronegativo.', funFact: '¡Tu pasta de dientes contiene flúor!' },
  { symbol: 'Ne', name: 'Neón',      atomicNumber: 10, atomicMass: 20.180,  category: 'noble-gas',       group: 18, period: 2, color: '#c4b5fd', description: 'Gas noble que brilla naranja-rojo.', funFact: '¡Los letreros de neón usan este gas!' },
  { symbol: 'Na', name: 'Sodio',     atomicNumber: 11, atomicMass: 22.990,  category: 'alkali-metal',    group: 1,  period: 3, color: '#fca5a5', description: 'Metal alcalino reactivo con el agua.', funFact: '¡La sal de mesa es cloruro de sodio (NaCl)!' },
  { symbol: 'Mg', name: 'Magnesio',  atomicNumber: 12, atomicMass: 24.305,  category: 'alkaline-earth',  group: 2,  period: 3, color: '#fcd34d', description: 'Metal ligero esencial para plantas.', funFact: '¡La clorofila (verde de las plantas) contiene magnesio!' },
  { symbol: 'Al', name: 'Aluminio',  atomicNumber: 13, atomicMass: 26.982,  category: 'post-transition', group: 13, period: 3, color: '#a5b4fc', description: 'Metal ligero muy usado en la vida diaria.', funFact: '¡Las latas de refresco son de aluminio!' },
  { symbol: 'Si', name: 'Silicio',   atomicNumber: 14, atomicMass: 28.086,  category: 'metalloid',       group: 14, period: 3, color: '#6ee7b7', description: 'Base de los semiconductores modernos.', funFact: '¡Silicon Valley se llama así por el silicio de los chips!' },
  { symbol: 'P',  name: 'Fósforo',   atomicNumber: 15, atomicMass: 30.974,  category: 'nonmetal',        group: 15, period: 3, color: '#6ee7f7', description: 'Esencial para el ADN y los huesos.', funFact: '¡Los cerillas usan fósforo rojo!' },
  { symbol: 'S',  name: 'Azufre',    atomicNumber: 16, atomicMass: 32.065,  category: 'nonmetal',        group: 16, period: 3, color: '#6ee7f7', description: 'Elemento amarillo con olor a huevos podridos.', funFact: '¡Los volcanes liberan azufre!' },
  { symbol: 'Cl', name: 'Cloro',     atomicNumber: 17, atomicMass: 35.453,  category: 'halogen',         group: 17, period: 3, color: '#86efac', description: 'Gas verde-amarillento usado para desinfectar.', funFact: '¡Se usa para desinfectar el agua de las piscinas!' },
  { symbol: 'Ar', name: 'Argón',     atomicNumber: 18, atomicMass: 39.948,  category: 'noble-gas',       group: 18, period: 3, color: '#c4b5fd', description: 'Gas noble, 1% del aire.', funFact: '¡Las bombillas de luz incandescente se llenan con argón!' },
  { symbol: 'K',  name: 'Potasio',   atomicNumber: 19, atomicMass: 39.098,  category: 'alkali-metal',    group: 1,  period: 4, color: '#fca5a5', description: 'Metal alcalino esencial para el cuerpo.', funFact: '¡Los plátanos son ricos en potasio!' },
  { symbol: 'Ca', name: 'Calcio',    atomicNumber: 20, atomicMass: 40.078,  category: 'alkaline-earth',  group: 2,  period: 4, color: '#fcd34d', description: 'Esencial para huesos y dientes.', funFact: '¡Tus huesos son principalmente fosfato de calcio!' },
  { symbol: 'Fe', name: 'Hierro',    atomicNumber: 26, atomicMass: 55.845,  category: 'transition',      group: 8,  period: 4, color: '#fb923c', description: 'El metal más usado en la Tierra.', funFact: '¡El núcleo de la Tierra es principalmente hierro!' },
  { symbol: 'Cu', name: 'Cobre',     atomicNumber: 29, atomicMass: 63.546,  category: 'transition',      group: 11, period: 4, color: '#fb923c', description: 'Excelente conductor de electricidad.', funFact: '¡Los cables eléctricos de tu casa son de cobre!' },
  { symbol: 'Zn', name: 'Zinc',      atomicNumber: 30, atomicMass: 65.38,   category: 'transition',      group: 12, period: 4, color: '#fb923c', description: 'Metal esencial para el sistema inmune.', funFact: '¡Las monedas de 1 y 2 céntimos son principalmente zinc!' },
  { symbol: 'Au', name: 'Oro',       atomicNumber: 79, atomicMass: 196.967, category: 'transition',      group: 11, period: 6, color: '#fb923c', description: 'El metal precioso por excelencia.', funFact: '¡Todo el oro del mundo cabría en un cubo de 21m de lado!' },
  { symbol: 'Ag', name: 'Plata',     atomicNumber: 47, atomicMass: 107.868, category: 'transition',      group: 11, period: 5, color: '#fb923c', description: 'Mejor conductor eléctrico conocido.', funFact: '¡La plata tiene propiedades antibacterianas naturales!' },
  { symbol: 'Hg', name: 'Mercurio',  atomicNumber: 80, atomicMass: 200.59,  category: 'transition',      group: 12, period: 6, color: '#fb923c', description: 'Único metal líquido a temperatura ambiente.', funFact: '¡Los termómetros antiguos usaban mercurio líquido!' },
  { symbol: 'U',  name: 'Uranio',    atomicNumber: 92, atomicMass: 238.029, category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Metal radiactivo usado en energía nuclear.', funFact: '¡Una pastilla de uranio del tamaño de tu dedo equivale a 800 kilos de carbón!' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'nonmetal': 'bg-cyan-900/60 border-cyan-500/40 text-cyan-300',
  'noble-gas': 'bg-violet-900/60 border-violet-500/40 text-violet-300',
  'alkali-metal': 'bg-red-900/60 border-red-500/40 text-red-300',
  'alkaline-earth': 'bg-amber-900/60 border-amber-500/40 text-amber-300',
  'metalloid': 'bg-emerald-900/60 border-emerald-500/40 text-emerald-300',
  'post-transition': 'bg-blue-900/60 border-blue-500/40 text-blue-300',
  'transition': 'bg-orange-900/60 border-orange-500/40 text-orange-300',
  'lanthanide': 'bg-pink-900/60 border-pink-500/40 text-pink-300',
  'actinide': 'bg-teal-900/60 border-teal-500/40 text-teal-300',
  'halogen': 'bg-green-900/60 border-green-500/40 text-green-300',
};
