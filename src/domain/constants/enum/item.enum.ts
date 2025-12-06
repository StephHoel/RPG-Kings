export const ITEM_ENUM = {
  notebook: 'Caderno',
  laptop: 'Notebook',
  nanotraje: 'Nanotraje',
  mochila: 'Mochila',
  pasta_notebook: 'Pasta para Notebook',
} as const

// Tipo derivado
export type ItemEnum = (typeof ITEM_ENUM)[keyof typeof ITEM_ENUM]
