export function selectRandom<T>(items: T[] | undefined): T | undefined {
  if (!items || items.length === 0) return undefined

  const index = Math.floor(Math.random() * items.length)
  return items[index]
}
