export const DISCIPLINE_ENUM = {
  // Idiomas
  english: 'Inglês',
  german: 'Alemão',
  italian: 'Italiano',
  french: 'Francês',

  // Negócios
  economy: 'Economia',
  entrepreneurship: 'Empreendedorismo',

  // Ciências
  biology: 'Biologia',
  physics: 'Física',
  chemistry: 'Química',

  // Sociais
  sociology: 'Sociologia',
  philosophy: 'Filosofia',

  // Outras obrigatórias
  physical_education: 'Educação Física',
  math: 'Matemática',

  // Dança
  ballet: 'Balé',
  jazz: 'Jazz',

  // Esportes Aquáticos
  swimming: 'Natação',
  water_polo: 'Polo Aquático',

  // Esportes de Grama
  soccer: 'Futebol',
  rugby: 'Rúgbi',

  // Esportes de Quadra
  basketball: 'Basquete',
  volleyball: 'Vôlei',

  // Esportes de Gelo
  ice_hockey: 'Hóquei no Gelo',
  figure_skating: 'Patinação Artística no Gelo',

  // Lutas
  olympic_wrestling: 'Luta Olímpica',
  tae_kwon_do: 'Tae Kwon Do',

  // Música
  singing: 'Canto',
  choir: 'Coral',
  flute: 'Flauta Transversa',
  piano: 'Piano',
  guitar: 'Violão/Guitarra',
  violin: 'Violino',
  cello: 'Violoncelo',
  clarinet: 'Clarinete',

  // Outras atividades
  performing_arts: 'Artes Cênicas',
  athletics: 'Atletismo',
  publishing: 'Editoração',
  sculpture: 'Escultura',
  filming: 'Filmagem',
  journalism: 'Jornalismo',
  audiovisual_editing: 'Montagem Audiovisual',
  painting: 'Pintura',
  robotics: 'Robótica',
  fashion_designer: 'Estilista de Moda',
} as const

// Tipo derivado
export type DisciplineEnum = (typeof DISCIPLINE_ENUM)[keyof typeof DISCIPLINE_ENUM]
