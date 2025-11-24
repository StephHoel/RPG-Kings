export const ITEM_TYPE = {
  healing: 'healing',
  wearable: 'wearable',
  eletronic: 'eletronic',
} as const

// Tipo derivado
export type ItemType = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE]
