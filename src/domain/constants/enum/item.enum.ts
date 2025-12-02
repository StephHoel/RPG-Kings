export const ITEM_ENUM = {
  // TODO adicionar mais items e não esquecer de completar o seed também
  notebook: 'Caderno',
  laptop: 'Notebook',
} as const

// Tipo derivado
export type ItemEnum = (typeof ITEM_ENUM)[keyof typeof ITEM_ENUM]
