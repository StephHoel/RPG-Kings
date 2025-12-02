const BASE_XP = 500

/** Retorna o XP total necessário para alcançar o nível `level` */
export function xpForLevel(level: number, base = BASE_XP): number {
  if (level <= 0) return 0

  const xpTotal = base * level

  return Math.floor(xpTotal)
}

/** Retorna o nível atual baseado no XP total acumulado */
export function levelFromXp(xp: number, base = BASE_XP): number {
  if (xp < base) return 0

  const level = xp / base

  return Math.floor(level)
}

/** Retorna quanto XP falta para o próximo nível */
export function xpToNextLevel(xp: number, base = BASE_XP) {
  const level = levelFromXp(xp, base)

  const nextReq = xpForLevel(level + 1, base)

  return Math.max(0, nextReq - xp)
}

/** Retorna quanto XP já está no nível atual (progressão dentro do nível) */
export function xpIntoLevel(xp: number, base = BASE_XP) {
  const level = levelFromXp(xp, base)

  const currentReq = xpForLevel(level, base)

  return Math.floor(currentReq - xp)
}
