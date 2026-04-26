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
  // Period 1
  { symbol: 'H',  name: 'Hidrógeno',    atomicNumber: 1,   atomicMass: 1.008,    category: 'nonmetal',        group: 1,  period: 1, color: '#6ee7f7', description: 'El elemento más abundante del universo.', funFact: '¡El sol está hecho principalmente de hidrógeno!' },
  { symbol: 'He', name: 'Helio',         atomicNumber: 2,   atomicMass: 4.003,    category: 'noble-gas',       group: 18, period: 1, color: '#c4b5fd', description: 'Gas noble inerte, más ligero que el aire.', funFact: '¡Los globos de helio flotan porque pesa menos que el aire!' },
  // Period 2
  { symbol: 'Li', name: 'Litio',         atomicNumber: 3,   atomicMass: 6.941,    category: 'alkali-metal',    group: 1,  period: 2, color: '#fca5a5', description: 'Metal alcalino suave.', funFact: '¡Tu móvil usa baterías de litio!' },
  { symbol: 'Be', name: 'Berilio',       atomicNumber: 4,   atomicMass: 9.012,    category: 'alkaline-earth',  group: 2,  period: 2, color: '#fcd34d', description: 'Metal ligero y resistente.', funFact: '¡Las esmeraldas contienen berilio!' },
  { symbol: 'B',  name: 'Boro',          atomicNumber: 5,   atomicMass: 10.811,   category: 'metalloid',       group: 13, period: 2, color: '#6ee7b7', description: 'Metaloide usado en semiconductores.', funFact: '¡El bórax, usado para limpiar, contiene boro!' },
  { symbol: 'C',  name: 'Carbono',       atomicNumber: 6,   atomicMass: 12.011,   category: 'nonmetal',        group: 14, period: 2, color: '#6ee7f7', description: 'Base de toda la vida en la Tierra.', funFact: '¡Los diamantes y el grafito son ambos carbono puro!' },
  { symbol: 'N',  name: 'Nitrógeno',     atomicNumber: 7,   atomicMass: 14.007,   category: 'nonmetal',        group: 15, period: 2, color: '#6ee7f7', description: '78% del aire que respiramos.', funFact: '¡El nitrógeno líquido congela las cosas al instante!' },
  { symbol: 'O',  name: 'Oxígeno',       atomicNumber: 8,   atomicMass: 15.999,   category: 'nonmetal',        group: 16, period: 2, color: '#6ee7f7', description: 'Esencial para la respiración.', funFact: '¡El oxígeno líquido es de color azul pálido!' },
  { symbol: 'F',  name: 'Flúor',         atomicNumber: 9,   atomicMass: 18.998,   category: 'halogen',         group: 17, period: 2, color: '#86efac', description: 'El elemento más electronegativo.', funFact: '¡Tu pasta de dientes contiene flúor!' },
  { symbol: 'Ne', name: 'Neón',          atomicNumber: 10,  atomicMass: 20.180,   category: 'noble-gas',       group: 18, period: 2, color: '#c4b5fd', description: 'Gas noble que brilla naranja-rojo.', funFact: '¡Los letreros de neón usan este gas!' },
  // Period 3
  { symbol: 'Na', name: 'Sodio',         atomicNumber: 11,  atomicMass: 22.990,   category: 'alkali-metal',    group: 1,  period: 3, color: '#fca5a5', description: 'Metal alcalino reactivo con el agua.', funFact: '¡La sal de mesa es cloruro de sodio (NaCl)!' },
  { symbol: 'Mg', name: 'Magnesio',      atomicNumber: 12,  atomicMass: 24.305,   category: 'alkaline-earth',  group: 2,  period: 3, color: '#fcd34d', description: 'Metal ligero esencial para plantas.', funFact: '¡La clorofila (verde de las plantas) contiene magnesio!' },
  { symbol: 'Al', name: 'Aluminio',      atomicNumber: 13,  atomicMass: 26.982,   category: 'post-transition', group: 13, period: 3, color: '#a5b4fc', description: 'Metal ligero muy usado en la vida diaria.', funFact: '¡Las latas de refresco son de aluminio!' },
  { symbol: 'Si', name: 'Silicio',       atomicNumber: 14,  atomicMass: 28.086,   category: 'metalloid',       group: 14, period: 3, color: '#6ee7b7', description: 'Base de los semiconductores modernos.', funFact: '¡Silicon Valley se llama así por el silicio de los chips!' },
  { symbol: 'P',  name: 'Fósforo',       atomicNumber: 15,  atomicMass: 30.974,   category: 'nonmetal',        group: 15, period: 3, color: '#6ee7f7', description: 'Esencial para el ADN y los huesos.', funFact: '¡Los cerillas usan fósforo rojo!' },
  { symbol: 'S',  name: 'Azufre',        atomicNumber: 16,  atomicMass: 32.065,   category: 'nonmetal',        group: 16, period: 3, color: '#6ee7f7', description: 'Elemento amarillo con olor a huevos podridos.', funFact: '¡Los volcanes liberan azufre!' },
  { symbol: 'Cl', name: 'Cloro',         atomicNumber: 17,  atomicMass: 35.453,   category: 'halogen',         group: 17, period: 3, color: '#86efac', description: 'Gas verde-amarillento usado para desinfectar.', funFact: '¡Se usa para desinfectar el agua de las piscinas!' },
  { symbol: 'Ar', name: 'Argón',         atomicNumber: 18,  atomicMass: 39.948,   category: 'noble-gas',       group: 18, period: 3, color: '#c4b5fd', description: 'Gas noble, 1% del aire.', funFact: '¡Las bombillas de luz incandescente se llenan con argón!' },
  // Period 4
  { symbol: 'K',  name: 'Potasio',       atomicNumber: 19,  atomicMass: 39.098,   category: 'alkali-metal',    group: 1,  period: 4, color: '#fca5a5', description: 'Metal alcalino esencial para el cuerpo.', funFact: '¡Los plátanos son ricos en potasio!' },
  { symbol: 'Ca', name: 'Calcio',        atomicNumber: 20,  atomicMass: 40.078,   category: 'alkaline-earth',  group: 2,  period: 4, color: '#fcd34d', description: 'Esencial para huesos y dientes.', funFact: '¡Tus huesos son principalmente fosfato de calcio!' },
  { symbol: 'Sc', name: 'Escandio',      atomicNumber: 21,  atomicMass: 44.956,   category: 'transition',      group: 3,  period: 4, color: '#fb923c', description: 'Metal de transición ligero y resistente.', funFact: '¡Se usa en bicicletas de alta gama y aviones!' },
  { symbol: 'Ti', name: 'Titanio',       atomicNumber: 22,  atomicMass: 47.867,   category: 'transition',      group: 4,  period: 4, color: '#fb923c', description: 'Metal fuerte, ligero y resistente a la corrosión.', funFact: '¡Se usa en implantes médicos porque el cuerpo no lo rechaza!' },
  { symbol: 'V',  name: 'Vanadio',       atomicNumber: 23,  atomicMass: 50.942,   category: 'transition',      group: 5,  period: 4, color: '#fb923c', description: 'Metal duro usado en aceros especiales.', funFact: '¡Las llaves inglesas de alta calidad contienen vanadio!' },
  { symbol: 'Cr', name: 'Cromo',         atomicNumber: 24,  atomicMass: 51.996,   category: 'transition',      group: 6,  period: 4, color: '#fb923c', description: 'Metal brillante resistente a la corrosión.', funFact: '¡El brillo de los coches cromados viene de este elemento!' },
  { symbol: 'Mn', name: 'Manganeso',     atomicNumber: 25,  atomicMass: 54.938,   category: 'transition',      group: 7,  period: 4, color: '#fb923c', description: 'Metal esencial para la fabricación de acero.', funFact: '¡Las pilas alcalinas contienen dióxido de manganeso!' },
  { symbol: 'Fe', name: 'Hierro',        atomicNumber: 26,  atomicMass: 55.845,   category: 'transition',      group: 8,  period: 4, color: '#fb923c', description: 'El metal más usado en la Tierra.', funFact: '¡El núcleo de la Tierra es principalmente hierro!' },
  { symbol: 'Co', name: 'Cobalto',       atomicNumber: 27,  atomicMass: 58.933,   category: 'transition',      group: 9,  period: 4, color: '#fb923c', description: 'Metal azulado usado en aleaciones y pigmentos.', funFact: '¡El color "azul cobalto" viene de este elemento!' },
  { symbol: 'Ni', name: 'Níquel',        atomicNumber: 28,  atomicMass: 58.693,   category: 'transition',      group: 10, period: 4, color: '#fb923c', description: 'Metal resistente a la corrosión.', funFact: '¡Las monedas de 5 céntimos contienen níquel!' },
  { symbol: 'Cu', name: 'Cobre',         atomicNumber: 29,  atomicMass: 63.546,   category: 'transition',      group: 11, period: 4, color: '#fb923c', description: 'Excelente conductor de electricidad.', funFact: '¡Los cables eléctricos de tu casa son de cobre!' },
  { symbol: 'Zn', name: 'Zinc',          atomicNumber: 30,  atomicMass: 65.38,    category: 'transition',      group: 12, period: 4, color: '#fb923c', description: 'Metal esencial para el sistema inmune.', funFact: '¡Las monedas de 1 y 2 céntimos son principalmente zinc!' },
  { symbol: 'Ga', name: 'Galio',         atomicNumber: 31,  atomicMass: 69.723,   category: 'post-transition', group: 13, period: 4, color: '#a5b4fc', description: 'Metal que se derrite en tu mano.', funFact: '¡Se derrite a solo 29.7°C, en la palma de tu mano!' },
  { symbol: 'Ge', name: 'Germanio',      atomicNumber: 32,  atomicMass: 72.630,   category: 'metalloid',       group: 14, period: 4, color: '#6ee7b7', description: 'Semiconductor usado en electrónica.', funFact: '¡Los primeros transistores se hicieron con germanio!' },
  { symbol: 'As', name: 'Arsénico',      atomicNumber: 33,  atomicMass: 74.922,   category: 'metalloid',       group: 15, period: 4, color: '#6ee7b7', description: 'Metaloide tóxico con larga historia.', funFact: '¡En la antigüedad se llamaba "el rey de los venenos"!' },
  { symbol: 'Se', name: 'Selenio',       atomicNumber: 34,  atomicMass: 78.971,   category: 'nonmetal',        group: 16, period: 4, color: '#6ee7f7', description: 'Oligoelemento esencial en la dieta.', funFact: '¡Las nueces de Brasil son la mayor fuente natural de selenio!' },
  { symbol: 'Br', name: 'Bromo',         atomicNumber: 35,  atomicMass: 79.904,   category: 'halogen',         group: 17, period: 4, color: '#86efac', description: 'Único no metal líquido a temperatura ambiente.', funFact: '¡Su nombre viene del griego "bromos" (hedor)!' },
  { symbol: 'Kr', name: 'Kriptón',       atomicNumber: 36,  atomicMass: 83.798,   category: 'noble-gas',       group: 18, period: 4, color: '#c4b5fd', description: 'Gas noble usado en iluminación.', funFact: '¡Superman NO viene de este kriptón, pero el gas es real!' },
  // Period 5
  { symbol: 'Rb', name: 'Rubidio',       atomicNumber: 37,  atomicMass: 85.468,   category: 'alkali-metal',    group: 1,  period: 5, color: '#fca5a5', description: 'Metal alcalino muy reactivo.', funFact: '¡Arde con una llama de color violeta!' },
  { symbol: 'Sr', name: 'Estroncio',     atomicNumber: 38,  atomicMass: 87.62,    category: 'alkaline-earth',  group: 2,  period: 5, color: '#fcd34d', description: 'Metal alcalinotérreo.', funFact: '¡Los fuegos artificiales rojos usan estroncio!' },
  { symbol: 'Y',  name: 'Itrio',         atomicNumber: 39,  atomicMass: 88.906,   category: 'transition',      group: 3,  period: 5, color: '#fb923c', description: 'Metal de transición plateado.', funFact: '¡Se usa en los LEDs blancos y en pantallas de TV!' },
  { symbol: 'Zr', name: 'Circonio',      atomicNumber: 40,  atomicMass: 91.224,   category: 'transition',      group: 4,  period: 5, color: '#fb923c', description: 'Metal resistente a la corrosión.', funFact: '¡La circonia cúbica imita al diamante en joyería!' },
  { symbol: 'Nb', name: 'Niobio',        atomicNumber: 41,  atomicMass: 92.906,   category: 'transition',      group: 5,  period: 5, color: '#fb923c', description: 'Metal superconductor.', funFact: '¡Los imanes del LHC en el CERN usan niobio!' },
  { symbol: 'Mo', name: 'Molibdeno',     atomicNumber: 42,  atomicMass: 95.95,    category: 'transition',      group: 6,  period: 5, color: '#fb923c', description: 'Metal de altísimo punto de fusión.', funFact: '¡Las enzimas de tu cuerpo necesitan molibdeno para funcionar!' },
  { symbol: 'Tc', name: 'Tecnecio',      atomicNumber: 43,  atomicMass: 98,       category: 'transition',      group: 7,  period: 5, color: '#fb923c', description: 'Primer elemento producido artificialmente.', funFact: '¡Se usa en medicina nuclear para hacer diagnósticos por imagen!' },
  { symbol: 'Ru', name: 'Rutenio',       atomicNumber: 44,  atomicMass: 101.07,   category: 'transition',      group: 8,  period: 5, color: '#fb923c', description: 'Metal del grupo del platino.', funFact: '¡Se usa para endurecer el platino y el paladio!' },
  { symbol: 'Rh', name: 'Rodio',         atomicNumber: 45,  atomicMass: 102.906,  category: 'transition',      group: 9,  period: 5, color: '#fb923c', description: 'Metal precioso extremadamente raro.', funFact: '¡Es más caro que el oro y se usa en catalizadores de coches!' },
  { symbol: 'Pd', name: 'Paladio',       atomicNumber: 46,  atomicMass: 106.42,   category: 'transition',      group: 10, period: 5, color: '#fb923c', description: 'Metal del grupo del platino.', funFact: '¡Absorbe hasta 900 veces su volumen en hidrógeno!' },
  { symbol: 'Ag', name: 'Plata',         atomicNumber: 47,  atomicMass: 107.868,  category: 'transition',      group: 11, period: 5, color: '#fb923c', description: 'Mejor conductor eléctrico conocido.', funFact: '¡La plata tiene propiedades antibacterianas naturales!' },
  { symbol: 'Cd', name: 'Cadmio',        atomicNumber: 48,  atomicMass: 112.414,  category: 'transition',      group: 12, period: 5, color: '#fb923c', description: 'Metal tóxico usado en baterías recargables.', funFact: '¡El amarillo cadmio es un pigmento usado por pintores famosos!' },
  { symbol: 'In', name: 'Indio',         atomicNumber: 49,  atomicMass: 114.818,  category: 'post-transition', group: 13, period: 5, color: '#a5b4fc', description: 'Metal blando que se puede doblar sin romperse.', funFact: '¡Las pantallas táctiles de tu móvil usan óxido de indio!' },
  { symbol: 'Sn', name: 'Estaño',        atomicNumber: 50,  atomicMass: 118.710,  category: 'post-transition', group: 14, period: 5, color: '#a5b4fc', description: 'Metal conocido desde la antigüedad.', funFact: '¡Las latas de conserva se llaman así por el estaño que las recubría!' },
  { symbol: 'Sb', name: 'Antimonio',     atomicNumber: 51,  atomicMass: 121.760,  category: 'metalloid',       group: 15, period: 5, color: '#6ee7b7', description: 'Metaloide usado en retardantes de fuego.', funFact: '¡En el antiguo Egipto se usaba como maquillaje de ojos!' },
  { symbol: 'Te', name: 'Telurio',       atomicNumber: 52,  atomicMass: 127.60,   category: 'metalloid',       group: 16, period: 5, color: '#6ee7b7', description: 'Metaloide semiconductor.', funFact: '¡Es uno de los elementos más raros en la corteza terrestre!' },
  { symbol: 'I',  name: 'Yodo',          atomicNumber: 53,  atomicMass: 126.904,  category: 'halogen',         group: 17, period: 5, color: '#86efac', description: 'Halógeno esencial para la tiroides.', funFact: '¡La sal yodada se creó para prevenir el bocio!' },
  { symbol: 'Xe', name: 'Xenón',         atomicNumber: 54,  atomicMass: 131.293,  category: 'noble-gas',       group: 18, period: 5, color: '#c4b5fd', description: 'Gas noble pesado usado en iluminación.', funFact: '¡Los faros de xenón de los coches son azulados y superbrillantes!' },
  // Period 6
  { symbol: 'Cs', name: 'Cesio',         atomicNumber: 55,  atomicMass: 132.905,  category: 'alkali-metal',    group: 1,  period: 6, color: '#fca5a5', description: 'Metal alcalino extremadamente reactivo.', funFact: '¡Los relojes atómicos más precisos usan cesio!' },
  { symbol: 'Ba', name: 'Bario',         atomicNumber: 56,  atomicMass: 137.327,  category: 'alkaline-earth',  group: 2,  period: 6, color: '#fcd34d', description: 'Metal alcalinotérreo.', funFact: '¡Se usa en radiografías del sistema digestivo (papilla de bario)!' },
  // Lanthanides (period 6, group 3 → displayed in separate row)
  { symbol: 'La', name: 'Lantano',       atomicNumber: 57,  atomicMass: 138.905,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Primer elemento de los lantánidos.', funFact: '¡Se usa en lentes de cámaras de alta calidad!' },
  { symbol: 'Ce', name: 'Cerio',         atomicNumber: 58,  atomicMass: 140.116,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido más abundante.', funFact: '¡Los encendedores de chispa usan una aleación de cerio!' },
  { symbol: 'Pr', name: 'Praseodimio',   atomicNumber: 59,  atomicMass: 140.908,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Metal de tierras raras verde.', funFact: '¡Su nombre significa "gemelo verde" en griego!' },
  { symbol: 'Nd', name: 'Neodimio',      atomicNumber: 60,  atomicMass: 144.242,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Usado en los imanes más potentes.', funFact: '¡Los auriculares y altavoces usan imanes de neodimio!' },
  { symbol: 'Pm', name: 'Prometio',      atomicNumber: 61,  atomicMass: 145,      category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido radiactivo.', funFact: '¡Es el único lantánido sin isótopos estables!' },
  { symbol: 'Sm', name: 'Samario',       atomicNumber: 62,  atomicMass: 150.36,   category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido usado en imanes.', funFact: '¡Los imanes de samario-cobalto funcionan a altísimas temperaturas!' },
  { symbol: 'Eu', name: 'Europio',       atomicNumber: 63,  atomicMass: 151.964,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido que produce fosforescencia roja.', funFact: '¡Los billetes de euro contienen europio como medida antifalsificación!' },
  { symbol: 'Gd', name: 'Gadolinio',     atomicNumber: 64,  atomicMass: 157.25,   category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido usado en resonancias magnéticas.', funFact: '¡El contraste de las resonancias magnéticas usa gadolinio!' },
  { symbol: 'Tb', name: 'Terbio',        atomicNumber: 65,  atomicMass: 158.925,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido que produce luz verde.', funFact: '¡Se usa en los LED verdes de alta eficiencia!' },
  { symbol: 'Dy', name: 'Disprosio',     atomicNumber: 66,  atomicMass: 162.500,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido altamente magnético.', funFact: '¡Su nombre significa "difícil de obtener" en griego!' },
  { symbol: 'Ho', name: 'Holmio',        atomicNumber: 67,  atomicMass: 164.930,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Tiene las propiedades magnéticas más fuertes.', funFact: '¡Se usa en láseres médicos para cirugía!' },
  { symbol: 'Er', name: 'Erbio',         atomicNumber: 68,  atomicMass: 167.259,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido rosa usado en fibra óptica.', funFact: '¡Amplifica la señal en los cables de fibra óptica de internet!' },
  { symbol: 'Tm', name: 'Tulio',         atomicNumber: 69,  atomicMass: 168.934,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'El lantánido más raro en la naturaleza.', funFact: '¡Se usa en equipos portátiles de rayos X!' },
  { symbol: 'Yb', name: 'Iterbio',       atomicNumber: 70,  atomicMass: 173.045,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Lantánido usado en metalurgia.', funFact: '¡Los relojes atómicos de iterbio son aún más precisos que los de cesio!' },
  { symbol: 'Lu', name: 'Lutecio',       atomicNumber: 71,  atomicMass: 174.967,  category: 'lanthanide',      group: 3,  period: 6, color: '#f9a8d4', description: 'Último de los lantánidos.', funFact: '¡Se usa en detectores PET para diagnóstico médico!' },
  // Period 6 continued
  { symbol: 'Hf', name: 'Hafnio',        atomicNumber: 72,  atomicMass: 178.49,   category: 'transition',      group: 4,  period: 6, color: '#fb923c', description: 'Metal de transición muy resistente al calor.', funFact: '¡Se usa en barras de control de reactores nucleares!' },
  { symbol: 'Ta', name: 'Tantalio',      atomicNumber: 73,  atomicMass: 180.948,  category: 'transition',      group: 5,  period: 6, color: '#fb923c', description: 'Metal extremadamente resistente a la corrosión.', funFact: '¡Los condensadores de tu móvil contienen tantalio!' },
  { symbol: 'W',  name: 'Wolframio',     atomicNumber: 74,  atomicMass: 183.84,   category: 'transition',      group: 6,  period: 6, color: '#fb923c', description: 'Metal con el punto de fusión más alto.', funFact: '¡Los filamentos de las bombillas son de wolframio!' },
  { symbol: 'Re', name: 'Renio',         atomicNumber: 75,  atomicMass: 186.207,  category: 'transition',      group: 7,  period: 6, color: '#fb923c', description: 'Uno de los metales más densos.', funFact: '¡Se usa en turbinas de aviones de combate!' },
  { symbol: 'Os', name: 'Osmio',         atomicNumber: 76,  atomicMass: 190.23,   category: 'transition',      group: 8,  period: 6, color: '#fb923c', description: 'El elemento más denso conocido.', funFact: '¡Es dos veces más denso que el plomo!' },
  { symbol: 'Ir', name: 'Iridio',        atomicNumber: 77,  atomicMass: 192.217,  category: 'transition',      group: 9,  period: 6, color: '#fb923c', description: 'Metal extremadamente duro y denso.', funFact: '¡El meteorito que mató a los dinosaurios dejó una capa de iridio!' },
  { symbol: 'Pt', name: 'Platino',       atomicNumber: 78,  atomicMass: 195.084,  category: 'transition',      group: 10, period: 6, color: '#fb923c', description: 'Metal precioso usado en joyería y catalizadores.', funFact: '¡El catalizador de tu coche contiene platino!' },
  { symbol: 'Au', name: 'Oro',           atomicNumber: 79,  atomicMass: 196.967,  category: 'transition',      group: 11, period: 6, color: '#fb923c', description: 'El metal precioso por excelencia.', funFact: '¡Todo el oro del mundo cabría en un cubo de 21m de lado!' },
  { symbol: 'Hg', name: 'Mercurio',      atomicNumber: 80,  atomicMass: 200.59,   category: 'transition',      group: 12, period: 6, color: '#fb923c', description: 'Único metal líquido a temperatura ambiente.', funFact: '¡Los termómetros antiguos usaban mercurio líquido!' },
  { symbol: 'Tl', name: 'Talio',         atomicNumber: 81,  atomicMass: 204.383,  category: 'post-transition', group: 13, period: 6, color: '#a5b4fc', description: 'Metal muy tóxico.', funFact: '¡Es tan tóxico que se conoce como "el veneno del envenenador"!' },
  { symbol: 'Pb', name: 'Plomo',         atomicNumber: 82,  atomicMass: 207.2,    category: 'post-transition', group: 14, period: 6, color: '#a5b4fc', description: 'Metal pesado conocido desde la antigüedad.', funFact: '¡Los romanos usaban tuberías de plomo para el agua!' },
  { symbol: 'Bi', name: 'Bismuto',       atomicNumber: 83,  atomicMass: 208.980,  category: 'post-transition', group: 15, period: 6, color: '#a5b4fc', description: 'Metal con cristales iridiscentes.', funFact: '¡Sus cristales escalonados son arcoíris naturales!' },
  { symbol: 'Po', name: 'Polonio',       atomicNumber: 84,  atomicMass: 209,      category: 'post-transition', group: 16, period: 6, color: '#a5b4fc', description: 'Elemento altamente radiactivo.', funFact: '¡Fue descubierto por Marie Curie y nombrado por su país natal!' },
  { symbol: 'At', name: 'Astato',        atomicNumber: 85,  atomicMass: 210,      category: 'halogen',         group: 17, period: 6, color: '#86efac', description: 'El halógeno más raro.', funFact: '¡En toda la Tierra solo existen unos 25 gramos de astato!' },
  { symbol: 'Rn', name: 'Radón',         atomicNumber: 86,  atomicMass: 222,      category: 'noble-gas',       group: 18, period: 6, color: '#c4b5fd', description: 'Gas noble radiactivo.', funFact: '¡Es la segunda causa de cáncer de pulmón después del tabaco!' },
  // Period 7
  { symbol: 'Fr', name: 'Francio',       atomicNumber: 87,  atomicMass: 223,      category: 'alkali-metal',    group: 1,  period: 7, color: '#fca5a5', description: 'Metal alcalino extremadamente raro.', funFact: '¡Es el segundo elemento más raro en la Tierra!' },
  { symbol: 'Ra', name: 'Radio',         atomicNumber: 88,  atomicMass: 226,      category: 'alkaline-earth',  group: 2,  period: 7, color: '#fcd34d', description: 'Metal radiactivo que brilla en la oscuridad.', funFact: '¡Marie Curie lo descubrió y brilla con un tenue resplandor azul!' },
  // Actinides (period 7, group 3 → displayed in separate row)
  { symbol: 'Ac', name: 'Actinio',       atomicNumber: 89,  atomicMass: 227,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Primer elemento de los actínidos.', funFact: '¡Brilla en la oscuridad con una luz azulada!' },
  { symbol: 'Th', name: 'Torio',         atomicNumber: 90,  atomicMass: 232.038,  category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Metal radiactivo potencial combustible nuclear.', funFact: '¡Podría ser el combustible nuclear del futuro, más seguro que el uranio!' },
  { symbol: 'Pa', name: 'Protactinio',   atomicNumber: 91,  atomicMass: 231.036,  category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Actínido raro y radiactivo.', funFact: '¡Es uno de los elementos naturales más raros y caros!' },
  { symbol: 'U',  name: 'Uranio',        atomicNumber: 92,  atomicMass: 238.029,  category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Metal radiactivo usado en energía nuclear.', funFact: '¡Una pastilla de uranio del tamaño de tu dedo equivale a 800 kilos de carbón!' },
  { symbol: 'Np', name: 'Neptunio',      atomicNumber: 93,  atomicMass: 237,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Primer elemento transuránico.', funFact: '¡Nombrado por el planeta Neptuno, igual que el uranio por Urano!' },
  { symbol: 'Pu', name: 'Plutonio',      atomicNumber: 94,  atomicMass: 244,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Usado en armas nucleares y sondas espaciales.', funFact: '¡Las sondas Voyager usan plutonio como fuente de energía!' },
  { symbol: 'Am', name: 'Americio',      atomicNumber: 95,  atomicMass: 243,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Actínido usado en detectores de humo.', funFact: '¡Tu detector de humo probablemente contiene americio!' },
  { symbol: 'Cm', name: 'Curio',         atomicNumber: 96,  atomicMass: 247,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Nombrado en honor a Marie y Pierre Curie.', funFact: '¡El rover Curiosity de Marte lleva una fuente de curio!' },
  { symbol: 'Bk', name: 'Berkelio',      atomicNumber: 97,  atomicMass: 247,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Actínido sintético.', funFact: '¡Nombrado por Berkeley, California, donde fue creado!' },
  { symbol: 'Cf', name: 'Californio',    atomicNumber: 98,  atomicMass: 251,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Emisor de neutrones muy potente.', funFact: '¡1 gramo de californio cuesta 27 millones de dólares!' },
  { symbol: 'Es', name: 'Einstenio',     atomicNumber: 99,  atomicMass: 252,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Nombrado en honor a Albert Einstein.', funFact: '¡Se descubrió en los restos de la primera bomba de hidrógeno!' },
  { symbol: 'Fm', name: 'Fermio',        atomicNumber: 100, atomicMass: 257,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Nombrado en honor a Enrico Fermi.', funFact: '¡Nunca se ha producido suficiente fermio para verlo a simple vista!' },
  { symbol: 'Md', name: 'Mendelevio',    atomicNumber: 101, atomicMass: 258,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Nombrado en honor a Mendeléyev.', funFact: '¡Solo se han producido unos pocos átomos a la vez!' },
  { symbol: 'No', name: 'Nobelio',       atomicNumber: 102, atomicMass: 259,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Nombrado en honor a Alfred Nobel.', funFact: '¡Su descubrimiento fue disputado durante décadas entre varios países!' },
  { symbol: 'Lr', name: 'Lawrencio',     atomicNumber: 103, atomicMass: 266,      category: 'actinide',        group: 3,  period: 7, color: '#34d399', description: 'Último de los actínidos.', funFact: '¡Nombrado por Ernest Lawrence, inventor del ciclotrón!' },
  // Period 7 continued
  { symbol: 'Rf', name: 'Rutherfordio',  atomicNumber: 104, atomicMass: 267,      category: 'transition',      group: 4,  period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Ernest Rutherford, padre de la física nuclear!' },
  { symbol: 'Db', name: 'Dubnio',        atomicNumber: 105, atomicMass: 268,      category: 'transition',      group: 5,  period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Dubna, Rusia, donde fue creado!' },
  { symbol: 'Sg', name: 'Seaborgio',     atomicNumber: 106, atomicMass: 269,      category: 'transition',      group: 6,  period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Glenn Seaborg es el único con un elemento nombrado en vida!' },
  { symbol: 'Bh', name: 'Bohrio',        atomicNumber: 107, atomicMass: 270,      category: 'transition',      group: 7,  period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Niels Bohr, pionero de la mecánica cuántica!' },
  { symbol: 'Hs', name: 'Hasio',         atomicNumber: 108, atomicMass: 269,      category: 'transition',      group: 8,  period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Hesse, el estado alemán donde fue creado!' },
  { symbol: 'Mt', name: 'Meitnerio',     atomicNumber: 109, atomicMass: 278,      category: 'transition',      group: 9,  period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Lise Meitner, pionera de la fisión nuclear!' },
  { symbol: 'Ds', name: 'Darmstatio',    atomicNumber: 110, atomicMass: 281,      category: 'transition',      group: 10, period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Darmstadt, Alemania!' },
  { symbol: 'Rg', name: 'Roentgenio',    atomicNumber: 111, atomicMass: 282,      category: 'transition',      group: 11, period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Wilhelm Röntgen, descubridor de los rayos X!' },
  { symbol: 'Cn', name: 'Copernicio',    atomicNumber: 112, atomicMass: 285,      category: 'transition',      group: 12, period: 7, color: '#fb923c', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Copérnico, quien propuso el heliocentrismo!' },
  { symbol: 'Nh', name: 'Nihonio',       atomicNumber: 113, atomicMass: 286,      category: 'post-transition', group: 13, period: 7, color: '#a5b4fc', description: 'Elemento superpesado sintético.', funFact: '¡Primer elemento descubierto en Asia (Japón)! Nihon = Japón.' },
  { symbol: 'Fl', name: 'Flerovio',      atomicNumber: 114, atomicMass: 289,      category: 'post-transition', group: 14, period: 7, color: '#a5b4fc', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por el laboratorio Flerov de Rusia!' },
  { symbol: 'Mc', name: 'Moscovio',      atomicNumber: 115, atomicMass: 290,      category: 'post-transition', group: 15, period: 7, color: '#a5b4fc', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por Moscú, capital de Rusia!' },
  { symbol: 'Lv', name: 'Livermorio',    atomicNumber: 116, atomicMass: 293,      category: 'post-transition', group: 16, period: 7, color: '#a5b4fc', description: 'Elemento superpesado sintético.', funFact: '¡Nombrado por el Laboratorio Nacional Lawrence Livermore!' },
  { symbol: 'Ts', name: 'Teneso',        atomicNumber: 117, atomicMass: 294,      category: 'halogen',         group: 17, period: 7, color: '#86efac', description: 'Halógeno superpesado sintético.', funFact: '¡Nombrado por Tennessee, EE.UU.!' },
  { symbol: 'Og', name: 'Oganesón',      atomicNumber: 118, atomicMass: 294,      category: 'noble-gas',       group: 18, period: 7, color: '#c4b5fd', description: 'El último elemento conocido.', funFact: '¡Nombrado por Yuri Oganessian, único científico vivo con un elemento!' },
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

/** Map for periodic table grid positions: atomicNumber → [gridRow, gridCol] */
export const PT_POSITIONS: Record<number, [number, number]> = {
  // Period 1
  1: [1,1], 2: [1,18],
  // Period 2
  3: [2,1], 4: [2,2], 5: [2,13], 6: [2,14], 7: [2,15], 8: [2,16], 9: [2,17], 10: [2,18],
  // Period 3
  11: [3,1], 12: [3,2], 13: [3,13], 14: [3,14], 15: [3,15], 16: [3,16], 17: [3,17], 18: [3,18],
  // Period 4
  19: [4,1], 20: [4,2], 21: [4,3], 22: [4,4], 23: [4,5], 24: [4,6], 25: [4,7], 26: [4,8],
  27: [4,9], 28: [4,10], 29: [4,11], 30: [4,12], 31: [4,13], 32: [4,14], 33: [4,15], 34: [4,16],
  35: [4,17], 36: [4,18],
  // Period 5
  37: [5,1], 38: [5,2], 39: [5,3], 40: [5,4], 41: [5,5], 42: [5,6], 43: [5,7], 44: [5,8],
  45: [5,9], 46: [5,10], 47: [5,11], 48: [5,12], 49: [5,13], 50: [5,14], 51: [5,15], 52: [5,16],
  53: [5,17], 54: [5,18],
  // Period 6 (main)
  55: [6,1], 56: [6,2],
  72: [6,4], 73: [6,5], 74: [6,6], 75: [6,7], 76: [6,8], 77: [6,9], 78: [6,10], 79: [6,11],
  80: [6,12], 81: [6,13], 82: [6,14], 83: [6,15], 84: [6,16], 85: [6,17], 86: [6,18],
  // Period 7 (main)
  87: [7,1], 88: [7,2],
  104: [7,4], 105: [7,5], 106: [7,6], 107: [7,7], 108: [7,8], 109: [7,9], 110: [7,10], 111: [7,11],
  112: [7,12], 113: [7,13], 114: [7,14], 115: [7,15], 116: [7,16], 117: [7,17], 118: [7,18],
  // Lanthanides (row 9 in grid, displayed separately)
  57: [9,4], 58: [9,5], 59: [9,6], 60: [9,7], 61: [9,8], 62: [9,9], 63: [9,10], 64: [9,11],
  65: [9,12], 66: [9,13], 67: [9,14], 68: [9,15], 69: [9,16], 70: [9,17], 71: [9,18],
  // Actinides (row 10 in grid, displayed separately)
  89: [10,4], 90: [10,5], 91: [10,6], 92: [10,7], 93: [10,8], 94: [10,9], 95: [10,10], 96: [10,11],
  97: [10,12], 98: [10,13], 99: [10,14], 100: [10,15], 101: [10,16], 102: [10,17], 103: [10,18],
};
